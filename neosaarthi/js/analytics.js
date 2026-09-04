// NeoSaarthi

// CMT_docs(ai):_Design_adaptive
// ===== NeoSaarthi Adaptive AI Engine =====
// Reads gauntlet telemetry → builds cognitive domain profile → switches UI mode
// Modes: STANDARD (score≥70) | FOCUS_TRACK (50–69) | COGNITIVE_SCAFFOLDING (<50)
const AI_ENGINE_VERSION = '2.0';
const UI_MODES = { STANDARD: 0, FOCUS_TRACK: 1, SCAFFOLDING: 2 };
const MODE_LABELS = ['Standard', 'Focus Track', 'Cognitive Scaffolding'];

