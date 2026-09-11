export class EvaluationEngine {
  constructor({ evaluators = [] } = {}) { this.evaluators = evaluators; }
  evaluate(problem, submission) {
    const evaluator = this.evaluators.find(e => e.constructor.name === 'RuleBasedEvaluator');
    if (!evaluator) throw new Error('No deterministic evaluator configured');
    return evaluator.evaluate(problem, submission);
  }
}
