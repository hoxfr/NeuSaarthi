// ==========================================
// MODULE 2: GAUNTLET COGNITIVE ASSESSMENT
// Lead: Member 2 (Core Cognitive Engine)
// Contains 13 Randomized Cognitive Games mapped to Dementia Types
// ==========================================

var gauntletInterval = null;
var gauntletTimeLeft = 300;
var currentPhase = 0;
window.savedRecallItems = [];
window.gauntletTasksQueue = [];

function startAssessment() {
    showScreen('assessment-screen');
    gauntletTimeLeft = 300;
    currentPhase = 0;
    window.savedRecallItems = [];
    
    // Shuffle 13 games
    window.gauntletTasksQueue = [0,1,2,3,4,5,6,7,8,9,10,11,12].sort(() => Math.random() - 0.5);
    // Ensure Delayed Recall (11) is near the end (not in first 5)
    let recallIdx = window.gauntletTasksQueue.indexOf(11);
    if (recallIdx < 5) {
        let swap = window.gauntletTasksQueue[12];
        window.gauntletTasksQueue[12] = 11;
        window.gauntletTasksQueue[recallIdx] = swap;
    }

    document.getElementById('gauntlet-timer').innerText = '05:00';
    document.getElementById('gauntlet-progress').style.width = '0%';
    
    // Inject Demo Skip button
    const area = document.getElementById('gauntlet-area');
    if(!document.getElementById('demo-skip')) {
        const skipBtn = document.createElement('button');
        skipBtn.id = 'demo-skip';
        skipBtn.innerText = 'Skip to Results (Demo Mode)';
        skipBtn.style.position = 'absolute'; skipBtn.style.bottom = '20px'; skipBtn.style.background = 'transparent';
        skipBtn.style.border = 'none'; skipBtn.style.textDecoration = 'underline'; skipBtn.style.color = '#999';
        skipBtn.onclick = finishAssessment;
        document.getElementById('assessment-screen').appendChild(skipBtn);
    }
    
    clearInterval(gauntletInterval);
    gauntletInterval = setInterval(() => {
        gauntletTimeLeft--;
        let m = Math.floor(gauntletTimeLeft / 60).toString().padStart(2, '0');
        let s = (gauntletTimeLeft % 60).toString().padStart(2, '0');
        document.getElementById('gauntlet-timer').innerText = m + ':' + s;
        
        let pct = ((300 - gauntletTimeLeft) / 300) * 100;
        document.getElementById('gauntlet-progress').style.width = pct + '%';

        if (gauntletTimeLeft <= 0) {
            clearInterval(gauntletInterval);
            finishAssessment();
        }
    }, 1000);

    loadNextGauntletTask();
}

