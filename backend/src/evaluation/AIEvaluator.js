import { Evaluator } from './Evaluator.js';
import { EvaluationResult } from '../domain/models.js';

export class AIEvaluator extends Evaluator {
  constructor({ apiKey = process.env.OPENAI_API_KEY } = {}) { super(); this.apiKey = apiKey; }
  async evaluate(problem, submission) {
    if (!this.apiKey) throw new Error('AI evaluator is not configured');
    // Kept behind an interface intentionally. A production implementation can call an LLM here
    // and return the same EvaluationResult shape as RuleBasedEvaluator.
    throw new Error('AI evaluator adapter not implemented in the 2-day MVP');
  }
}
