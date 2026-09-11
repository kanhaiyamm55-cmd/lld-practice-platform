# AI_USAGE.md

## 1. Product scope
AI was used to help turn the broad assignment into a narrow MVP centered on the practice loop: problem selection, structured submission, feedback, history and retry. I accepted this because it protects the two-day time constraint and keeps the prototype aligned with the assignment.

## 2. Evaluation split
AI-assisted reasoning suggested separating deterministic checks from subjective design review. I accepted the split because structural validation is predictable while design trade-offs benefit from reasoning. The implementation therefore has `RuleBasedEvaluator` and an `AIEvaluator` seam.

## 3. Extensibility
AI suggested an evaluator interface rather than coupling HTTP routes directly to an LLM provider. I accepted this because a future peer evaluator, static analyzer, or different LLM can be added without changing the attempt domain.

## 4. Scope rejection
AI-assisted brainstorming suggested features such as UML editing, code execution, authentication, timers, and richer analytics. I rejected most of these for the two-day MVP because they increase UI and infrastructure work without improving the core feedback loop enough.

## 5. Feedback format
AI helped shape feedback into category score + severity + message + suggestion. I accepted this because it makes feedback actionable and explainable rather than producing a single opaque score.

All final implementation choices were reviewed and simplified for the assignment's time and scope constraints.
