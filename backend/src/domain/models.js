export class Problem {
  constructor({ id, title, difficulty, description, requirements }) { Object.assign(this, { id, title, difficulty, description, requirements }); }
}
export class Submission {
  constructor({ classes = [], interfaces = [], relationships = [], explanation = '' }) {
    this.classes = classes; this.interfaces = interfaces; this.relationships = relationships; this.explanation = explanation;
  }
}
export class Attempt {
  constructor({ id, problemId, status = 'DRAFT', submission = {}, score = null, createdAt = null }) {
    Object.assign(this, { id, problemId, status, submission: new Submission(submission), score, createdAt });
  }
}
export class FeedbackItem {
  constructor({ category, score, maxScore, severity, message, suggestion }) { Object.assign(this, { category, score, maxScore, severity, message, suggestion }); }
}
export class EvaluationResult {
  constructor({ score, feedback, strengths = [], summary = '' }) { Object.assign(this, { score, feedback, strengths, summary }); }
}
