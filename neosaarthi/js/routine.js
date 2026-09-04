// ====================================================
// MODULE 3: DAILY WELLNESS ROUTINE & AUDIO THERAPY
// ====================================================

const DEFAULT_ROUTINE = {
    morning_brain: false,
    hydration: false,
    water_count: 0,
    walk: false,
    afternoon_puzzle: false,
    evening_audio: false,
    date: new Date().toDateString()
};

function getRoutineData() {
    let saved = localStorage.getItem('neosaarthi_routine_v2');
    if (!saved) return { ...DEFAULT_ROUTINE };
    try {
        let parsed = JSON.parse(saved);
        // Reset if new calendar day (ethical, realistic daily routine)
        if (parsed.date !== new Date().toDateString()) {
            return { ...DEFAULT_ROUTINE, date: new Date().toDateString() };
        }
        return parsed;
    } catch(e) {
        return { ...DEFAULT_ROUTINE };
    }
}

function saveRoutineData(data) {
    localStorage.setItem('neosaarthi_routine_v2', JSON.stringify(data));
}

function initRoutineScreen() {
    const data = getRoutineData();
    const taskMap = {
        'morning_brain': 'routine-task-morning',
        'hydration': 'routine-task-water',
        'walk': 'routine-task-walk',
        'afternoon_puzzle': 'routine-task-puzzle',
        'evening_audio': 'routine-task-audio'
    };

    let completedCount = 0;
    for (let key in taskMap) {
        const el = document.getElementById(taskMap[key]);
        if (el) {
            if (data[key]) {
                el.classList.add('done');
                completedCount++;
            } else {
                el.classList.remove('done');
            }
        }
    }

    // Hydration glass text
    const waterDesc = document.getElementById('routine-water-desc');
    if (waterDesc) {
        waterDesc.innerHTML = `11:00 AM &bull; ${data.water_count} / 6 Glasses Tracked Today`;
    }

    // Progress counter and bar
    const progText = document.getElementById('routine-progress-text');
    if (progText) {
        progText.innerText = `${completedCount} / 5 Completed`;
    }

    const progBar = document.getElementById('routine-progress-bar');
    if (progBar) {
        progBar.style.width = `${(completedCount / 5) * 100}%`;
    }
}

function markRoutineTaskDone(taskKey) {
    const data = getRoutineData();
    data[taskKey] = true;
    saveRoutineData(data);
    initRoutineScreen();
    playGentleChime();
}

function resetRoutineTasks() {
    const fresh = { ...DEFAULT_ROUTINE, date: new Date().toDateString() };
    saveRoutineData(fresh);
    initRoutineScreen();
    playGentleChime();
}

// --- ETHICAL MODAL & INTERACTION HANDLERS ---

function handleRoutineClick(taskKey) {
    const data = getRoutineData();
    
    if (taskKey === 'morning_brain') {
        showRoutineActionModal({
            icon: '&#x1F9E0;',
            badge: 'Prospective Memory Check',
            title: 'Morning Brain Warmup',
            desc: '<strong>Active Retrieval Practice:</strong> Take 10 seconds to recall: What day is today, and what is one goal you have? Actively retrieving memories primes your prefrontal cortex before playing your warmup game.',
            isDone: data.morning_brain,
            primaryBtnText: 'Play Quick Memory Game &#x25B6;',
            onPrimary: () => {
                closeRoutineModal();
                window.routineTaskCallback = () => {
                    markRoutineTaskDone('morning_brain');
                    showScreen('routine-screen');
                    showRoutineCongrats('Brain Warmup Complete! Great job actively challenging your working memory.');
                };
                startSingleGame(0); // Sequence Memory
            },
            onOffline: () => {
                closeRoutineModal();
                markRoutineTaskDone('morning_brain');
                showRoutineCongrats('Memory check-in logged! Daily self-recall keeps neural pathways active.');
            }
        });
    } else if (taskKey === 'hydration') {
        showHydrationModal();
    } else if (taskKey === 'walk') {
        showRoutineActionModal({
            icon: '&#x1F6B6;',
            badge: 'Mental Navigation & Movement',
            title: 'Gentle Walk & Movement',
            desc: '<strong>Spatial Recall Exercise:</strong> Can you mentally picture the route of your walk or garden stroll? Mental navigation exercises the parietal and hippocampal regions of the brain.',
            isDone: data.walk,
            primaryBtnText: 'Start Walk Tracker &#x25B6;',
            onPrimary: () => {
                closeRoutineModal();
                showScreen('walk-screen');
            },
            onOffline: () => {
                closeRoutineModal();
                markRoutineTaskDone('walk');
                showRoutineCongrats('Movement logged! Light movement increases oxygen and blood flow to memory centers.');
            }
        });
    } else if (taskKey === 'afternoon_puzzle') {
        showRoutineActionModal({
            icon: '&#x1F9E9;',
            badge: 'Working Memory Refresh',
            title: 'Afternoon Mind Refresh',
            desc: '<strong>Visual Recognition Check:</strong> A quick, relaxing matching game to counteract afternoon fatigue and train visual attention.',
            isDone: data.afternoon_puzzle,
            primaryBtnText: 'Play Quick Match &#x25B6;',
            onPrimary: () => {
                closeRoutineModal();
                window.routineTaskCallback = () => {
                    markRoutineTaskDone('afternoon_puzzle');
                    showScreen('routine-screen');
                    showRoutineCongrats('Afternoon Refresh Complete! Active visual discrimination strengthens memory.');
                };
                startSingleGame(4); // Animal Quick Match
            },
            onOffline: () => {
                closeRoutineModal();
                markRoutineTaskDone('afternoon_puzzle');
                showRoutineCongrats('Logged! Taking time for mental stimulation keeps the day balanced.');
            }
        });
    } else if (taskKey === 'evening_audio') {
        showAudioTherapyModal();
    }
}

