# Planning Workflow

## Goal

Transform a feature request into an actionable, well-structured implementation plan.

## Trigger

User requests `/plan` or asks planner to design a feature.

## Workflow Steps

1. **Clarify Requirements**
   - Ask clarifying questions if needed
   - Understand scope and constraints
   - Identify dependencies

2. **Propose Architecture**
   - Suggest folder structure
   - Identify components needed
   - Define data flow
   - Propose API contracts

3. **Break Into Tasks**
   - Create task list
   - Order tasks logically
   - Define acceptance criteria for each

4. **Document Plan**
   - Write clear, concise summary
   - Include folder structure
   - Include task breakdown
   - Include success criteria

## Validation

✅ Requirements are clear
✅ Architecture is reasonable
✅ Tasks are actionable
✅ Acceptance criteria are specific
✅ Nothing is ambiguous

## Handoff

Plan is ready for `/tdd` phase.
Tests can now be written to spec.
