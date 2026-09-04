// ============================================================
// NeoSaarthi — mobility.js
// Real-Time Walk Tracker: Accelerometer + Auto-Pausing Timer
// ============================================================

'use strict';

// ── CONSTANTS ────────────────────────────────────────────────
const STRIDE_LENGTH_M      = 0.68;   // average elderly stride in metres
const STEP_DEBOUNCE_MS     = 320;    // min ms between two valid steps
const STEP_MAG_THRESHOLD   = 1.8;   // peak magnitude threshold (m/s²)
const LOW_PASS_ALPHA       = 0.15;   // low-pass filter smoothing factor (0<α<1, smaller = smoother)
const INACTIVITY_PAUSE_MS  = 3000;  // pause timer after 3 s of no movement
const SAMPLE_RATE_TARGET   = 60;    // target samples/sec (browser does what it can)

// ── STATE ────────────────────────────────────────────────────
const state = {
  running:         false,
  steps:           0,
  distanceM:       0,
  activeMs:        0,     // total active (walking) milliseconds
  timerInterval:   null,
  timerActive:     false,
  lastTimerTick:   null,

  // inactivity
  lastStepAt:      null,
  inactivityTimer: null,

  // accelerometer low-pass filter state
  lpX: 0, lpY: 0, lpZ: 0,

  // peak detection
  prevMag:         0,
  prevPrevMag:     0,
  lastStepMs:      0,

  // permission
  permissionGranted: false,
};

// ── DOM REFS (lazy — grabbed on start) ───────────────────────
let el = {};

function grabDOMRefs() {
  el = {
    stepCount:    document.getElementById('step-count'),
    distance:     document.getElementById('distance-traveled'),
    timer:        document.getElementById('active-timer'),
    status:       document.getElementById('mobility-status'),
    startBtn:     document.getElementById('mobility-start-btn'),
    stopBtn:      document.getElementById('mobility-stop-btn'),
    cadence:      document.getElementById('step-cadence'),     // optional
  };
}

// ── UI HELPERS ───────────────────────────────────────────────
function setText(el, val) { if (el) el.textContent = val; }

function fmtTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
  const s = (totalSec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function refreshDOM() {
  setText(el.stepCount, state.steps);
  setText(el.distance,  (state.distanceM / 1000).toFixed(3) + ' km');
  setText(el.timer,     fmtTime(state.activeMs));
  if (el.cadence) {
    // steps per minute over last 10 seconds — rough cadence
    setText(el.cadence, state.timerActive ? '...' : '--');
  }
}

function setStatus(msg, color = '#1565C0') {
  if (el.status) {
    el.status.textContent = msg;
    el.status.style.color = color;
  }
}

// ── TIMER STATE MACHINE ───────────────────────────────────────
function startActiveTimer() {
  if (state.timerActive) return;
  state.timerActive = true;
  state.lastTimerTick = performance.now();

  state.timerInterval = setInterval(() => {
    if (!state.timerActive) return;
    const now = performance.now();
    state.activeMs += now - state.lastTimerTick;
    state.lastTimerTick = now;
    setText(el.timer, fmtTime(state.activeMs));
  }, 100); // tick every 100ms for smooth display
}

function pauseActiveTimer() {
  if (!state.timerActive) return;
  state.timerActive = false;
  clearInterval(state.timerInterval);
  state.timerInterval = null;
  setStatus('Paused — keep walking to resume', '#E65100');
}

// ── INACTIVITY WATCHDOG ───────────────────────────────────────
// Clears and resets a 3-second timeout on every valid step.
// If the timer fires, it pauses the active workout timer.
function resetInactivityWatchdog() {
  clearTimeout(state.inactivityTimer);
  state.inactivityTimer = setTimeout(() => {
    pauseActiveTimer();
  }, INACTIVITY_PAUSE_MS);
}

// ── LOW-PASS FILTER ───────────────────────────────────────────
// Removes high-frequency noise (vibration, micro-shakes).
// y[n] = α * x[n] + (1 - α) * y[n-1]
function applyLowPass(x, y, z) {
  state.lpX = LOW_PASS_ALPHA * x + (1 - LOW_PASS_ALPHA) * state.lpX;
  state.lpY = LOW_PASS_ALPHA * y + (1 - LOW_PASS_ALPHA) * state.lpY;
  state.lpZ = LOW_PASS_ALPHA * z + (1 - LOW_PASS_ALPHA) * state.lpZ;
  return {
    x: state.lpX,
    y: state.lpY,
    z: state.lpZ,
  };
}

// ── PEAK DETECTION ────────────────────────────────────────────
// A step = when the filtered magnitude rises then falls (local max) above threshold.
// prevPrevMag < prevMag && prevMag > currentMag && prevMag > THRESHOLD
function detectStep(rawX, rawY, rawZ) {
  const now = performance.now();

  // 1. Low-pass filter
  const lp  = applyLowPass(rawX, rawY, rawZ);

  // 2. Magnitude of linear acceleration vector
  const mag = Math.sqrt(lp.x * lp.x + lp.y * lp.y + lp.z * lp.z);

  // 3. Peak detection — local maximum above threshold
  const isPeak = (
    state.prevMag > state.prevPrevMag &&  // rising
    state.prevMag > mag &&                // now falling
    state.prevMag > STEP_MAG_THRESHOLD    // above noise floor
  );

  // 4. Debounce — ignore peaks within 320ms of the last counted step
  const debounceOk = (now - state.lastStepMs) >= STEP_DEBOUNCE_MS;

  // 5. Slide window
  state.prevPrevMag = state.prevMag;
  state.prevMag     = mag;

  if (isPeak && debounceOk) {
    state.lastStepMs = now;
    return true;  // valid step
  }
  return false;
}

// ── DEVICE MOTION HANDLER ────────────────────────────────────
function onDeviceMotion(event) {
  if (!state.running) return;

  // Use accelerationIncludingGravity for widest browser support
  // Prefer acceleration (without gravity) when available
  const acc = event.acceleration?.x != null
    ? event.acceleration
    : event.accelerationIncludingGravity;

  if (!acc) return;

  const x = acc.x ?? 0;
  const y = acc.y ?? 0;
  const z = acc.z ?? 0;

  const isStep = detectStep(x, y, z);

  if (isStep) {
    // ── Count step ──
    state.steps++;
    state.distanceM = state.steps * STRIDE_LENGTH_M;
    state.lastStepAt = performance.now();

    // ── Start/resume timer ──
    if (!state.timerActive) {
      startActiveTimer();
      setStatus('Walking...', '#2E7D32');
    }

    // ── Reset inactivity watchdog ──
    resetInactivityWatchdog();

    // ── Update DOM ──
    refreshDOM();
  }
}

// ── iOS 13+ PERMISSION ────────────────────────────────────────
async function requestMotionPermission() {
  if (typeof DeviceMotionEvent === 'undefined') {
    setStatus('Accelerometer not supported on this device.', '#C62828');
    return false;
  }

  // iOS 13+ requires explicit permission
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    try {
      const response = await DeviceMotionEvent.requestPermission();
      if (response === 'granted') {
        return true;
      } else {
        setStatus('Motion permission denied. Please allow in Settings.', '#C62828');
        return false;
      }
    } catch (err) {
      setStatus('Error requesting motion permission: ' + err.message, '#C62828');
      return false;
    }
  }

  // Android / non-iOS — no permission needed
  return true;
}

