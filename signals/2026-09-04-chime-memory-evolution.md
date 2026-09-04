# CHIME: Credit-Aware Hierarchical Memory Evolution for Long-Horizon Agentic Planning

- **Source type:** official paper/preprint
- **Author or organization:** Yongshi Ye and coauthors
- **Published on:** 2026-09-02 (arXiv v1)
- **Observed on:** 2026-09-04
- **Canonical URL:** https://arxiv.org/abs/2609.02074
- **Related paper/project:** [CHIME preprint](https://arxiv.org/abs/2609.02074); [author-linked code destination](https://github.com/ATH-MaaS/Marco-DeepResearch)
- **Relevance:** core
- **Confidence:** medium

## What was observed

CHIME separates a planning memory bank from an execution memory bank. Before writing an experience, it attributes the outcome to the plan, the execution, both, or neither, rather than using a final success bit that mixes planning errors with environment and execution errors. The abstract reports gains over training-based and self-evolving baselines on four long-horizon benchmarks, fewer effective memory items, and transfer of accumulated memory across backbone models.

## Evidence and corroboration

The dated arXiv abstract is the primary evidence. It says code will be released and links to the Marco-DeepResearch repository; no released CHIME implementation was confirmed during this scan. Results and transfer claims therefore remain author-reported until the benchmark scripts and memory traces are available.

## Why it matters

Social simulations also conflate bad intentions, bad plans, failed actions, and hostile or changing environments. Credit-aware writes offer a testable rule for preventing a society's shared memory from fossilising the wrong causal explanation.

## Follow-up

Check the promised release and benchmark definitions. Prototype separate plan and execution memories in a small social environment, with replay-based attribution tests for delayed consequences and exogenous shocks.
