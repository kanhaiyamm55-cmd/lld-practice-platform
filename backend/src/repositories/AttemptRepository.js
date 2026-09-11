export class AttemptRepository {
  constructor(db) { this.db = db; }
  create(problemId, submission = {}) {
    const id = crypto.randomUUID(); const now = new Date().toISOString();
    this.db.prepare('INSERT INTO attempts (id,problem_id,status,submission,score,feedback,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)').run(id, problemId, 'DRAFT', JSON.stringify(submission), null, null, now, now);
    return this.find(id);
  }
  updateSubmission(id, submission) { this.db.prepare('UPDATE attempts SET submission=?,updated_at=? WHERE id=?').run(JSON.stringify(submission), new Date().toISOString(), id); return this.find(id); }
  complete(id, score, feedback) { this.db.prepare('UPDATE attempts SET status=?,score=?,feedback=?,updated_at=? WHERE id=?').run('COMPLETED', score, JSON.stringify(feedback), new Date().toISOString(), id); return this.find(id); }
  fail(id, message) { this.db.prepare('UPDATE attempts SET status=?,feedback=?,updated_at=? WHERE id=?').run('FAILED', JSON.stringify({ message }), new Date().toISOString(), id); return this.find(id); }
  find(id) { const row = this.db.prepare('SELECT * FROM attempts WHERE id=?').get(id); return row ? this.map(row) : null; }
  all() { return this.db.prepare('SELECT * FROM attempts ORDER BY created_at DESC').all().map(this.map); }
  map(row) { return { id: row.id, problemId: row.problem_id, status: row.status, submission: JSON.parse(row.submission), score: row.score, feedback: row.feedback ? JSON.parse(row.feedback) : null, createdAt: row.created_at, updatedAt: row.updated_at }; }
}
