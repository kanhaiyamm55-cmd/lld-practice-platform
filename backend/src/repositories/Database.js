import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

export function createDatabase(filename = path.join(process.cwd(), 'data', 'lld-coach.db')) {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const db = new Database(filename);
  db.pragma('journal_mode = WAL');
  db.exec(`CREATE TABLE IF NOT EXISTS problems (id TEXT PRIMARY KEY, title TEXT NOT NULL, difficulty TEXT NOT NULL, description TEXT NOT NULL, requirements TEXT NOT NULL);
           CREATE TABLE IF NOT EXISTS attempts (id TEXT PRIMARY KEY, problem_id TEXT NOT NULL, status TEXT NOT NULL, submission TEXT NOT NULL, score INTEGER, feedback TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);`);
  return db;
}
