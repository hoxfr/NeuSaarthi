// ==========================================
// MODULE 3: THERAPEUTIC QUESTS & MINI-GAMES
// Lead: Member 3 (Gamification & Anti-Cheat)
// ==========================================

function finishFamilyQuiz(btn) {
    btn.style.background = '#4CAF50';
    btn.style.color = 'white';
    setTimeout(() => {
        if (window.pendingRoutineTask) {
            verifyPendingGame();
        } else {
            showScreen('home-screen');
        }
        btn.style.background = 'white';
        btn.style.color = '#37474F';
    }, 1000);
}

// --- DYNAMIC QUEST ENGINE (Playable Games) ---
function openQuestGame(gameName) {
    if (gameName === 'Family Quiz') {
        showScreen('ai-screen');
        return;
    }
    showScreen('game-screen');
    const area = document.getElementById('game-area');
    if(!area) return;
    area.innerHTML = ''; 

    // Header
    const header = document.createElement('div');
    header.style.display = 'flex'; header.style.justifyContent = 'space-between'; header.style.alignItems = 'center'; header.style.marginBottom = '30px';
    const backBtn = document.createElement('button');
    backBtn.innerHTML = '<span class="material-symbols-rounded" style="vertical-align: middle; margin-right: 4px;">arrow_back</span> Back';
    backBtn.style.background = 'transparent'; backBtn.style.border = 'none'; backBtn.style.fontSize = '18px'; backBtn.style.color = '#37474F';
    backBtn.onclick = () => {
        if (window.pendingRoutineTask) {
            window.pendingRoutineTask = null; // Clear pending without credit
            showScreen('routine-screen');
        } else {
            showScreen('home-screen');
        }
    };
    const title = document.createElement('h2');
    title.innerText = gameName; title.style.margin = '0'; title.style.color = '#00796B';
    header.appendChild(backBtn); header.appendChild(title);
    area.appendChild(header);

    // Dynamic Game Content Generator
    const gameBoard = document.createElement('div');
    gameBoard.style.textAlign = 'center';

    // 1. Memory / Matching Games
    if (gameName.includes('Match') || gameName.includes('Recognition') || gameName.includes('Quiz') || gameName === 'Reminiscence') {
        const p = document.createElement('p'); p.innerText = gameName === 'Face-Name Match' ? 'Match the family member to their name' : 'Tap the matching pairs'; p.style.marginBottom = '20px';
        gameBoard.appendChild(p);
        const grid = document.createElement('div');
        grid.style.display = 'grid'; grid.style.gridTemplateColumns = '1fr 1fr'; grid.style.gap = '15px';
        
        let icons = ['Apple', 'Apple', 'Boat', 'Boat', 'Cat', 'Cat'];
if(gameName === 'Face-Name Match') icons = ['John (Photo)', 'John', 'Mary (Photo)', 'Mary', 'Lily (Photo)', 'Lily'];
        
        icons.sort(() => 0.5 - Math.random()).forEach(icon => {
            const card = document.createElement('div');
            card.innerText = '?'; card.style.fontSize = '40px'; card.style.padding = '30px 0'; card.style.background = '#00796B'; card.style.color = 'white'; card.style.borderRadius = '12px'; card.style.cursor = 'pointer';
            card.onclick = () => { card.innerText = icon; card.style.background = '#FF8A65'; };
            grid.appendChild(card);
        });
        gameBoard.appendChild(grid);
    } 
    // 2. Logic / Math / Prediction Games
    else if (gameName.includes('Logic') || gameName.includes('Math') || gameName.includes('Sorting') || gameName.includes('Next') || gameName.includes('Trivia')) {
        const p = document.createElement('p'); p.innerText = 'Solve the sequence'; p.style.marginBottom = '20px';
        gameBoard.appendChild(p);
        
        const eq = document.createElement('h1'); 
        eq.innerText = gameName.includes('Math') ? '2 + 3 + 1 = ?' : 'ðŸ”µ âž¡ï¸ ðŸ”´ âž¡ï¸ ðŸ”µ âž¡ï¸ ?'; 
        eq.style.fontSize = '40px'; eq.style.marginBottom = '30px';
        gameBoard.appendChild(eq);
        
        const flex = document.createElement('div'); flex.style.display = 'flex'; flex.style.gap = '20px'; flex.style.justifyContent = 'center';
        
        let answers = gameName.includes('Math') ? ['5', '6', '7'] : ['Yes', 'No'];
        
        answers.forEach(ans => {
            const btn = document.createElement('button'); btn.innerText = ans; btn.style.padding = '20px 40px'; btn.style.fontSize = '24px'; btn.style.borderRadius = '12px'; btn.style.border = '2px solid #00796B'; btn.style.background = 'white';
            btn.onclick = () => btn.style.background = '#4CAF50';
            flex.appendChild(btn);
        });
        gameBoard.appendChild(flex);
    }
    // 3. Audio / Speech Games
    else if (gameName.includes('Audio') || gameName.includes('Listen') || gameName.includes('Music') || gameName.includes('Word') || gameName.includes('Description') || gameName.includes('Object')) {
        const p = document.createElement('p'); p.innerText = 'Listen and respond...'; p.style.marginBottom = '20px';
        gameBoard.appendChild(p);
        const icon = document.createElement('div'); icon.innerText = '♪'; icon.style.fontSize = '80px'; icon.style.marginBottom = '30px';
        gameBoard.appendChild(icon);
        const btn = document.createElement('button'); btn.innerText = 'Tap to Speak / Play'; btn.style.padding = '15px 30px'; btn.style.fontSize = '18px'; btn.style.borderRadius = '20px'; btn.style.background = '#FF8A65'; btn.style.color = 'white'; btn.style.border = 'none';
        gameBoard.appendChild(btn);
    }
    // 4. Drawing / Motor Games
    else if (gameName.includes('Clock Activity') || gameName.includes('Target Tap') || gameName.includes('Dual Task')) {
        const p = document.createElement('p'); p.innerText = gameName.includes('Clock') ? 'Draw the hands for 3:15' : 'Tap the targets quickly'; p.style.marginBottom = '20px';
        gameBoard.appendChild(p);
        const circle = document.createElement('div');
        circle.style.width = '200px'; circle.style.height = '200px'; circle.style.borderRadius = '50%'; circle.style.border = '4px solid #00796B'; circle.style.margin = '0 auto 30px'; circle.style.position = 'relative';
        gameBoard.appendChild(circle);
    }
    // 5. Interactive Categorization Game
    else {
        const p = document.createElement('p'); p.innerText = 'Tap an item, then tap the correct category bin:'; p.style.marginBottom = '20px'; p.style.color = '#666';
        gameBoard.appendChild(p);
        
        let selectedItem = null;
        
        // Items to categorize
        const items = [
            { id: 1, name: '🍎 Apple', cat: 'Fruit' },
            { id: 2, name: '🐶 Dog', cat: 'Animal' },
            { id: 3, name: '🍌 Banana', cat: 'Fruit' },
            { id: 4, name: '🐱 Cat', cat: 'Animal' }
        ];
        
        const itemContainer = document.createElement('div');
        itemContainer.style.display = 'flex'; itemContainer.style.gap = '10px'; itemContainer.style.justifyContent = 'center'; itemContainer.style.marginBottom = '30px'; itemContainer.style.flexWrap = 'wrap';
        
        const binsContainer = document.createElement('div');
        binsContainer.style.display = 'flex'; binsContainer.style.gap = '20px'; binsContainer.style.justifyContent = 'space-around';
        
        const drawItems = () => {
            itemContainer.innerHTML = '';
            items.filter(i => !i.sorted).forEach(item => {
                const btn = document.createElement('button');
                btn.innerText = item.name;
                btn.style.padding = '10px 15px'; btn.style.fontSize = '18px'; btn.style.borderRadius = '12px'; btn.style.border = '2px solid #00796B'; btn.style.background = selectedItem === item.id ? '#00796B' : '#E0F2F1'; btn.style.color = selectedItem === item.id ? 'white' : '#00796B'; btn.style.cursor = 'pointer'; btn.style.fontWeight = 'bold'; btn.style.transition = '0.2s';
                btn.onclick = () => {
                    selectedItem = item.id;
                    drawItems();
                };
                itemContainer.appendChild(btn);
            });
            if(items.filter(i => !i.sorted).length === 0) {
                itemContainer.innerHTML = '<div style="color: #4CAF50; font-weight: bold; font-size: 18px;">All sorted! ✔</div>';
            }
        };
        
        ['Fruit', 'Animal'].forEach(cat => {
            const bin = document.createElement('div');
            bin.style.flex = '1'; bin.style.padding = '20px'; bin.style.border = '3px dashed #FF8A65'; bin.style.borderRadius = '16px'; bin.style.background = '#FFF3E0'; bin.style.cursor = 'pointer'; bin.style.minHeight = '150px';
            bin.innerHTML = '<h3 style="margin:0 0 10px; color:#E64A19;">' + cat + '</h3><div class="bin-content" style="font-size: 24px; display: flex; flex-wrap: wrap; gap: 5px; justify-content: center;"></div>';
            bin.onclick = () => {
                if(selectedItem !== null) {
                    const item = items.find(i => i.id === selectedItem);
                    if(item.cat === cat) {
                        item.sorted = true;
                        selectedItem = null;
                        bin.querySelector('.bin-content').innerHTML += '<span>' + item.name.split(' ')[0] + '</span>'; // Just the emoji
                        drawItems();
                    } else {
                        bin.style.borderColor = 'red';
                        setTimeout(() => bin.style.borderColor = '#FF8A65', 300);
                    }
                }
            };
            binsContainer.appendChild(bin);
        });
        
        drawItems();
        gameBoard.appendChild(itemContainer);
        gameBoard.appendChild(binsContainer);
    }

    const finishBtn = document.createElement('button');
    finishBtn.innerText = 'Submit & Finish';
    finishBtn.style.background = '#FF8A65'; finishBtn.style.color = 'white'; finishBtn.style.border = 'none'; finishBtn.style.padding = '16px 30px'; finishBtn.style.fontSize = '18px'; finishBtn.style.borderRadius = '20px'; finishBtn.style.marginTop = '40px'; finishBtn.style.cursor = 'pointer'; finishBtn.style.width = '100%';
    finishBtn.onclick = () => {
        if (window.pendingRoutineTask) {
            verifyPendingGame();
        } else {
            showScreen('home-screen');
        }
    };
    gameBoard.appendChild(finishBtn);

    area.appendChild(gameBoard);
}

// --- ROUTINE & NAV LOGIC ---