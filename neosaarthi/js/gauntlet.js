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


// CMT_feat(game3):_Target_Detec

function startTargetDetection(diff) {
  let hits = 0, total = 8 + diff, spawned = 0;
  const iv = setInterval(() => {
    if (spawned >= total) { clearInterval(iv); setTimeout(() => recordTaskScore(hits, total, Date.now() - taskStartTime), 1000); return; }
    const isTarget = Math.random() > 0.35;
    spawnDetectionCircle(randomPosition(), isTarget, elderlyTimer(diff > 3 ? 900 : 1300), (tapped) => {
      if (tapped && isTarget) hits++;
    });
    spawned++;
  }, elderlyTimer(1600 - diff * 150));
}


// CMT_feat(game4):_Attention_Sw

const SWITCH_RULES = ['color','shape','size'];
let switchRuleIdx = 0, switchCorrect = 0, switchTotal = 0;
function startAttentionSwitch(diff) {
  switchRuleIdx = 0; switchCorrect = 0; switchTotal = 10 + diff * 2;
  showCurrentRule(SWITCH_RULES[switchRuleIdx]);
  spawnNextSwitchItem();
}
function classifyItem(item, answer) {
  const rule = SWITCH_RULES[switchRuleIdx % SWITCH_RULES.length];
  const correct = rule === 'color' ? (item.color === 'blue') === answer
    : rule === 'shape' ? (item.shape === 'circle') === answer : (item.size === 'large') === answer;
  if (correct) switchCorrect++;
  if (++switchTotal % 4 === 0) { switchRuleIdx++; showCurrentRule(SWITCH_RULES[switchRuleIdx % SWITCH_RULES.length]); }
  if (switchTotal >= 10) recordTaskScore(switchCorrect, switchTotal, Date.now() - taskStartTime);
  else spawnNextSwitchItem();
}


// CMT_feat(game5):_Quick_Match_

const MATCH_ITEMS = ['cat','dog','bird','fish','rabbit','turtle','frog','horse'];
function startQuickMatch(diff) {
  const target = MATCH_ITEMS[Math.floor(Math.random() * MATCH_ITEMS.length)];
  const distractors = MATCH_ITEMS.filter(a => a !== target).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...[target,...distractors]].sort(() => Math.random() - 0.5);
  quickMatchTarget = target;
  renderQuickMatchUI(target, options);
  quickMatchTimer = setTimeout(() => recordTaskScore(0, 1, elderlyTimer(4000)), elderlyTimer(4000));
}
function answerQuickMatch(choice) {
  clearTimeout(quickMatchTimer);
  recordTaskScore(choice === quickMatchTarget ? 1 : 0, 1, Date.now() - taskStartTime);
}


// CMT_feat(game6):_Pattern_Comp

function startPatternCompletion(diff) {
  const steps = [2, 3, 5, 7, 10];
  const step = steps[Math.min(diff - 1, steps.length - 1)];
  const start = Math.floor(Math.random() * 10) + 1;
  const full = Array.from({ length: 6 }, (_, i) => start + i * step);
  const gapIdx = 2 + Math.floor(Math.random() * 3);
  patternAnswer = full[gapIdx];
  const display = full.map((n, i) => i === gapIdx ? '?' : n);
  renderPatternSequence(display);
}
function checkPatternAnswer(val) {
  recordTaskScore(parseInt(val) === patternAnswer ? 1 : 0, 1, Date.now() - taskStartTime);
}


// CMT_feat(game7):_Matrix_Reaso

function generateMatrixPuzzle(diff) {
  const patterns = ['increment','color-cycle','shape-rotate','size-grow'];
  const p = patterns[diff % patterns.length];
  const grid = buildMatrix(p, 3);
  matrixAnswer = grid[8];
  grid[8] = null;
  const wrongs = generateWrongOptions(matrixAnswer, 3);
  return { grid, options: [...wrongs, matrixAnswer].sort(() => Math.random() - 0.5) };
}
function checkMatrixAnswer(choice) {
  recordTaskScore(choice === matrixAnswer ? 1 : 0, 1, Date.now() - taskStartTime);
}


// CMT_feat(game8):_N-Back_Worki

let nBackHistory = [], nBackLevel = 1, nBackCorrect = 0, nBackTotal = 0;
function startNBack(diff) {
  nBackLevel = diff <= 2 ? 1 : 2;
  nBackHistory = []; nBackCorrect = 0; nBackTotal = 15;
  runNBackTrial(0);
}
function runNBackTrial(idx) {
  if (idx >= nBackTotal) { recordTaskScore(nBackCorrect, nBackTotal - nBackLevel, Date.now() - taskStartTime); return; }
  const stimulus = NBACK_STIMULI[Math.floor(Math.random() * NBACK_STIMULI.length)];
  const isMatch = nBackHistory.length >= nBackLevel && stimulus === nBackHistory[nBackHistory.length - nBackLevel];
  showNBackStimulus(stimulus, (userSaidMatch) => {
    if (idx >= nBackLevel) { if (userSaidMatch === isMatch) nBackCorrect++; }
    nBackHistory.push(stimulus);
    setTimeout(() => runNBackTrial(idx + 1), elderlyTimer(2200));
  });
}

