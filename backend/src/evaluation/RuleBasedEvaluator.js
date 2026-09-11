import { Evaluator } from './Evaluator.js';
import { EvaluationResult, FeedbackItem } from '../domain/models.js';

const norm = s => String(s ?? '').trim().toLowerCase();
const text = submission => JSON.stringify(submission).toLowerCase();

export class RuleBasedEvaluator extends Evaluator {
  evaluate(problem, submission) {
    const feedback = []; const strengths = []; let score = 0;
    const classes = Array.isArray(submission.classes) ? submission.classes : [];
    const interfaces = Array.isArray(submission.interfaces) ? submission.interfaces : [];
    const relationships = Array.isArray(submission.relationships) ? submission.relationships : [];
    const explanation = norm(submission.explanation);
    const allText = text(submission);

    const add = (category, points, max, severity, message, suggestion) => { score += points; feedback.push(new FeedbackItem({ category, score: points, maxScore: max, severity, message, suggestion })); };

    if (classes.length >= 3) { add('Responsibilities', 18, 20, 'good', 'You identified a useful set of domain classes.', 'Keep each class focused on one responsibility.'); strengths.push('The submission contains multiple domain objects.'); }
    else add('Responsibilities', classes.length ? 10 : 3, 20, 'medium', 'The design has too few explicit classes for the problem.', 'Identify the main entities and the objects responsible for changing business rules.');

    if (interfaces.length >= 1) { add('Abstraction', 15, 15, 'good', 'At least one interface creates a variation point.', 'Explain why this abstraction is likely to vary.'); strengths.push('An interface is used as an abstraction boundary.'); }
    else add('Abstraction', 7, 15, 'medium', 'No interface was declared.', 'Introduce an interface only at a genuine variation point, such as pricing or allocation.');

    if (relationships.length >= 2) add('Relationships', 15, 15, 'good', 'The design describes collaboration between objects.', 'Prefer meaningful relationships over unnecessary inheritance.');
    else add('Relationships', relationships.length ? 9 : 4, 15, 'medium', 'The object relationships are under-specified.', 'Describe composition, association, dependency, or inheritance and why it is appropriate.');

    const strategyMentioned = /strategy|pricing|allocation|payment|state/.test(allText);
    if (strategyMentioned) { add('Extensibility', 15, 15, 'good', 'The submission identifies a behavior that may vary.', 'Name the concrete implementations you would add later.'); strengths.push('A likely variation point is acknowledged.'); }
    else add('Extensibility', 9, 15, 'low', 'The design does not clearly identify a changing business rule.', 'Mention one requirement likely to change and show how your design isolates it.');

    const solid = /single responsibility|open.?closed|solid|dependency inversion|composition/.test(allText);
    if (solid) add('SOLID', 10, 10, 'good', 'You connect the design to at least one maintainability principle.', 'Explain the trade-off instead of naming a principle only.');
    else add('SOLID', 5, 10, 'low', 'The design explanation does not discuss maintainability principles.', 'Briefly justify responsibility boundaries and dependency direction.');

    if (explanation.length >= 80) { add('Reasoning', 10, 10, 'good', 'The explanation gives enough reasoning to evaluate trade-offs.', 'Keep explanations tied to requirements.'); strengths.push('The design includes explicit reasoning.'); }
    else add('Reasoning', explanation.length ? 6 : 2, 10, 'medium', 'The design reasoning is brief.', 'Explain one important trade-off and one future requirement your design can support.');

    // Normalize to 100 because the rubric totals 95 in raw points.
    const finalScore = Math.round(score / 95 * 100);
    const summary = finalScore >= 80 ? 'Strong baseline design. Focus on trade-offs and edge cases.' : finalScore >= 60 ? 'Good start. Strengthen abstractions, relationships, and reasoning.' : 'The core idea is present, but the design needs more explicit responsibilities and relationships.';
    return new EvaluationResult({ score: finalScore, feedback, strengths, summary });
  }
}
