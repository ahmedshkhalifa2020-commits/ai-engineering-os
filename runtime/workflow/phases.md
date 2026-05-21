# Phase Definitions

## SDLC Phase Sequence

### Lightweight Mode

1. **Discovery**
   - Input: Feature request, stakeholder context
   - Output: Problem statement, goals, success criteria
   - Owner: planner
   - Next: business-analysis

2. **Business Analysis**
   - Input: Discovery brief
   - Output: Business rules, actors, edge cases
   - Owner: business-analyst
   - Next: planning

3. **Planning**
   - Input: Business analysis
   - Output: Implementation plan, dependencies, acceptance criteria
   - Owner: planner
   - Next: tdd

4. **TDD**
   - Input: Plan + acceptance criteria
   - Output: Failing tests, coverage strategy
   - Owner: testing-guide
   - Next: implementation

5. **Implementation**
   - Input: Failing tests, plan
   - Output: Production code, passing tests
   - Owner: nextjs-implementation
   - Next: review

6. **Review**
   - Input: Code + tests
   - Output: Review feedback, approval
   - Owner: code-reviewer
   - Next: release

7. **Release**
   - Input: All approvals
   - Output: Deployment ready
   - Owner: governance/ops
   - Next: (complete)

### Enterprise Mode

Adds System Analysis and Architecture phases between Business Analysis and Planning:

3. **System Analysis**
   - Input: Business analysis
   - Output: Domain model, boundaries, ownership
   - Owner: architect
   - Next: architecture

4. **Architecture**
   - Input: System analysis
   - Output: System diagram, module design, data flow
   - Owner: architect
   - Next: planning

Also adds Security phase before Release:

8. **Security**
   - Input: Implementation + threat model
   - Output: Security signoff or issues
   - Owner: security-reviewer
   - Next: release

## Valid Transitions

A phase transition is allowed only if:

- Current phase is complete
- Required artifacts exist and are valid
- Required approvals are granted
- No blockers are present
- The proposed next phase exists in the phase sequence