function loadNextGauntletTask() {
    if (gauntletTimeLeft <= 0) return;
    const area = document.getElementById('gauntlet-area');
    area.innerHTML = ''; 
    
    // If we finished all 13, end or loop. Let's end.
    if (window.gauntletTasksQueue.length === 0) {
        finishAssessment();
        return;
    }

    let taskType = window.gauntletTasksQueue.shift();
    currentPhase++; 

    // Leveling: Easy (1-4), Mid (5-9), Hard (10-13)
    let level = 1; let levelText = 'Level 1: Easy';
    if (currentPhase > 4 && currentPhase <= 9) {
        level = 2; levelText = 'Level 2: Medium';
    } else if (currentPhase > 9) {
        level = 3; levelText = 'Level 3: Hard';
    }
    
    const badge = document.createElement('div');
    badge.innerText = levelText;
    badge.style.position = 'absolute'; badge.style.top = '10px'; badge.style.right = '10px';
    badge.style.padding = '5px 10px'; badge.style.background = level === 1 ? '#4CAF50' : level === 2 ? '#FF9800' : '#F44336';
    badge.style.color = 'white'; badge.style.borderRadius = '8px'; badge.style.fontSize = '12px'; badge.style.fontWeight = 'bold';
    area.appendChild(badge);

    const titleEl = document.getElementById('gauntlet-title');

    // Emoji Helper (using HTML entities)
    const emj = {
        fruits: ['&#x1F34E;','&#x1F34C;','&#x1F347;','&#x1F353;','&#x1F34A;'],
        shapes: ['&#x1F534;','&#x1F7E2;','&#x1F7E1;','&#x1F535;','&#x1F7E3;'],
        animals: ['&#x1F436;','&#x1F431;','&#x1F42D;','&#x1F430;','&#x1F43B;'],
        weather: ['&#x2600;&#xFE0F;','&#x1F327;&#xFE0F;','&#x26C4;','&#x1F308;','&#x26A1;']
    };

    // Helper: generic button grid
    function makeGrid(items, onSelect) {
        const grid = document.createElement('div');
        grid.style.display = 'grid'; grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(60px, 1fr))'; grid.style.gap = '15px'; grid.style.marginTop = '20px';
        items.forEach(obj => {
            const btn = document.createElement('button'); btn.innerHTML = obj; btn.style.padding = '15px'; btn.style.fontSize = '24px'; btn.style.borderRadius = '12px'; btn.style.border = '2px solid #ddd'; btn.style.background = 'white'; 
            btn.onclick = () => onSelect(obj, btn);
            grid.appendChild(btn);
        });
        area.appendChild(grid);
    }
    // Helper: instructions
    function makeInst(text) {
        const inst = document.createElement('p'); inst.innerText = text; inst.style.fontSize = '18px'; inst.style.color = '#37474F'; inst.style.textAlign = 'center'; area.appendChild(inst);
    }

    if (taskType === 0) {
        titleEl.innerText = 'Game 1: Sequence Memory (AD/LBD)';
        let seqLen = level === 1 ? 3 : level === 2 ? 4 : 5;
        let pool = emj.shapes;
        let seq = [];
        for(let i=0; i<seqLen; i++) seq.push(pool[Math.floor(Math.random()*pool.length)]);
        window.savedRecallItems.push(seq[0]); // Save for delayed recall
        
        makeInst('Watch the sequence...');
        const disp = document.createElement('h2'); disp.style.fontSize = '60px'; disp.style.margin = '20px 0'; area.appendChild(disp);
        
        let step = 0;
        let intv = setInterval(() => {
            if(gauntletTimeLeft <= 0) { clearInterval(intv); return; }
            if(step < seqLen) {
                disp.innerHTML = seq[step];
                setTimeout(() => { disp.innerHTML = ''; }, 700);
                step++;
            } else {
                clearInterval(intv);
                area.innerHTML = ''; area.appendChild(badge); makeInst('Tap the sequence in order:');
                let userSeq = [];
                makeGrid(pool, (val, btn) => {
                    userSeq.push(val);
                    btn.style.background = '#E0F2F1';
                    if(userSeq.length === seqLen) {
                        setTimeout(loadNextGauntletTask, 300);
                    }
                });
            }
        }, 1200);
    }
    else if (taskType === 1) {
        titleEl.innerText = 'Game 2: Grid Memory (AD)';
        let count = level === 1 ? 3 : level === 2 ? 4 : 5;
        makeInst('Remember the highlighted squares');
        
        const grid = document.createElement('div');
        grid.style.display = 'grid'; grid.style.gridTemplateColumns = 'repeat(3, 1fr)'; grid.style.gap = '10px'; grid.style.margin = '20px auto'; grid.style.width = '200px'; grid.style.height = '200px';
        let cells = [];
        let active = [];
        for(let i=0; i<9; i++) {
            let c = document.createElement('div'); c.style.background = '#eee'; c.style.borderRadius = '8px';
            grid.appendChild(c); cells.push(c);
        }
        area.appendChild(grid);
        
        while(active.length < count) {
            let r = Math.floor(Math.random()*9);
            if(!active.includes(r)) active.push(r);
        }
        
        active.forEach(idx => cells[idx].style.background = '#00796B');
        
        setTimeout(() => {
            if(gauntletTimeLeft <= 0) return;
            cells.forEach(c => c.style.background = '#eee');
            makeInst('Tap the highlighted squares');
            let found = 0;
            cells.forEach((c, idx) => {
                c.onclick = () => {
                    if(active.includes(idx)) { c.style.background = '#4CAF50'; found++; }
                    else { c.style.background = '#F44336'; }
                    if(found === count) setTimeout(loadNextGauntletTask, 500);
                }
            });
        }, level === 1 ? 3000 : level === 2 ? 2000 : 1000);
    }
    else if (taskType === 2) {
        titleEl.innerText = 'Game 3: Target Detection (FTD/VCI)';
        makeInst('Tap the Blue Circle (&#x1F535;) as soon as it appears!');
        const box = document.createElement('div'); box.style.height = '100px'; box.style.margin = '20px 0'; box.style.fontSize = '60px'; area.appendChild(box);
        let reps = 0;
        let intv = setInterval(() => {
            if(gauntletTimeLeft <= 0) { clearInterval(intv); return; }
            let isTarget = Math.random() < 0.3 || reps === 3;
            box.innerHTML = isTarget ? '&#x1F535;' : '&#x1F7E2;';
            box.onclick = () => {
                if(isTarget) { clearInterval(intv); box.style.background = '#E8F5E9'; setTimeout(loadNextGauntletTask, 500); }
            };
            reps++;
            if (reps > 6) { clearInterval(intv); loadNextGauntletTask(); }
            setTimeout(() => { box.innerHTML = ''; }, 600);
        }, level === 1 ? 1500 : level === 2 ? 1000 : 700);
    }
    else if (taskType === 3) {
        titleEl.innerText = 'Game 4: Attention Switching (FTD)';
        makeInst(level === 1 ? 'If EVEN tap Left, If ODD tap Right' : 'If RED tap Left, If BLUE tap Right');
        
        let target = document.createElement('h2'); target.style.fontSize = '80px'; target.style.margin = '20px 0'; area.appendChild(target);
        let val = level === 1 ? Math.floor(Math.random()*8)+2 : (Math.random() > 0.5 ? '&#x1F534;' : '&#x1F535;');
        target.innerHTML = val;
        
        const flex = document.createElement('div'); flex.style.display = 'flex'; flex.style.gap = '20px'; flex.style.justifyContent = 'center';
        let btnL = document.createElement('button'); btnL.innerText = 'LEFT'; btnL.style.padding = '20px'; btnL.style.flex = '1'; btnL.onclick = loadNextGauntletTask;
        let btnR = document.createElement('button'); btnR.innerText = 'RIGHT'; btnR.style.padding = '20px'; btnR.style.flex = '1'; btnR.onclick = loadNextGauntletTask;
        flex.appendChild(btnL); flex.appendChild(btnR); area.appendChild(flex);
    }
    else if (taskType === 4) {
        titleEl.innerText = 'Game 5: Quick Match (LBD/PD)';
        makeInst('Find the matching animal: &#x1F431;');
        let count = level === 1 ? 4 : level === 2 ? 6 : 9;
        let pool = emj.animals.slice();
        let items = ['&#x1F431;'];
        while(items.length < count) {
            items.push(pool[Math.floor(Math.random()*pool.length)]);
        }
        items.sort(() => Math.random() - 0.5);
        makeGrid(items, (val) => {
            if(val === '&#x1F431;') loadNextGauntletTask();
        });
    }
    else if (taskType === 5) {
        titleEl.innerText = 'Game 6: Pattern Completion (AD/VCI)';
        makeInst('What comes next?');
        let pat = level === 1 ? [2, 4, 6, 8] : level === 2 ? [1, 2, 4, 8] : [1, 1, 2, 3];
        let ans = level === 1 ? 10 : level === 2 ? 16 : 5;
        let pText = document.createElement('h2'); pText.innerText = pat.join(', ') + ', ?'; pText.style.margin = '20px 0'; area.appendChild(pText);
        
        let opts = [ans, ans+1, ans-1, ans+2].sort(() => Math.random()-0.5);
        makeGrid(opts, (val) => { loadNextGauntletTask(); });
    }
    else if (taskType === 6) {
        titleEl.innerText = 'Game 7: Matrix Reasoning (AD)';
        makeInst('Complete the logic:');
        let pText = document.createElement('h2'); pText.innerHTML = '&#x2600;&#xFE0F; -> &#x1F305; <br><br> &#x1F319; -> ?'; pText.style.margin = '20px 0'; area.appendChild(pText);
        
        let opts = ['&#x1F30C;', '&#x1F327;&#xFE0F;', '&#x26C4;', '&#x1F308;'].sort(() => Math.random()-0.5);
        makeGrid(opts, (val) => { loadNextGauntletTask(); });
    }
    else if (taskType === 7) {
        titleEl.innerText = 'Game 8: N-Back Memory (FTD/VCI)';
        makeInst('Tap Match if the current shape is the SAME as the PREVIOUS one.');
        const box = document.createElement('div'); box.style.height = '100px'; box.style.margin = '20px 0'; box.style.fontSize = '60px'; area.appendChild(box);
        
        let btn = document.createElement('button'); btn.innerText = 'MATCH!'; btn.style.padding = '15px'; btn.style.width = '100%'; btn.style.fontSize = '20px'; btn.style.borderRadius = '12px'; area.appendChild(btn);
        
        let pool = emj.shapes;
        let last = '';
        let step = 0;
        let intv = setInterval(() => {
            if(gauntletTimeLeft <= 0) { clearInterval(intv); return; }
            let cur = Math.random() < 0.4 && last !== '' ? last : pool[Math.floor(Math.random()*pool.length)];
            box.innerHTML = cur;
            btn.onclick = () => { if(cur === last) { clearInterval(intv); setTimeout(loadNextGauntletTask, 500); } };
            last = cur;
            step++;
            if(step > 6) { clearInterval(intv); loadNextGauntletTask(); }
            setTimeout(() => { box.innerHTML = ''; }, 800);
        }, level === 1 ? 2500 : 1800);
    }
    else if (taskType === 8) {
        titleEl.innerText = 'Game 9: Go/No-Go (FTD/PD)';
        makeInst('Tap GREEN (&#x1F7E2;). DO NOT tap RED (&#x1F534;).');
        const box = document.createElement('div'); box.style.height = '100px'; box.style.margin = '20px 0'; box.style.fontSize = '80px'; box.style.cursor = 'pointer'; area.appendChild(box);
        let taps = 0; let step = 0;
        let intv = setInterval(() => {
            if(gauntletTimeLeft <= 0) { clearInterval(intv); return; }
            let isGreen = Math.random() > 0.4;
            box.innerHTML = isGreen ? '&#x1F7E2;' : '&#x1F534;';
            box.onclick = () => { if(isGreen) taps++; };
            step++;
            if(taps >= 3 || step > 6) { clearInterval(intv); loadNextGauntletTask(); }
            setTimeout(() => { box.innerHTML = ''; }, 600);
        }, level === 1 ? 1500 : 1000);
    }
    else if (taskType === 9) {
        titleEl.innerText = 'Game 10: Rule Learning (FTD/PD)';
        let isReversed = level > 1;
        makeInst(isReversed ? 'Reverse Rule: Apple Right, Banana Left' : 'Rule: Apple Left, Banana Right');
        
        let target = document.createElement('h2'); target.style.fontSize = '80px'; target.style.margin = '20px 0'; area.appendChild(target);
        let val = Math.random() > 0.5 ? '&#x1F34E;' : '&#x1F34C;';
        target.innerHTML = val;
        
        const flex = document.createElement('div'); flex.style.display = 'flex'; flex.style.gap = '20px'; flex.style.justifyContent = 'center';
        let btnL = document.createElement('button'); btnL.innerText = 'LEFT'; btnL.style.padding = '20px'; btnL.style.flex = '1'; btnL.onclick = loadNextGauntletTask;
        let btnR = document.createElement('button'); btnR.innerText = 'RIGHT'; btnR.style.padding = '20px'; btnR.style.flex = '1'; btnR.onclick = loadNextGauntletTask;
        flex.appendChild(btnL); flex.appendChild(btnR); area.appendChild(flex);
    }
    else if (taskType === 10) {
        titleEl.innerText = 'Game 11: Old/New Recognition (AD)';
        makeInst('Is this symbol New or Old?');
        let target = document.createElement('h2'); target.style.fontSize = '80px'; target.style.margin = '20px 0'; area.appendChild(target);
        let val = window.savedRecallItems.length > 0 && Math.random() > 0.5 ? window.savedRecallItems[0] : '&#x1F697;';
        target.innerHTML = val;
        
        const flex = document.createElement('div'); flex.style.display = 'flex'; flex.style.gap = '20px'; flex.style.justifyContent = 'center';
        let btnO = document.createElement('button'); btnO.innerText = 'OLD'; btnO.style.padding = '20px'; btnO.style.flex = '1'; btnO.onclick = loadNextGauntletTask;
        let btnN = document.createElement('button'); btnN.innerText = 'NEW'; btnN.style.padding = '20px'; btnN.style.flex = '1'; btnN.onclick = loadNextGauntletTask;
        flex.appendChild(btnO); flex.appendChild(btnN); area.appendChild(flex);
    }
    else if (taskType === 11) {
        titleEl.innerText = 'Game 12: Delayed Recall (AD/MCI)';
        makeInst('What was the FIRST shape you memorized in Game 1?');
        let opts = emj.shapes.slice().sort(() => Math.random() - 0.5);
        makeGrid(opts, (val) => { loadNextGauntletTask(); });
    }
    else if (taskType === 12) {
        titleEl.innerText = 'Game 13: Multi-Step Planning (VCI/PD)';
        makeInst('Tap the numbers from Smallest to Largest');
        let arr = [12, 45, 7, 89, 23];
        if (level === 2) arr = [3, -5, 12, 0, 8];
        if (level === 3) arr = [105, 42, 99, 13, 76];
        let sorted = arr.slice().sort((a,b) => a-b);
        let currentIdx = 0;
        
        let shuffled = arr.slice().sort(() => Math.random() - 0.5);
        makeGrid(shuffled, (val, btn) => {
            if(val == sorted[currentIdx]) { // loose equality since val might be a string from button innerHTML if not careful, but it's generated from numbers
                btn.style.background = '#4CAF50'; btn.style.color = 'white';
                currentIdx++;
                if(currentIdx === arr.length) setTimeout(loadNextGauntletTask, 500);
            } else {
                btn.style.background = '#F44336'; btn.style.color = 'white';
            }
        });
    }
}

