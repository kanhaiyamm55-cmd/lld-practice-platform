import { Problem } from '../domain/models.js';
export class ProblemRepository {
  constructor(db) { this.db = db; }
  seed(problems) {
    const stmt = this.db.prepare('INSERT OR IGNORE INTO problems (id,title,difficulty,description,requirements) VALUES (@id,@title,@difficulty,@description,@requirements)');
    const tx = this.db.transaction(items => items.forEach(p => stmt.run({ ...p, requirements: JSON.stringify(p.requirements) })));
    tx(problems);
  }
  all() { return this.db.prepare('SELECT * FROM problems ORDER BY id').all().map(this.map); }
  find(id) { const row = this.db.prepare('SELECT * FROM problems WHERE id=?').get(id); return row ? this.map(row) : null; }
  map(row) { return new Problem({ id: row.id, title: row.title, difficulty: row.difficulty, description: row.description, requirements: JSON.parse(row.requirements) }); }
}
