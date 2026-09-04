# Learning What to Retain: Gated-Memory Routing for Efficient Collaboration in Multi-Agent LLM Systems

- **Source type:** official paper/preprint and official repository
- **Author or organization:** Rakibul Hasan Rajib, Mengxing Zheng, and Qian Lou
- **Published on:** 2026-08-31 (arXiv v1)
- **Observed on:** 2026-09-04
- **Canonical URL:** https://arxiv.org/abs/2609.00237
- **Related paper/project:** [Gated-Memory Routing preprint](https://arxiv.org/abs/2609.00237); [code repository](https://github.com/rajibrhasan/gated-memory-routing)
- **Relevance:** adjacent
- **Confidence:** medium

## What was observed

Gated-Memory Routing uses a learned write gate to retain non-redundant reasoning steps, a retrieval gate to expose a compact relevant subset, and an adaptive halting controller to stop once sufficient evidence is present. The paper reports the best average accuracy across five reasoning and code benchmarks, a 2.44-point gain over its strongest baseline, and a 31.9% reduction in HumanEval inference cost. The arXiv record says the work was accepted to EMNLP 2026.

## Evidence and corroboration

The dated arXiv abstract links a public GitHub repository and states the benchmark-level numbers. The evidence is still a single author-reported result, and the tasks are not social simulations; the transfer value depends on whether the gates preserve relationship and norm information rather than only task-progress tokens.

## Why it matters

Multi-agent societies can drown in repeated messages and stale context. Learned retention and retrieval make memory a measurable routing policy, which can be compared against hand-designed summaries and inspected for omissions.

## Follow-up

Audit the repository's retained items and retrieval traces. Evaluate the same gates on multi-character conversations with relationship, belief, and norm probes, reporting both task success and socially important facts lost from context.
