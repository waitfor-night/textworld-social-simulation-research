# Classic AI Scaffolding for LLM Social Agents

- **Source type:** official paper/preprint
- **Author or organization:** Anatole Gershman
- **Published on:** 2026-09-01 (arXiv v1)
- **Observed on:** 2026-09-04
- **Canonical URL:** https://arxiv.org/abs/2609.01167
- **Related paper/project:** [EpisodeSim preprint](https://arxiv.org/abs/2609.01167)
- **Relevance:** core
- **Confidence:** medium

## What was observed

The preprint introduces EpisodeSim, a hybrid architecture for bounded social episodes such as a lunch or check-in. It puts roles, scripts, material state, obligations, commitments, timing, and closure into persistent control state, while a World Master maintains shared reality, constructs scenes, adjudicates proposed actions, tracks effects, and decides when an episode closes.

## Evidence and corroboration

The arXiv abstract reports small qualitative ablations in two held-out settings and attributes improved coherence to persistent classic-AI-style scaffolding around the language model. The source is a single new preprint; no independent replication or public implementation link was identified in this scan.

## Why it matters

This is a direct architectural answer to the failure mode in which locally plausible dialogue is mistaken for a coherent social world. The explicit episode controller and authoritative World Master are useful design primitives for text environments that need obligations and termination, not only free-form conversation.

## Follow-up

Read the full methods and reproduce the ablations with an event-sourced state log. Compare a World Master against a prose-only baseline on obligation tracking, delayed effects, and closure under paraphrased actions.
