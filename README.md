# AI Reading Comprehension Interface  
**EdAccelerator Technical Assessment**

## Overview
This project is a redesigned reading comprehension interface built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **AI-generated questions**.

The goal was to move away from a test-like, guessable experience and instead create an interface that encourages **active reading, evidence-based reasoning, and reflection**, while supporting students with different reading speeds.



## Interpreting User Feedback → Design Decisions

### “Seeing the entire passage at once is annoying.”
**Decision**
- The passage is split into logical sections (e.g. *Queen’s role*, *Worker lifecycle*).
- A section navigator allows quick re-reading of specific parts.

**Rationale**
- Reduces cognitive overload.
- Makes re-reading targeted and intentional.



### “Multiple choice is too easy, I can just guess.”
**Decision**
- All questions require **typed answers**.
- Many questions require **explicit evidence selection** from the passage.

**Rationale**
- Guessing is no longer viable.
- Students must demonstrate understanding and justify it using the text.



### “I forget what I read immediately.”
**Decision**
- Incorrect answers trigger:
  - A clear explanation
  - A required “rewrite & retry” step
- Students cannot immediately skip feedback.

**Rationale**
- Forces reflection.
- Turns mistakes into learning opportunities.



### “The same interface doesn’t work for fast and slow readers.”
**Decision**
- Two reading modes:
  - **Guided mode**: larger text, slower pacing
  - **Fast mode**: denser layout, fewer interruptions

**Rationale**
- One interface adapts instead of assuming a single reading speed.



### “It feels like a test, not learning.”
**Decision**
- Supportive language instead of test-style grading.
- Evidence selection framed as “prove your thinking.”

**Rationale**
- Shifts the experience from assessment to learning.



## AI Question Generation Approach

### Why AI is used
AI is used to generate **high-quality comprehension questions** that:
- Go beyond surface-level recall
- Adapt naturally to different passages
- Reduce manual authoring effort



### How questions are generated
- Questions are generated **server-side** using the OpenAI API.
- A **strict JSON schema** ensures reliable structure.

Each generated question includes:
- Question type (inference, cause/effect, sequence, evidence)
- Difficulty rating
- Expected answer (1–3 sentences)
- Rubric (key concepts)
- Exact evidence sentences from the passage
- Teaching-oriented explanation

This enables:
- Deterministic grading without extra AI cost
- Clear, explainable feedback
- Safe and predictable frontend rendering



### Why not multiple choice?
Multiple choice:
- Encourages guessing
- Hides partial understanding
- Requires minimal engagement with the text

Typed answers + evidence selection:
- Increase cognitive effort
- Make comprehension visible
- Are harder to game



## Key Technical & Product Decisions

### Deterministic grading (instead of AI grading)
**Why**
- Lower cost
- Predictable results
- Easier to debug and reason about

**How**
- Rubric keyword matching
- Exact evidence sentence validation



### Server-side AI only
**Why**
- Protects API keys
- Cleaner separation of concerns
- Easier to swap AI providers later



### Clear separation of concerns
- `app/api/*` -> AI + grading logic
- `lib/*` -> schemas and business logic
- `components/*` -> UI only
- `hooks/*` -> state management



## Improvements With More Time

- Adaptive difficulty based on performance
- Teacher / analytics dashboard
- Accessibility improvements (screen readers, keyboard navigation)
- Spaced repetition for misunderstood concepts
- Hybrid AI grading for nuanced answers



## Time Spent (Approximate)

| Task | Time |
|---|---|
| Interpreting feedback & product design | ~2 hrs |
| UI architecture & components | ~1 hrs |
| AI question schema & prompting | ~1 hr |
| API routes & grading logic | ~1.5 hrs |
| Debugging & UX refinement | ~0.6 hr |
| **Total** | **~6 hours** |



## Tech Stack
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI API
- **Deployment:** Vercel