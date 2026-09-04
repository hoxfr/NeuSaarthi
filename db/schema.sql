-- NeoSaarthi Database Schema
-- Smart India Hackathon (SIH 2024)

-- 1. Users & Authentication
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'patient', -- 'self' (patient) or 'caregiver'
    preferred_language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Cognitive Profiles & Baseline Assessment
CREATE TABLE IF NOT EXISTS cognitive_assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    overall_score FLOAT NOT NULL,
    memory_score FLOAT,
    attention_score FLOAT,
    executive_score FLOAT,
    visuospatial_score FLOAT,
    speed_score FLOAT,
    ai_primary_deficit VARCHAR(50),
    ai_focus_track VARCHAR(100),
    clinical_summary TEXT,
    assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Daily Wellness Routine & Scaffolding
CREATE TABLE IF NOT EXISTS daily_routines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    routine_date DATE NOT NULL,
    morning_brain_done BOOLEAN DEFAULT 0,
    hydration_done BOOLEAN DEFAULT 0,
    water_glasses_count INTEGER DEFAULT 0,
    walk_mobility_done BOOLEAN DEFAULT 0,
    afternoon_puzzle_done BOOLEAN DEFAULT 0,
    evening_audio_done BOOLEAN DEFAULT 0,
    completion_percentage FLOAT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. Emergency SOS Contacts
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    contact_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    relationship VARCHAR(30),
    is_primary BOOLEAN DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

// CMT_feat(db):_Define_SQLite_s
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, age INTEGER, phone TEXT UNIQUE, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, domain TEXT,
  score REAL, max_score REAL, played_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS sos_contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER,
  name TEXT, phone TEXT, relation TEXT
);

