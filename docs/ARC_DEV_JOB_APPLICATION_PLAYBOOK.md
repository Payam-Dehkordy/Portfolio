# Arc.dev — Job Application Playbook (Copy/Paste Responses)

This document captures the **standard process** we use to apply to roles on **Arc.dev** efficiently and consistently.

## Goals

- Move fast without overthinking.
- Keep answers **truthful** while still marketing your strengths.
- Provide **one-shot, copy/paste** responses for each “Relevant experience” box.
- Always include a quick **fit/chance assessment** so you don’t waste time.

## Operating rules (always follow)

- **Always answer in this order**:
  1) **Fit** (High / Medium / Low)  
  2) **Chance** (High / Medium / Low)  
  3) **Risk points** (1–3 bullets)  
  4) **One-shot copy/paste answer** (single block of text)
- Keep the copy/paste answer **tight** (typically 6–10 sentences).
- Only claim what you can defend in an interview. If a skill is weaker, phrase it as:
  - “comfortable ramping quickly” / “active learning” / “have used similar patterns”
- For public proof, always provide your portfolio link:
  - **Portfolio**: `https://www.payam-dehkordy.com/`

## Fit + chance rubric (how we decide)

### Fit (compatibility)
- **High**: Core stack + core outcomes match (you can do the work now).
- **Medium**: Outcomes match, but 1–2 stack items are weaker (still apply).
- **Low**: A hard requirement is missing (apply only if rate is great or you want practice).

### Chance (likelihood of getting interview)
- **High**: Fit is high + you can show public proof (live site / public repo / strong resume alignment).
- **Medium**: Fit is medium-high but one key requirement is “learnable” for you.
- **Low**: The role screens hard on a requirement you don’t have (e.g., “expert Go in production”).

## The response template (paste into the form)

Use this template when Arc asks: “Relevant experience” / “Why you’re a fit” / “Describe your experience”.

```text
Fit: <High|Medium|Low>
Chance: <High|Medium|Low>

Risk points:
- <risk #1>
- <risk #2>

Relevant experience:
<single paragraph copy/paste answer here>

Portfolio: https://www.payam-dehkordy.com/
```

## What to highlight by role type (quick mapping)

### Marketing / landing pages (Astro/Next, Tailwind, Sanity, performance)
- Pixel-perfect design-to-code (Figma/Lovable)
- Conversion flows (multi-step forms, lead capture)
- Core Web Vitals, Lighthouse, font/image strategy, CLS prevention
- REST API integration with validation + retries + safe UX failure states
- Headless CMS “page builder” patterns (Sanity schemas, GROQ, blocks)

### Full-stack product (React + backend APIs + DB)
- Ownership: from ambiguous problem → shipped feature
- DB schema + migrations + query/index performance
- Security basics: auth, RBAC, audit trails, input validation
- Observability: structured logs, metrics, alerts, runbooks

### Data extraction / integrations (ETL, APIs, webhooks, backups)
- Pagination, rate limits, retries/backoff, idempotency
- Checkpointing/resume, incremental sync (updated_at), dedupe
- Backups + verification scripts + sanity checks

### AI/agent roles (LLM/VLM, RAG, workflows)
- Practical AI integrations (extraction/classification/matching)
- Guardrails: structured outputs, schema validation, fallbacks
- Human-in-the-loop review for high-stakes outputs
- “Production” practices: logging/tracing, prompt/versioning, eval checks

## Private docs (local only, gitignored)

- Gap analysis: `docs/private/CAREER_GAP_ANALYSIS.md`
- Job platforms notes: `docs/private/JOB_SEARCH_PLATFORMS.md`

These files stay on your machine only (see `.gitignore` → `docs/private/`).

## Never forget

- Keep **language levels consistent** across Arc, CV PDFs, and portfolio (e.g. English: Fluent / C1 / professional working proficiency — not outdated “A1 Basic”).
- If the company needs **public proof**, local source code doesn’t help them.
- When you have multiple demos, it’s best to give:
  - the portfolio homepage **plus** 1–2 direct demo links (if asked).