function closeRoutineModal() {
    const existing = document.getElementById('routine-action-modal');
    if (existing) existing.remove();
}

function showRoutineActionModal(config) {
    closeRoutineModal();

    const modal = document.createElement('div');
    modal.id = 'routine-action-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0'; modal.style.left = '0';
    modal.style.width = '100vw'; modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.style.backdropFilter = 'blur(4px)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10000';
    modal.style.animation = 'fadeIn 0.2s ease-out';

    modal.innerHTML = `
        <div style="background: white; border-radius: 24px; padding: 26px 22px; width: 90%; max-width: 380px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.25);">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: #E0F2F1; color: #00796B; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-bottom: 12px;">
                <span class="material-symbols-rounded" style="font-size: 15px;">psychology</span> ${config.badge || 'Cognitive Scaffolding'}
            </div>
            
            <div style="font-size: 48px; margin-bottom: 8px;">${config.icon}</div>
            <h2 style="color: #37474F; font-size: 21px; margin: 0 0 8px 0; font-weight: 800;">${config.title}</h2>
            <p style="color: #555; font-size: 13.5px; margin: 0 0 20px 0; line-height: 1.5;">${config.desc}</p>
            
            ${config.isDone ? `
                <div style="background: #E8F5E9; color: #2E7D32; padding: 10px; border-radius: 14px; font-weight: bold; margin-bottom: 16px; font-size: 14px;">
                    &#x2705; Already completed for today!
                </div>
            ` : ''}

            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="routine-modal-primary" style="background: #00796B; color: white; border: none; padding: 15px; font-size: 16px; font-weight: bold; border-radius: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,121,107,0.3);">
                    ${config.primaryBtnText}
                </button>
                
                <button id="routine-modal-offline" style="background: #F1F8E9; border: 2px solid #81C784; color: #2E7D32; padding: 13px; font-size: 14px; font-weight: 700; border-radius: 16px; cursor: pointer;">
                    &#x2714; Mark as Done (Self-Reflected Offline)
                </button>
                
                <button onclick="closeRoutineModal()" style="background: none; border: none; color: #90A4AE; padding: 8px; font-size: 13px; cursor: pointer;">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('routine-modal-primary').onclick = config.onPrimary;
    document.getElementById('routine-modal-offline').onclick = config.onOffline;
}

// --- COGNITIVE SCAFFOLDING HYDRATION RECALL MODAL ---

function showHydrationModal() {
    closeRoutineModal();
    const data = getRoutineData();

    const modal = document.createElement('div');
    modal.id = 'routine-action-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0'; modal.style.left = '0';
    modal.style.width = '100vw'; modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.style.backdropFilter = 'blur(4px)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10000';

    modal.innerHTML = `
        <div style="background: white; border-radius: 24px; padding: 26px 20px; width: 90%; max-width: 380px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.25);">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: #E0F2F1; color: #00796B; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-bottom: 10px;">
                <span class="material-symbols-rounded" style="font-size: 15px;">psychology</span> Active Recall Check
            </div>
            
            <div style="font-size: 44px; margin-bottom: 4px;">&#x1F4A7;</div>
            <h2 style="color: #0277BD; font-size: 21px; margin: 0 0 6px 0; font-weight: 800;">Hydration & Memory</h2>
            <p style="color: #555; font-size: 13.5px; margin: 0 0 16px 0; line-height: 1.4;">
                <strong>Test your recent memory:</strong> Can you recall when you last drank a glass of water today?
            </p>

            <!-- Active Retrieval Buttons -->
            <div id="recall-options-box" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                <button class="recall-btn" onclick="submitHydrationRecall('recent', this)" style="background: #F1F8E9; border: 2px solid #AED581; color: #33691E; padding: 11px 14px; border-radius: 12px; font-size: 13.5px; font-weight: 600; cursor: pointer; text-align: left; transition: 0.2s;">
                    &#x2600;&#xFE0F; Recently (Past 1-2 hours)
                </button>
                <button class="recall-btn" onclick="submitHydrationRecall('meal', this)" style="background: #FFF8E1; border: 2px solid #FFE082; color: #F57F17; padding: 11px 14px; border-radius: 12px; font-size: 13.5px; font-weight: 600; cursor: pointer; text-align: left; transition: 0.2s;">
                    &#x1F374; Around mealtime earlier
                </button>
                <button class="recall-btn" onclick="submitHydrationRecall('not_sure', this)" style="background: #E3F2FD; border: 2px solid #90CAF9; color: #0D47A1; padding: 11px 14px; border-radius: 12px; font-size: 13.5px; font-weight: 600; cursor: pointer; text-align: left; transition: 0.2s;">
                    &#x1F914; Not sure / Need a fresh glass now!
                </button>
            </div>

            <!-- Recall Feedback Box -->
            <div id="recall-feedback-box" style="display: none; background: #E8F5E9; border: 1px solid #A5D6A7; border-radius: 12px; padding: 10px 12px; margin-bottom: 14px; font-size: 12.5px; color: #2E7D32; line-height: 1.4; text-align: left;">
                <strong>&#x1F9E0; Brain Stimulated!</strong> Actively reflecting on recent events exercises your episodic memory and strengthens hippocampal recall.
            </div>
            
            <div style="background: #F1F8E9; border-radius: 14px; padding: 10px 14px; margin-bottom: 14px; border: 1px solid #C5E1A5; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; color: #33691E; font-weight: 700;">Glasses Tracked Today:</span>
                <span id="modal-water-count" style="font-size: 20px; font-weight: 800; color: #0277BD;">${data.water_count} / 6</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="btn-drink-water" style="background: linear-gradient(135deg, #0288D1, #01579B); color: white; border: none; padding: 14px; font-size: 16px; font-weight: bold; border-radius: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(2,136,209,0.3);">
                    &#x1F4A7; Log Glass & Check Off Task
                </button>
                
                <button onclick="closeRoutineModal()" style="background: none; border: none; color: #90A4AE; padding: 6px; font-size: 13px; cursor: pointer;">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('btn-drink-water').onclick = () => {
        const cur = getRoutineData();
        cur.water_count = (cur.water_count || 0) + 1;
        cur.hydration = true;
        saveRoutineData(cur);
        initRoutineScreen();
        playGentleWaterDropSound();
        closeRoutineModal();
        showRoutineCongrats('Recall & Hydration Tracked! Self-reflection and hydration both keep your brain resilient.');
    };
}

