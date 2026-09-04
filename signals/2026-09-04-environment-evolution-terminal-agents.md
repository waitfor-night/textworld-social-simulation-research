# Environment Evolution for Terminal Agents

- **Source type:** official paper/preprint
- **Author or organization:** Zhiyuan Fan and coauthors
- **Published on:** 2026-09-03 (arXiv v1)
- **Observed on:** 2026-09-04
- **Canonical URL:** https://arxiv.org/abs/2609.04128
- **Related paper/project:** [Environment Evolution preprint](https://arxiv.org/abs/2609.04128)
- **Relevance:** core
- **Confidence:** medium

## What was observed

The paper proposes off-policy environment evolution for terminal agents: a multi-agent harness incrementally raises environment difficulty and schedules generations during training. The authors report that rollouts with several frontier models produce harder environments and that long-horizon reinforcement learning on two Qwen models improves Terminal-Bench 2.1 by 14.4 and 18.0 percentage points.

## Evidence and corroboration

The claims and model names come from the 2026-09-03 arXiv abstract. The source describes three evolution directions derived from the multi-turn learning objective, but the scan did not find a separate code or benchmark release. The gains are consequently author-reported and should be checked for contamination, prompt overlap, and changing benchmark versions.

## Why it matters

Text environments often become trivial as agents improve. An off-policy curriculum is a promising way to keep a social or interactive-fiction world at the frontier of difficulty without silently changing the task rules between evaluations.

## Follow-up

Read the generation and scheduling algorithm in full, then reproduce a small Terminal-Bench slice with fixed seeds. Test whether the same curriculum principle can increase social-world difficulty while preserving a stable evaluation distribution.