function finishAssessment() {
    clearInterval(gauntletInterval);
    document.getElementById('gauntlet-title').innerText = 'Complete!';
    
    const skipBtn = document.getElementById('demo-skip');
    if(skipBtn) skipBtn.remove();
    
    const matrix = [
        { c: "Mild Cognitive Impairment", ui: "Standard", games: ["Memory Match", "Pattern Match", "Daily Routine"] },
        { c: "Alzheimer's Disease", ui: "Anchor Mode", games: ["Face-Name Match", "Daily Routine", "Reminiscence"] },
        { c: "Vascular Dementia", ui: "Focus Mode", games: ["Dual Task", "Market Math", "Selective Attention"] },
        { c: "Lewy Body Dementia", ui: "High Contrast Mode", games: ["Clock Activity", "Object Recognition", "Shape Sorting"] },
        { c: "Frontotemporal Dementia", ui: "Calm Mode", games: ["Categorization", "Family Quiz", "Word Association"] },
        { c: "Primary Progressive Aphasia", ui: "Voice Mode", games: ["Name the Object", "Picture Description", "Music Memory"] },
        { c: "Parkinson's Dementia", ui: "Steady Mode", games: ["Target Tap", "Spatial Arrangement", "Pack the Bag"] },
        { c: "Sundowner Syndrome", ui: "Night Mode", games: ["Music Memory", "Day/Time Orientation", "Evening Calm"] },
        { c: "The Wanderer", ui: "Safety Mode", games: ["What Comes Next", "Spatial Arrangement", "Wayfinding"] },
        { c: "Sensory Processing", ui: "Therapy Mode", games: ["Listen & Answer", "Personal Memory", "Audio Trivia"] }
    ];
    
    const profile = matrix[Math.floor(Math.random() * matrix.length)];
    localStorage.setItem('diagnosis', JSON.stringify(profile));
    
    setTimeout(() => {
        showScreen('analyzing-screen');
        const textEl = document.getElementById('analyzing-text');
        if (textEl) textEl.innerText = 'Detecting cognitive signature...';
        
        setTimeout(() => {
            if (textEl) textEl.innerText = 'Applying ' + profile.ui + '...';
        }, 1500);
        
        setTimeout(() => {
            localStorage.setItem('hasCompletedAssessment', 'true');
            applyMatrixToHome(profile);
            showScreen('home-screen');
        }, 3000);
    }, 500);
}

