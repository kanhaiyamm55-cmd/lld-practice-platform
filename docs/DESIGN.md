# Design Note

## MVP user flow
`Problems → Problem → Practice → Submit → Evaluating → Feedback → History → Retry`

The practice form deliberately uses structured fields rather than a full UML editor. This gives the evaluator useful data while keeping implementation time focused on the domain and feedback experience.

## Domain model
- `Problem`: immutable practice prompt and requirements.
- `Attempt`: learner's work against a problem and its lifecycle status.
- `Submission`: classes, interfaces, relationships and reasoning.
- `EvaluationResult`: score, summary, strengths and feedback items.
- `FeedbackItem`: category, score, severity, message and suggestion.

## Important interfaces
`Evaluator.evaluate(problem, submission) -> EvaluationResult`

Implementations:
- `RuleBasedEvaluator`: deterministic baseline evaluation.
- `AIEvaluator`: future LLM adapter with the same contract.

`EvaluationEngine` owns the evaluator selection, so routes do not depend on a concrete evaluation implementation.

## Evaluation rubric
- Responsibilities: 20
- Abstraction: 15
- Relationships: 15
- Extensibility: 15
- SOLID: 10
- Reasoning: 10

The implementation normalizes the raw 95-point rubric to 100. The categories intentionally reward design reasoning rather than matching a reference class diagram.

## Attempt lifecycle
`DRAFT → COMPLETED` or `DRAFT → FAILED`.

Submission is persisted before evaluation. If evaluation fails, the learner's work remains saved and the API returns a 503 with a retry-oriented failure message. This handles slow/failing evaluation without introducing queues or distributed infrastructure.

## Extensibility
A new evaluator can implement `Evaluator` without changing `Attempt`, `Submission`, repositories, or frontend contracts. A future `PeerEvaluator` or `StaticCodeEvaluator` could use the same result format. A future code submission format can be added by extending `Submission` or introducing a submission strategy/adapter rather than rewriting the attempt lifecycle.

## Trade-offs
- SQLite instead of Postgres: faster setup and enough for a two-day local prototype.
- Structured form instead of UML editor: less visually rich but far faster to build and easier to evaluate deterministically.
- Rule-based evaluator instead of mandatory LLM: reproducible, zero-cost and always runnable; AI is left as a clean extension point.
- No auth: intentionally out of scope because the assignment evaluates the learner journey and domain design.
