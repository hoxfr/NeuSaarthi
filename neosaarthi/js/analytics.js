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

