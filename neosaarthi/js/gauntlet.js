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


// CMT_feat(gauntlet):_Implement

let gauntletQueue = [], currentTask = null, gauntletSession = { scores: [], startTime: null };

function startGauntletSession(selectedGames) {
  gauntletSession = { scores: [], startTime: Date.now() };
  gauntletQueue = selectedGames.map(g => ({ id: g, domain: GAME_DOMAIN_MAP[g], startFn: GAME_RUNNERS[g] }));
  loadNextGauntletTask();
}

function loadNextGauntletTask() {
  if (gauntletQueue.length === 0) { finalizeGauntletSession(); return; }
  currentTask = gauntletQueue.shift();
  showScreen('gauntlet-game-screen');
  currentTask.startFn(currentDifficulty);
}

function recordTaskScore(correct, total, timeTakenMs) {
  const speedFactor = Math.min(1.2, Math.max(0.5, 3000 / timeTakenMs));
  const score = Math.round((correct / total) * speedFactor * 100);
  gauntletSession.scores.push({ domain: currentTask.domain, score, maxScore: 100 });
  adjustDifficulty(correct / total);
  loadNextGauntletTask();
}


// CMT_feat(game1):_Sequence_Mem

function startSequenceMemory(diff) {
  const count = Math.min(2 + diff, 6);
  const shapes = ['circle','square','triangle','star','diamond','hexagon'];
  const seq = Array.from({ length: count }, () => shapes[Math.floor(Math.random() * shapes.length)]);
  sequenceMemoryAnswer = [...seq];
  let i = 0;
  const flashNext = () => {
    if (i >= seq.length) { setTimeout(enableSequenceRecall, 800); return; }
    showShapeFlash(seq[i++]);
    setTimeout(flashNext, elderlyTimer(1200));
  };
  flashNext();
}
function checkSequenceMemory(userSeq) {
  const correct = userSeq.every((s, i) => s === sequenceMemoryAnswer[i]) ? sequenceMemoryAnswer.length : 0;
  recordTaskScore(correct, sequenceMemoryAnswer.length, Date.now() - taskStartTime);
}


// CMT_feat(game2):_Grid_Memory_

function startGridMemory(diff) {
  const size = diff <= 2 ? 3 : 4;
  const count = diff + 2;
  const total = size * size;
  const cells = [];
  while (cells.length < count) {
    const c = Math.floor(Math.random() * total);
    if (!cells.includes(c)) cells.push(c);
  }
  gridMemoryAnswer = cells;
  renderGrid(size, cells, () => setTimeout(enableGridRecall, 500));
}
let lastGridTap = 0;
function handleGridTap(idx) {
  if (Date.now() - lastGridTap < 300) return; // debounce elderly double-tap
  lastGridTap = Date.now();
  toggleGridCell(idx);
}
function submitGridMemory(selected) {
  const correct = selected.filter(c => gridMemoryAnswer.includes(c)).length;
  recordTaskScore(correct, gridMemoryAnswer.length, Date.now() - taskStartTime);
}

