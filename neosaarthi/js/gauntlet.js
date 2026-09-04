// NeoSaarthi

// CMT_docs(gauntlet):_Blueprint
// ======== NeoSaarthi Gauntlet Engine v1.0 ========
// Task-queue driven: each cognitive game is a gauntlet task object
// Difficulty scales dynamically based on consecutive correct answers
const GAUNTLET_VERSION = '1.0';
const DIFFICULTY_LEVELS = { EASY: 1, MEDIUM: 2, HARD: 3, ADAPTIVE: 4 };
const GAME_DOMAIN_MAP = {
  sequenceMemory: 'memory', gridMemory: 'memory', nBack: 'memory', delayedRecall: 'memory',
  targetDetection: 'attention', attentionSwitch: 'executive', quickMatch: 'speed',
  patternCompletion: 'speed', matrixReasoning: 'executive', goNoGo: 'inhibition',
  ruleLearning: 'executive', memoryRecognition: 'memory', orderPlanning: 'executive'
};

