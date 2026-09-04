// ==========================================
// MODULE 4: MOBILITY & SENSOR TRACKER
// Lead: Member 4 (Mobility & Sensor Tracking)
// ==========================================

let walkInterval = null;
let walkTime = 0;
let walkSteps = 0;
let walkActive = false;

function toggleWalk() {
    const btn = document.getElementById('btn-walk-action');
    const icon = document.getElementById('icon-walk-action');
    const text = document.getElementById('text-walk-action');
    const ring = document.getElementById('walk-ring');

    if (walkActive) {
        // Pause
        pauseWalk();
        btn.style.background = '#4CAF50';
        icon.innerText = 'play_arrow';
        text.innerText = 'Resume Walk';
    } else {
        // Start
        walkActive = true;
        btn.style.background = '#F44336';
        icon.innerText = 'pause';
        text.innerText = 'Pause';
        
        walkInterval = setInterval(() => {
            walkTime += 1; // 1 second = 1 minute in demo
            walkSteps += Math.floor(Math.random() * 120) + 80; // Fake steps
            
            document.getElementById('walk-steps').innerText = walkSteps;
            let m = Math.floor(walkTime);
            document.getElementById('walk-time').innerText = (m < 10 ? '0' + m : m) + ':00';
            
            const progress = Math.min(1, walkTime / 10); // 10 seconds/minutes goal
            ring.style.transform = `rotate(${-45 + (progress * 360)}deg)`;
            
            if (walkTime >= 10) {
                finishWalk();
            }
        }, 1000);
    }
}

function pauseWalk() {
    walkActive = false;
    clearInterval(walkInterval);
}

function finishWalk() {
    pauseWalk();
    // Show overlay
    const overlay = document.getElementById('walk-confetti');
    overlay.style.display = 'flex';
    
    setTimeout(() => {
        overlay.style.display = 'none';
        walkTime = 0;
        walkSteps = 0;
        document.getElementById('walk-steps').innerText = '0';
        document.getElementById('walk-time').innerText = '00:00';
        document.getElementById('walk-ring').style.transform = 'rotate(-45deg)';
        
        const btn = document.getElementById('btn-walk-action');
        btn.style.background = '#4CAF50';
        document.getElementById('icon-walk-action').innerText = 'play_arrow';
        document.getElementById('text-walk-action').innerText = 'Start Walk';
        
        verifyPendingGame(); // Checks it off and adds to progress
    }, 3000); // 3 seconds congratulations
}
