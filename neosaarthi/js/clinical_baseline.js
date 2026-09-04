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

