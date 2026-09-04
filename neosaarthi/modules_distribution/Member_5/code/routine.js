// ==========================================
// MODULE 5: DAILY ROUTINE & SCHEDULE MANAGER
// Lead: Member 5 (Daily Routine System)
// ==========================================

function switchNav(screenId) {
    if(!localStorage.getItem('hasCompletedAssessment') || localStorage.getItem('hasCompletedAssessment') !== 'true') return;
    
    // Only switch if trying to go to valid tabs
    if(screenId !== 'home-screen' && screenId !== 'routine-screen' && screenId !== 'progress-screen') return;
    
    showScreen(screenId);
    
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    if(screenId === 'home-screen') {
        const n = document.getElementById('nav-home');
        if(n) n.classList.add('active');
    }
    if(screenId === 'routine-screen') {
        const n = document.getElementById('nav-routine');
        if(n) n.classList.add('active');
    }
    if(screenId === 'progress-screen') {
        const n = document.getElementById('nav-progress');
        if(n) n.classList.add('active');
    }
}

let completedTasks = 0;
window.pendingRoutineTask = null;

function completeRoutineTask(el, type, gameIndex) {
    if(el.classList.contains('done')) return;
    
    if(type === 'game') {
        window.pendingRoutineTask = el; // Store it but DON'T check it off yet!
        let storedProfile = localStorage.getItem('diagnosis');
        let targetGame = 'Memory Match';
        if(storedProfile) {
            let p = JSON.parse(storedProfile);
            if(p.games && p.games[gameIndex]) targetGame = p.games[gameIndex];
        }
        openQuestGame(targetGame);
        
    } else if (type === 'walk') {
        window.pendingRoutineTask = el;
        showScreen('walk-screen');
    } else if (type === 'water') {
        // Just instantly check it off (ethical honor system as user requested)
        el.classList.add('done');
        completedTasks++;
        const progText = document.getElementById('routine-progress-text');
        if(progText) progText.innerText = completedTasks + ' / 5 Completed';
        
        stats.hyd = 1;
        renderProgressTab();
    }
}

function verifyPendingGame() {
    if (window.pendingRoutineTask && !window.pendingRoutineTask.classList.contains('done')) {
        window.pendingRoutineTask.classList.add('done');
        completedTasks++;
        const progText = document.getElementById('routine-progress-text');
        if(progText) progText.innerText = completedTasks + ' / 5 Completed';
        
        // Update Stats
        const taskText = window.pendingRoutineTask.innerText.toLowerCase();
        if(taskText.includes('walk') || taskText.includes('mobility')) {
            stats.phy = 1;
        } else {
            stats.cog = Math.min(3, stats.cog + 1);
        }
        renderProgressTab();
        
        window.pendingRoutineTask = null;
    }
    showScreen('routine-screen');
}


// --- WALK TRACKER LOGIC ---