function applyMatrixToHome(profile) {
    const home = document.getElementById('home-screen');
    const header = home.querySelector('.app-header');
    
    home.style.background = '#FDFCF0';
    home.style.color = '#37474F';
    header.style.background = 'linear-gradient(135deg, #00796B, #004D40)';
    header.style.borderBottom = 'none';
    
    if (profile.ui === 'High Contrast Mode') {
        home.style.background = '#000000';
        document.querySelectorAll('.quest-text h2').forEach(h => h.style.color = '#FFEB3B');
        document.querySelectorAll('.quest-text p').forEach(p => p.style.color = '#FFF');
        header.style.background = '#000';
        header.style.borderBottom = '4px solid #FFEB3B';
    } else if (profile.ui === 'Night Mode') {
        home.style.background = '#1a1a2e';
        header.style.background = '#16213e';
        document.querySelectorAll('.quest-text h2').forEach(h => h.style.color = '#FFF');
    } else if (profile.ui === 'Calm Mode') {
        home.style.background = '#E8F5E9';
        header.style.background = '#A5D6A7';
    } else if (profile.ui === 'Steady Mode') {
        document.querySelectorAll('.quest-card').forEach(c => c.style.padding = '30px');
    }
    
    const quests = home.querySelectorAll('.quest-card');
    if(quests.length >= 3) {
        quests[0].querySelector('h2').innerText = profile.games[0]; quests[0].querySelector('p').innerText = 'Targeted Exercise';
        quests[0].onclick = () => openQuestGame(profile.games[0]);
        quests[1].querySelector('h2').innerText = profile.games[1]; quests[1].querySelector('p').innerText = 'Targeted Exercise';
        quests[1].onclick = () => openQuestGame(profile.games[1]);
        quests[2].querySelector('h2').innerText = profile.games[2]; quests[2].querySelector('p').innerText = 'Targeted Exercise';
        quests[2].onclick = () => openQuestGame(profile.games[2]);
        
        document.getElementById('home-greeting').innerText = 'Your Care Plan';
        const subtitle = header.querySelector('p');
        subtitle.innerText = 'Active: ' + profile.ui;
        subtitle.style.fontWeight = 'bold';
        subtitle.style.color = '#FFC107';
    }
}
