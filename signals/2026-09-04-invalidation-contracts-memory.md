# Invalidation Contracts for Cross-Episode Agent Memory

- **Source type:** official paper/preprint
- **Author or organization:** Michael Wu and Arquimedes Canedo
- **Published on:** 2026-08-31 (arXiv v1)
- **Observed on:** 2026-09-04
- **Canonical URL:** https://arxiv.org/abs/2609.00243
- **Related paper/project:** [Invalidation Contracts preprint](https://arxiv.org/abs/2609.00243)
- **Relevance:** adjacent
- **Confidence:** medium

## What was observed

The paper proposes version stamps and cacheability hints for recovery suggestions remembered across episodes, so clients can evict stale entries after server-side drift without discarding valid memory. It separates protocol validity from planner compliance and reports an evaluation across seven models, three serving paths, two domains, and about 9,400 episodes. Row-level invalidation reportedly raises compliance by up to 66.7 percentage points in some settings and recovers 29–33% of baseline token cost for four models, while coarse table-level eviction can destroy useful entries.

## Evidence and corroboration

The metrics and protocol description come from the arXiv abstract. The source reports deterministic validity and a 15% response-payload overhead, but no independent implementation or social-world evaluation was found during this scan. The result is most directly about API recovery memory, so transfer to interpersonal facts is an open question.

## Why it matters

Cross-episode social memory also goes stale when norms, identities, schedules, or world rules change. Explicit invalidation contracts provide a concrete alternative to either trusting every remembered fact or clearing an entire character memory after drift.

## Follow-up

Model versioned social facts and run controlled drift experiments. Compare row-, relationship-, and episode-level invalidation on correctness, first-try compliance, token cost, and unintended forgetting.
