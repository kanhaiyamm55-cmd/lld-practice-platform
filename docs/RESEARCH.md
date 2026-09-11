# Research Note

## Learner problem
LLD is easy to begin but difficult to self-evaluate because many designs can be valid. A learner needs more than a problem statement: they need a repeatable practice loop and feedback that explains why a responsibility, abstraction, relationship or trade-off could be improved.

Recent LLD practice products show several approaches. LLDCanvas combines a UML editor, design patterns, timed practice, a problem library, notes and runnable code. Its problem set and editor demonstrate the value of hands-on modeling and practice rather than passive reading. MockGym positions an AI coach around LLD problems and feedback. AlgoInsight describes a structured flow from requirements and entities through classes, code, tests and extensibility. LLD Arena is an open-source example combining a problem library, Java execution, hidden tests and AI-graded design reports. These approaches validate that practice, structured design artifacts and feedback are useful surfaces.

## Gap / opportunity
The assignment does not require another large LMS, diagramming suite, or code-execution platform. A focused MVP can own one narrow loop exceptionally well: choose a problem → submit a structured design → receive explainable feedback → review → retry.

The most important product decision is to avoid treating one reference design as the only correct answer. Feedback should evaluate properties such as responsibility boundaries, abstraction at genuine variation points, relationship clarity, extensibility, SOLID reasoning and trade-offs. A learner should be told what is strong, what is risky, why it matters, and what they could change.

## What a meaningful submission contains
1. Core classes and their responsibilities.
2. Interfaces/abstractions and why they exist.
3. Relationships between important objects.
4. A short explanation of design decisions and trade-offs.
5. Optionally, code/diagram artifacts in a future submission format.

## Deterministic vs LLM evaluation
Deterministic checks are appropriate for structural facts: missing fields, empty submissions, class/interface presence, duplicate names, and explicit requirement coverage. LLM evaluation is better suited to reasoning about cohesion, coupling, SOLID application, pattern fit, trade-offs and alternative designs. The MVP therefore exposes an `Evaluator` interface and ships with a deterministic evaluator first. A future LLM adapter can return the same evaluation result without changing the domain or API.

## Product direction
Start with three problems and one structured submission format. Make feedback the strongest screen. Store every attempt so the product supports improvement instead of one-time assessment. Keep the architecture intentionally simple: a monolith and local SQLite are sufficient for a two-day prototype.

## Sources researched
- LLDCanvas: https://www.lldcanvas.in/ — UML editor, 110+ practice problems, patterns, timed interview mode and runnable code.
- MockGym: https://mockgym.com/ — AI coach and a broad LLD problem catalogue.
- AlgoInsight LLD Practice: https://algoinsight.io/system-design/practice — structured LLD practice flow and AI-powered evaluation.
- LLD Arena: https://github.com/mightbeanshuu/lld-arena — open-source example combining problems, Java execution and AI-graded design reports.
- DevSketches LLD guide: https://devsketches.com/blog/lld-interview-guide — emphasizes requirements, responsibilities, narrow interfaces, state/invariants and proving a core flow.
