// NeoSaarthi

// CMT_docs(ai):_Design_adaptive
// ===== NeoSaarthi Adaptive AI Engine =====
// Reads gauntlet telemetry → builds cognitive domain profile → switches UI mode
// Modes: STANDARD (score≥70) | FOCUS_TRACK (50–69) | COGNITIVE_SCAFFOLDING (<50)
const AI_ENGINE_VERSION = '2.0';
const UI_MODES = { STANDARD: 0, FOCUS_TRACK: 1, SCAFFOLDING: 2 };
const MODE_LABELS = ['Standard', 'Focus Track', 'Cognitive Scaffolding'];


// CMT_feat(ai):_Implement_gaunt

function loadGameScores() {
  const raw = localStorage.getItem('gauntletHistory');
  if (!raw) return [];
  const history = JSON.parse(raw);
  // Flatten all sessions into domain-score pairs
  return history.flatMap(session =>
    session.scores.map(s => ({ domain: s.domain, score: s.score, ts: session.ts }))
  );
}

function getRecentScores(days = 7) {
  const cutoff = Date.now() - days * 86400000;
  return loadGameScores().filter(s => s.ts >= cutoff);
}


// CMT_feat(ai):_Build_domain_sc

function buildCognitiveProfile(scores) {
  const domains = ['memory', 'attention', 'speed', 'executive', 'inhibition'];
  const profile = {};
  domains.forEach(d => {
    const domainScores = scores.filter(s => s.domain === d);
    if (domainScores.length === 0) { profile[d] = 50; return; } // default mid
    // Weight recent scores more heavily
    const weighted = domainScores.map((s, i) => s.score * (1 + i * 0.1));
    profile[d] = Math.round(weighted.reduce((a, b) => a + b, 0) / weighted.length);
  });
  return profile;
}

function safeScore(arr) {
  if (!arr || arr.length === 0) return 50;
  const valid = arr.filter(x => typeof x === 'number' && !isNaN(x));
  return valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : 50;
}


// CMT_feat(ai):_Implement_deter

function determineUIMode(profile) {
  const avg = Object.values(profile).reduce((a, b) => a + b, 0) / Object.values(profile).length;
  if (avg >= 70) return UI_MODES.STANDARD;
  if (avg >= 50) return UI_MODES.FOCUS_TRACK;
  return UI_MODES.SCAFFOLDING;
}

function runAICognitiveProfiler() {
  const scores = getRecentScores(7);
  const profile = buildCognitiveProfile(scores);
  const mode = determineUIMode(profile);
  cacheProfile({ profile, mode, ts: Date.now() });
  applyUIMode(mode);
  return { profile, mode };
}


// CMT_feat(ai-ui):_Build_dynami

function prioritizeHomeCards(profile) {
  const sorted = Object.entries(profile).sort(([,a],[,b]) => a - b); // weakest first
  const weakest = sorted[0][0];
  const cardOrder = {
    memory: ['family-screen', 'game-menu-screen', 'routine-screen'],
    attention: ['game-menu-screen', 'routine-screen', 'family-screen'],
    speed: ['game-menu-screen', 'family-screen', 'routine-screen'],
    executive: ['routine-screen', 'game-menu-screen', 'family-screen'],
    inhibition: ['game-menu-screen', 'routine-screen', 'family-screen']
  };
  return cardOrder[weakest] || ['game-menu-screen', 'family-screen', 'routine-screen'];
}


// CMT_feat(ai-ui):_Implement_ap

function applyUIMode(mode) {
  document.body.dataset.uiMode = MODE_LABELS[mode].toLowerCase().replace(' ', '-');
  if (mode === UI_MODES.SCAFFOLDING) {
    document.querySelectorAll('.scaffolding-badge').forEach(el => el.style.display = 'flex');
    document.querySelectorAll('.btn-primary').forEach(b => b.style.minHeight = '64px');
    showCognitiveCue('Let us start with something familiar today.');
  } else {
    document.querySelectorAll('.scaffolding-badge').forEach(el => el.style.display = 'none');
  }
  updateProgressUI();
}


// CMT_feat(ai):_Implement_getAc

function getAccurateProgressMetrics() {
  const scores = getRecentScores(30);
  const profile = buildCognitiveProfile(scores);
  const overall = Math.round(Object.values(profile).reduce((a, b) => a + b, 0) / Object.keys(profile).length);
  const trend = computeTrend(scores);
  return { overall, domains: profile, trend, totalSessions: getSessionCount() };
}

function computeTrend(scores) {
  if (scores.length < 4) return 'stable';
  const half = Math.floor(scores.length / 2);
  const early = scores.slice(0, half).reduce((a, s) => a + s.score, 0) / half;
  const late  = scores.slice(half).reduce((a, s) => a + s.score, 0) / (scores.length - half);
  if (late - early > 5) return 'improving';
  if (early - late > 5) return 'declining';
  return 'stable';
}

function getSessionCount() {
  return JSON.parse(localStorage.getItem('gauntletHistory') || '[]').length;
}


// CMT_feat(ai-ui):_Render_AI_Ca

function renderAICareBanner(metrics) {
  const el = document.getElementById('ai-care-track-banner');
  if (!el) return;
  const { overall, trend } = metrics;
  const level = overall >= 70 ? 'Great' : overall >= 50 ? 'Good' : 'Needs Attention';
  const trendIcon = { improving: 'Going up', declining: 'Needs more practice', stable: 'Steady' }[trend];
  el.innerHTML = `
    <span class="wellness-level">${level}</span>
    <span class="wellness-score">${overall}%</span>
    <span class="wellness-trend">${trendIcon}</span>
  `;
}


// CMT_feat(ai-ui):_Render_clini

const CLINICAL_REFERENCE = { memory: 72, attention: 68, speed: 75, executive: 65, inhibition: 70 };

function renderBaselineComparisonCard(profile) {
  const card = document.getElementById('ai-clinical-comparison-card');
  if (!card) return;
  const tbody = card.querySelector('tbody');
  if (!tbody) return;
  tbody.innerHTML = Object.entries(CLINICAL_REFERENCE).map(([domain, ref]) => {
    const score = profile[domain] || 50;
    const diff = score - ref;
    const cls = diff >= 0 ? 'above' : 'below';
    return `<tr class="${cls}">
      <td>${domain.charAt(0).toUpperCase() + domain.slice(1)}</td>
      <td>${score}%</td>
      <td>${ref}%</td>
      <td>${diff >= 0 ? '+' : ''}${diff}%</td>
    </tr>`;
  }).join('');
}

