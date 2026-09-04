# trajectory-judge: What Outcome-Only LLM Judges Miss on Agent Trajectories

- **Source type:** official paper/preprint and official repository
- **Author or organization:** Hadi Mohammadi
- **Published on:** 2026-08-29 (arXiv v1)
- **Observed on:** 2026-09-04
- **Canonical URL:** https://arxiv.org/abs/2609.00038
- **Related paper/project:** [trajectory-judge preprint](https://arxiv.org/abs/2609.00038); [reproducible environment and verdicts](https://github.com/mohammadi-hadi/trajectory-judge)
- **Relevance:** core
- **Confidence:** medium

## What was observed

In a deterministic support-desk environment with scripted ground truth and injected single-step faults, the paper compares outcome-only, step-rubric, programmatic, and self-consistency judges over 400 trajectories. It reports that outcome-only judging catches 84% of loud faults but 45% of silent faults and flags 33% of clean trajectories, while a step-rubric judge reaches 77% silent-fault recall with zero false alarms at roughly three times the cost. An invented promise in the final reply can evade both process-focused checks.

## Evidence and corroboration

The arXiv abstract and public repository agree on the deterministic environment, six failure types, 100 clean trajectories, 175 silent faults, and 125 loud faults. The repository commits raw verdicts and an offline report rebuild, which makes the reported table auditable. The work is a new preprint under workshop review, so independent replication is still pending.

## Why it matters

Social simulations are especially vulnerable to “right outcome, wrong process” and to harmful claims hidden in otherwise successful dialogue. Stratifying evaluation by outcome survival and checking the final message separately are reusable safety requirements.

## Follow-up

Port the fault-injection pattern to a text social world: wrong belief updates, skipped consent checks, hidden-state leakage, and unsupported promises. Compare outcome, trajectory, and final-message judges with cost and calibration reported together.
