// ==========================================
// MODULE 6: PROGRESS ANALYTICS & SAFETY SOS
// Lead: Member 6 (Safety & Progress Analytics)
// ==========================================

function initMockProgressData() {
    const mockData = {
        hydration: { totalTasks: 5, completedTasks: 3 },
        mobility: { totalTasks: 1, completedTasks: 1 },
        cognitive_progress: {
            "Memory": { totalTasks: 4, completedTasks: 2 },
            "Attention": { totalTasks: 3, completedTasks: 3 },
            "Reasoning & Executive Function": { totalTasks: 2, completedTasks: 1 },
            "Recognition & Visuospatial": { totalTasks: 3, completedTasks: 2 },
            "Language & Voice": { totalTasks: 2, completedTasks: 0 },
            "Daily Life & Orientation": { totalTasks: 2, completedTasks: 2 },
            "Memory Assistance & Social": { totalTasks: 1, completedTasks: 1 }
        }
    };
    localStorage.setItem('neosaarthi_progress_today', JSON.stringify(mockData));
}

function renderProgressTab() {
    let dataStr = localStorage.getItem('neosaarthi_progress_today');
    if (!dataStr) {
        initMockProgressData();
        dataStr = localStorage.getItem('neosaarthi_progress_today');
    }
    const data = JSON.parse(dataStr);

    let totalTasks = data.hydration.totalTasks + data.mobility.totalTasks;
    let completedTasks = data.hydration.completedTasks + data.mobility.completedTasks;

    const cogKeys = Object.keys(data.cognitive_progress);
    cogKeys.forEach(k => {
        totalTasks += data.cognitive_progress[k].totalTasks;
        completedTasks += data.cognitive_progress[k].completedTasks;
    });

    const overallPct = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    let theme = '';
    if (overallPct < 40) theme = 'danger-red';
    else if (overallPct <= 70) theme = 'warning-orange';
    else theme = 'success-green';

    // Update Hero Ring
    const ring = document.getElementById('overall-ring');
    if (ring) {
        const radius = ring.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        ring.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (overallPct / 100) * circumference;
        ring.style.strokeDashoffset = offset;
        
        ring.classList.remove('stroke-danger-red', 'stroke-warning-orange', 'stroke-success-green');
        ring.classList.add(`stroke-${theme}`);
    }

    const pctText = document.getElementById('overall-percentage');
    if (pctText) {
        pctText.innerText = `${overallPct}%`;
        pctText.classList.remove('danger-red', 'warning-orange', 'success-green');
        pctText.classList.add(theme);
    }

    // Physical Updates
    const updateBar = (idPrefix, stat) => {
        const textEl = document.getElementById(`${idPrefix}-text`);
        const barEl = document.getElementById(`${idPrefix}-bar`);
        if(!textEl || !barEl) return;
        
        textEl.innerText = `${stat.completedTasks}/${stat.totalTasks}`;
        const pct = stat.totalTasks === 0 ? 0 : (stat.completedTasks / stat.totalTasks) * 100;
        barEl.style.width = `${pct}%`;
        
        barEl.classList.remove('bg-danger-red', 'bg-warning-orange', 'bg-success-green');
        barEl.classList.add(`bg-${theme}`);
    };
    updateBar('hyd', data.hydration);
    updateBar('mob', data.mobility);

    // Cognitive Updates
    const cogContainer = document.getElementById('cognitive-progress-list');
    if (cogContainer) {
        cogContainer.innerHTML = '';
        cogKeys.forEach(cat => {
            const stat = data.cognitive_progress[cat];
            const pct = stat.totalTasks === 0 ? 0 : (stat.completedTasks / stat.totalTasks) * 100;
            
            const card = document.createElement('div');
            card.className = 'progress-card';
            card.innerHTML = `
                <div class="progress-header"><span>${cat}</span><span>${stat.completedTasks}/${stat.totalTasks}</span></div>
                <div class="bar-bg"><div class="bar-fill bg-${theme}" style="width: ${pct}%"></div></div>
            `;
            cogContainer.appendChild(card);
        });
    }
}


// Emergency SOS trigger helper
function triggerEmergencySOS() {
    showScreen('sos-screen');
    let count = 5;
    const countEl = document.getElementById('sos-countdown');
    if (window.sosInterval) clearInterval(window.sosInterval);
    window.sosInterval = setInterval(() => {
        count--;
        if (countEl) countEl.innerText = count;
        if (count <= 0) {
            clearInterval(window.sosInterval);
            alert("Emergency SOS Alert sent to Caregiver and Emergency Contacts with live GPS coordinates!");
            showScreen('home-screen');
        }
    }, 1000);
}

function cancelEmergencySOS() {
    if (window.sosInterval) clearInterval(window.sosInterval);
    showScreen('home-screen');
}
