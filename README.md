# LLD Coach

A focused Low-Level Design practice platform for the 2-day engineering assignment.

## Start here

**Fastest option:** open `demo.html` in Chrome/Edge. This is a polished, zero-setup working demo with localStorage-based attempts, evaluation, explainable feedback and history.

**Full stack:** see `START-HERE.md`, then run `npm install`, `npm run install:all`, and `npm run dev`.

## Practice loop
Choose problem → Design → Submit → Feedback → Review → Try again

## MVP features
- Parking Lot, Vending Machine, Elevator System
- Structured classes, interfaces and relationships
- Design reasoning
- Deterministic explainable evaluation
- Category score breakdown
- Strengths and actionable improvement feedback
- Persistent attempt history
- Retry flow
- Evaluation failure state in backend

## Architecture
The backend separates the `Evaluator` abstraction from the `RuleBasedEvaluator`. An `AIEvaluator` placeholder is included for future LLM evaluation. This keeps objective checks predictable and makes reasoning-heavy evaluation replaceable.

## Project docs
- `RESEARCH.md` — research note
- `DESIGN.md` — domain/design note
- `AI_USAGE.md` — meaningful AI-assisted decisions
- `DEMO.md` — demo script

## Testing
`npm test` runs backend unit tests. `npm run build` builds the React frontend.
