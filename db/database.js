// NeoSaarthi Database Controller & Local Repository
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

// Initialize database with default structure if not present
function initDatabase() {
    if (!fs.existsSync(DB_FILE)) {
        const initialData = {
            users: [],
            assessments: [],
            daily_routines: [],
            emergency_contacts: [
                { id: 1, name: "Rahul (Son)", phone: "+919876543210", relation: "Son", primary: true }
            ]
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
        console.log('[DB] Local database initialized at db/db.json');
    }
}

function readData() {
    initDatabase();
    try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch (e) {
        return { users: [], assessments: [], daily_routines: [], emergency_contacts: [] };
    }
}

function writeData(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// User methods
function saveUser(phoneNumber, role = 'self', lang = 'en') {
    const data = readData();
    let user = data.users.find(u => u.phone_number === phoneNumber);
    if (!user) {
        user = {
            id: data.users.length + 1,
            phone_number: phoneNumber,
            role: role,
            preferred_language: lang,
            created_at: new Date().toISOString()
        };
        data.users.push(user);
        writeData(data);
    }
    return user;
}

// Assessment records
function saveAssessmentResult(userId, metrics) {
    const data = readData();
    const assessment = {
        id: data.assessments.length + 1,
        user_id: userId,
        timestamp: new Date().toISOString(),
        ...metrics
    };
    data.assessments.push(assessment);
    writeData(data);
    return assessment;
}

// Routine records
function saveDailyRoutine(userId, routineState) {
    const data = readData();
    const today = new Date().toDateString();
    let record = data.daily_routines.find(r => r.user_id === userId && r.date === today);
    if (record) {
        Object.assign(record, routineState);
    } else {
        record = {
            id: data.daily_routines.length + 1,
            user_id: userId,
            date: today,
            ...routineState
        };
        data.daily_routines.push(record);
    }
    writeData(data);
    return record;
}

module.exports = {
    initDatabase,
    saveUser,
    saveAssessmentResult,
    saveDailyRoutine
};
