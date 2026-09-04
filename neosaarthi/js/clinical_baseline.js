// NeoSaarthi

// CMT_feat(baselines):_Create_c
// NeoSaarthi Clinical Wellness Baseline Engine
// Normative thresholds — age-adjusted for elderly demographic (55–85)
const DOMAIN_BASELINES = {
  memory:    { healthy: 70, concern: 55, critical: 40, label: 'Memory & Recall' },
  attention: { healthy: 68, concern: 50, critical: 35, label: 'Attention & Focus' },
  speed:     { healthy: 72, concern: 58, critical: 42, label: 'Processing Speed' },
  executive: { healthy: 65, concern: 48, critical: 32, label: 'Executive Function' },
  inhibition:{ healthy: 70, concern: 52, critical: 38, label: 'Inhibitory Control' }
};

function getDomainStatus(domain, score) {
  const b = DOMAIN_BASELINES[domain];
  if (!b) return 'unknown';
  if (score >= b.healthy) return 'healthy';
  if (score >= b.concern) return 'concern';
  return 'critical';
}


// CMT_feat(baselines):_Implemen

function evaluateDomainFlags(profileScores) {
  const flags = [];
  Object.entries(profileScores).forEach(([domain, score]) => {
    const status = getDomainStatus(domain, score);
    if (status === 'critical') {
      flags.push({ domain, score, level: 'critical', message: `${DOMAIN_BASELINES[domain].label} needs immediate attention` });
    } else if (status === 'concern') {
      flags.push({ domain, score, level: 'concern', message: `${DOMAIN_BASELINES[domain].label} is below optimal range` });
    }
  });
  return flags;
}

function getOverallWellnessLevel(profileScores) {
  const avg = Object.values(profileScores).reduce((a, b) => a + b, 0) / Object.values(profileScores).length;
  if (avg >= 70) return { level: 'Standard', score: Math.round(avg) };
  if (avg >= 50) return { level: 'Focus Track', score: Math.round(avg) };
  return { level: 'Cognitive Scaffolding', score: Math.round(avg) };
}


// CMT_feat(baselines):_Add_anom

function detectAnomalousDrops(sessionHistory) {
  // Flags if any domain drops >15 points between consecutive sessions
  const ANOMALY_THRESHOLD = 15;
  const alerts = [];
  if (!sessionHistory || sessionHistory.length < 2) return alerts;
  const prev = sessionHistory[sessionHistory.length - 2];
  const curr = sessionHistory[sessionHistory.length - 1];
  Object.keys(DOMAIN_BASELINES).forEach(domain => {
    const drop = (prev[domain] || 0) - (curr[domain] || 0);
    if (drop > ANOMALY_THRESHOLD) {
      alerts.push({ domain, drop: Math.round(drop), message: `Significant change detected in ${DOMAIN_BASELINES[domain].label}` });
    }
  });
  return alerts;
}

