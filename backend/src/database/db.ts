import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = process.env.DB_PATH || path.join(__dirname, '../../data');
const DB_FILE = path.join(DB_DIR, 'jlptvoc.sqlite');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS vocabulary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    japanese TEXT NOT NULL,
    hiragana TEXT NOT NULL,
    romaji TEXT NOT NULL,
    german TEXT NOT NULL,
    category TEXT NOT NULL,
    jlpt_level TEXT NOT NULL DEFAULT 'N5',
    example_jp TEXT,
    example_de TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vocabulary_id INTEGER NOT NULL REFERENCES vocabulary(id),
    score INTEGER NOT NULL DEFAULT 0,
    review_count INTEGER NOT NULL DEFAULT 0,
    next_review DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_reviewed DATETIME,
    UNIQUE(vocabulary_id)
  );
`);

export default db;