function submitHydrationRecall(choice, btn) {
    document.querySelectorAll('.recall-btn').forEach(b => {
        b.style.opacity = '0.4';
        b.style.pointerEvents = 'none';
    });
    btn.style.opacity = '1';
    btn.style.borderColor = '#2E7D32';
    btn.style.borderWidth = '3px';
    const fb = document.getElementById('recall-feedback-box');
    if (fb) {
        fb.style.display = 'block';
        playGentleChime();
    }
}


// --- AUDIO THERAPY & CALMING SOUNDSCAPE MODULE ---

let activeAudioNodes = null;
let breathingInterval = null;

function showAudioTherapyModal() {
    closeRoutineModal();
    const data = getRoutineData();

    const modal = document.createElement('div');
    modal.id = 'routine-action-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0'; modal.style.left = '0';
    modal.style.width = '100vw'; modal.style.height = '100vh';
    modal.style.background = 'rgba(10, 25, 47, 0.85)';
    modal.style.backdropFilter = 'blur(8px)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10000';

    modal.innerHTML = `
        <div style="background: #1A2B42; color: white; border-radius: 28px; padding: 30px 22px; width: 92%; max-width: 400px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 40px; margin-bottom: 6px;">&#x1F3A7;</div>
            <h2 style="color: #90CAF9; font-size: 22px; margin: 0 0 6px 0; font-weight: 800;">Evening Audio Therapy</h2>
            <p style="color: #B0BEC5; font-size: 13px; margin: 0 0 20px 0;">Soothing soundscapes & guided breathing to ease evening restlessness and support deep sleep.</p>

            <!-- Breathing Circle -->
            <div style="position: relative; width: 170px; height: 170px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                <div id="breathing-ring" style="position: absolute; width: 120px; height: 120px; border-radius: 50%; background: radial-gradient(circle, rgba(100,181,246,0.35) 0%, rgba(30,136,229,0.1) 70%); border: 3px solid #64B5F6; transition: 4s ease-in-out;"></div>
                <div id="breathing-text" style="position: relative; z-index: 2; font-size: 17px; font-weight: 700; color: white;">Breathe In</div>
            </div>

            <!-- Sound Selection -->
            <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 22px;">
                <button class="sound-chip active-chip" onclick="switchSoundscape('rain', this)" style="background: #283E58; color: #90CAF9; border: 1px solid #64B5F6; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">
                    &#x1F327;&#xFE0F; Rain
                </button>
                <button class="sound-chip" onclick="switchSoundscape('bowl', this)" style="background: #283E58; color: #B0BEC5; border: 1px solid rgba(255,255,255,0.15); padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">
                    &#x1F9D8; Singing Bowl
                </button>
                <button class="sound-chip" onclick="switchSoundscape('flute', this)" style="background: #283E58; color: #B0BEC5; border: 1px solid rgba(255,255,255,0.15); padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">
                    &#x1FA84; Flute Drone
                </button>
            </div>

            <!-- Audio Toggle & Complete -->
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button id="btn-toggle-sound" onclick="toggleSoundscapePlay()" style="background: #0288D1; color: white; border: none; padding: 15px; font-size: 16px; font-weight: bold; border-radius: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <span id="sound-play-icon">&#x25B6;</span> <span id="sound-play-text">Start Calming Soundscape</span>
                </button>

                <button onclick="finishAudioTherapySession()" style="background: linear-gradient(135deg, #4CAF50, #2E7D32); color: white; border: none; padding: 15px; font-size: 16px; font-weight: bold; border-radius: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(76,175,80,0.3);">
                    &#x2714; Complete Session & Mark Done
                </button>

                <button onclick="closeAudioTherapyModal()" style="background: none; border: none; color: #90A4AE; padding: 8px; font-size: 13px; cursor: pointer;">
                    Exit
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    startBreathingAnimation();
}

function closeAudioTherapyModal() {
    stopSoundscape();
    if (breathingInterval) clearInterval(breathingInterval);
    closeRoutineModal();
}

function finishAudioTherapySession() {
    stopSoundscape();
    if (breathingInterval) clearInterval(breathingInterval);
    closeRoutineModal();
    markRoutineTaskDone('evening_audio');
    showRoutineCongrats('Evening Relaxation Complete! May you have a peaceful, deep, and restful night.');
}

function startBreathingAnimation() {
    if (breathingInterval) clearInterval(breathingInterval);
    const ring = document.getElementById('breathing-ring');
    const text = document.getElementById('breathing-text');
    if (!ring || !text) return;

    let state = 0; // 0: inhale (4s), 1: hold (2s), 2: exhale (4s), 3: rest (2s)
    function cycle() {
        if (!document.getElementById('breathing-ring')) {
            clearInterval(breathingInterval);
            return;
        }
        if (state === 0) {
            text.innerText = 'Breathe In...';
            ring.style.transform = 'scale(1.4)';
            ring.style.opacity = '1';
            setTimeout(cycle, 4000);
            state = 1;
        } else if (state === 1) {
            text.innerText = 'Hold Gently...';
            setTimeout(cycle, 2000);
            state = 2;
        } else if (state === 2) {
            text.innerText = 'Slowly Breathe Out...';
            ring.style.transform = 'scale(1.0)';
            ring.style.opacity = '0.6';
            setTimeout(cycle, 4000);
            state = 3;
        } else {
            text.innerText = 'Rest...';
            setTimeout(cycle, 2000);
            state = 0;
        }
    }
    cycle();
}

// --- WEB AUDIO API REAL-TIME SYNTHESIS (Zero External File Dependencies) ---
let audioCtx = null;
let currentSoundType = 'rain';
let isSoundPlaying = false;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function switchSoundscape(type, btn) {
    currentSoundType = type;
    document.querySelectorAll('.sound-chip').forEach(b => {
        b.style.color = '#B0BEC5';
        b.style.borderColor = 'rgba(255,255,255,0.15)';
    });
    if (btn) {
        btn.style.color = '#90CAF9';
        btn.style.borderColor = '#64B5F6';
    }
    if (isSoundPlaying) {
        stopSoundscape();
        startSoundscape(currentSoundType);
    }
}

function toggleSoundscapePlay() {
    if (isSoundPlaying) {
        stopSoundscape();
        const icon = document.getElementById('sound-play-icon');
        const text = document.getElementById('sound-play-text');
        if (icon) icon.innerText = '&#x25B6;';
        if (text) text.innerText = 'Start Calming Soundscape';
    } else {
        startSoundscape(currentSoundType);
        const icon = document.getElementById('sound-play-icon');
        const text = document.getElementById('sound-play-text');
        if (icon) icon.innerText = '&#x23F8;';
        if (text) text.innerText = 'Pause Soundscape';
    }
}

function startSoundscape(type) {
    try {
        const ctx = getAudioContext();
        stopSoundscape();
        isSoundPlaying = true;

        if (type === 'rain') {
            // Synthesized Pink Noise with low-pass filter
            const bufferSize = ctx.sampleRate * 2;
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            let b0 = 0, b1 = 0, b2 = 0;
            for (let i = 0; i < bufferSize; i++) {
                let white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                output[i] = (b0 + b1 + b2) * 0.08;
            }
            const whiteNoise = ctx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            whiteNoise.loop = true;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 1.5);

            whiteNoise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            whiteNoise.start();

            activeAudioNodes = { source: whiteNoise, gain: gain };
        } else if (type === 'bowl') {
            // Harmonic Singing Bowl tones (216Hz, 432Hz)
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = 'sine'; osc1.frequency.setValueAtTime(216, ctx.currentTime);
            osc2.type = 'sine'; osc2.frequency.setValueAtTime(432, ctx.currentTime);

            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.2);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            osc1.start();
            osc2.start();

            activeAudioNodes = { source: osc1, source2: osc2, gain: gain };
        } else if (type === 'flute') {
            // Warm Tanpura / Meditative Flute Drone (144Hz with gentle tremolo)
            const osc = ctx.createOscillator();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(144, ctx.currentTime);

            lfo.frequency.setValueAtTime(4.5, ctx.currentTime);
            lfoGain.gain.setValueAtTime(2.5, ctx.currentTime);
            lfo.connect(osc.frequency);

            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.5);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            lfo.start();

            activeAudioNodes = { source: osc, lfo: lfo, gain: gain };
        }
    } catch(e) {
        console.log('Audio Context Error:', e);
    }
}

function stopSoundscape() {
    isSoundPlaying = false;
    if (activeAudioNodes && audioCtx) {
        try {
            if (activeAudioNodes.gain) {
                activeAudioNodes.gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            }
            setTimeout(() => {
                if (activeAudioNodes && activeAudioNodes.source) {
                    try { activeAudioNodes.source.stop(); } catch(e) {}
                }
                if (activeAudioNodes && activeAudioNodes.source2) {
                    try { activeAudioNodes.source2.stop(); } catch(e) {}
                }
                if (activeAudioNodes && activeAudioNodes.lfo) {
                    try { activeAudioNodes.lfo.stop(); } catch(e) {}
                }
                activeAudioNodes = null;
            }, 350);
        } catch(e) {
            activeAudioNodes = null;
        }
    }
}

function playGentleChime() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz Solfeggio Love/Healing tone
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.9);
    } catch(e) {}
}

function playGentleWaterDropSound() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
    } catch(e) {}
}

function showRoutineCongrats(message) {
    const existing = document.getElementById('routine-congrats-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'routine-congrats-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0'; modal.style.left = '0';
    modal.style.width = '100vw'; modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.style.backdropFilter = 'blur(4px)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10001';
    modal.style.animation = 'fadeIn 0.2s ease-out';

    modal.innerHTML = `
        <div style="background: white; border-radius: 24px; padding: 28px 24px; width: 90%; max-width: 380px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.25);">
            <div style="font-size: 55px; margin-bottom: 12px;">&#x1F31F;</div>
            <h2 style="color: #00796B; font-size: 22px; margin: 0 0 8px 0; font-weight: 800;">Wonderful Progress!</h2>
            <p style="color: #555; font-size: 15px; margin: 0 0 22px 0; line-height: 1.5;">${message}</p>
            
            <button onclick="document.getElementById('routine-congrats-modal').remove()" style="background: #00796B; color: white; border: none; padding: 14px 28px; font-size: 16px; font-weight: bold; border-radius: 24px; cursor: pointer; width: 100%; box-shadow: 0 4px 10px rgba(0,121,107,0.3);">
                Continue Routine &#x2714;
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}
