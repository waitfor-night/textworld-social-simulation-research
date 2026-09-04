# SILICA: Benchmarking LLM Agent Societies Against Human Behavioural Distributions

- **Source type:** official paper/preprint
- **Author or organization:** Raad Bin Tareaf
- **Published on:** 2026-08-28 (arXiv v1)
- **Observed on:** 2026-09-04
- **Canonical URL:** https://arxiv.org/abs/2608.28182
- **Related paper/project:** [SILICA preprint](https://arxiv.org/abs/2608.28182)
- **Relevance:** core
- **Confidence:** medium

## What was observed

SILICA is presented as an open instrument for testing whether agent societies match human behavioural distributions, survive apparatus changes that preserve rules, and show interaction rather than replayed priors. The abstract describes five environments with published human anchors, rule-preserving perturbations, and payoff variants. Across twelve open-weight models, agreement is reported mainly at starting points: eight of eleven models fall within the first-round public-goods equivalence margin, while none match end-state contributions or the human cooperation corridor. Reordering two action labels reportedly reduces one model's cooperation by 58 points.

## Evidence and corroboration

These details come from the dated arXiv record and abstract. The authors also report that only one reasoning-trained model places an acceptance threshold where a fixed incentive requires and that conventions can arise from shared naming priors rather than negotiation. The instrument and results are author-reported in a new preprint; the benchmark's human anchors and perturbation implementation still need independent inspection.

## Why it matters

The certification framing is unusually relevant for social simulation: behavioural plausibility, invariance to presentation, and evidence of genuine interaction are separate validity tests. It cautions against treating a convincing single trajectory or first-round match as population-level realism.

## Follow-up

Inspect the five environments, human reference distributions, and perturbation code. Re-run a small subset with the repository's existing opinion-dynamics tasks and report starting-point, end-state, and order-sensitivity metrics separately.