// ── START TRACKING ────────────────────────────────────────────
async function startWalkTracker() {
  grabDOMRefs();

  if (state.running) return;

  const granted = await requestMotionPermission();
  if (!granted) return;

  // Reset state
  state.steps       = 0;
  state.distanceM   = 0;
  state.activeMs    = 0;
  state.timerActive = false;
  state.lastStepMs  = 0;
  state.lpX = state.lpY = state.lpZ = 0;
  state.prevMag = state.prevPrevMag = 0;

  state.running = true;
  refreshDOM();

  window.addEventListener('devicemotion', onDeviceMotion, { passive: true });

  setStatus('Ready — start walking!', '#1565C0');
  if (el.startBtn) el.startBtn.style.display = 'none';
  if (el.stopBtn)  el.stopBtn.style.display  = 'inline-flex';
}

// ── STOP TRACKING ────────────────────────────────────────────
function stopWalkTracker() {
  state.running = false;
  window.removeEventListener('devicemotion', onDeviceMotion);
  pauseActiveTimer();
  clearTimeout(state.inactivityTimer);

  setStatus(`Done! ${state.steps} steps · ${(state.distanceM / 1000).toFixed(3)} km · ${fmtTime(state.activeMs)} active`, '#2E7D32');

  if (el.stopBtn)  el.stopBtn.style.display  = 'none';
  if (el.startBtn) el.startBtn.style.display = 'inline-flex';

  // ── Save session to localStorage ──
  const session = {
    ts:       Date.now(),
    steps:    state.steps,
    distanceM: Math.round(state.distanceM),
    activeMs:  Math.round(state.activeMs),
  };
  const history = JSON.parse(localStorage.getItem('mobilityHistory') || '[]');
  history.push(session);
  localStorage.setItem('mobilityHistory', JSON.stringify(history));

  return session;
}

// ── PUBLIC API ────────────────────────────────────────────────
window.MobilityTracker = {
  start:      startWalkTracker,
  stop:       stopWalkTracker,
  getState:   () => ({ ...state }),
};

// ── AUTO-BIND BUTTONS IF PRESENT IN DOM ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  grabDOMRefs();
  const startBtn = document.getElementById('mobility-start-btn');
  const stopBtn  = document.getElementById('mobility-stop-btn');
  if (startBtn) startBtn.addEventListener('click', startWalkTracker);
  if (stopBtn)  stopBtn.addEventListener('click',  stopWalkTracker);
});
