# GlossoGen: Emergent Language in Complex Multi-Agent LLM Interactions

- **Source type:** official paper/preprint and official repository
- **Author or organization:** Elias Stengel-Eskin and coauthors
- **Published on:** 2026-09-01 (arXiv v1)
- **Observed on:** 2026-09-04
- **Canonical URL:** https://arxiv.org/abs/2609.01491
- **Related paper/project:** [GlossoGen preprint](https://arxiv.org/abs/2609.01491); [simulation platform](https://github.com/agencyenterprise/GlossoGen); [paper code](https://github.com/esteng/emergent_communication)
- **Relevance:** core
- **Confidence:** medium

## What was observed

GlossoGen studies teams of agents with partial information communicating under pressure in the SaveVeyru scenario. The paper reports that agents develop compositional and morphologically productive conventions that can depart from their English prior and become incomprehensible to humans. It identifies efficiency pressure, model strength, and a postmortem convention stage as drivers, and reports that new agents can learn an existing convention from usage alone.

## Evidence and corroboration

The arXiv record links both a platform repository and paper code. The platform README describes role- and channel-specific scenarios, tool calls, event-sourced run logs, fork/swap interventions, and post-hoc metrics, corroborating that a controlled experimental artifact exists. The language-evolution findings themselves remain a new, author-reported preprint result.

## Why it matters

Private shorthand and cultural drift are plausible failure modes for multi-agent societies: they can improve coordination while reducing human monitorability. Event logs and intervention hooks make this a particularly useful bridge between emergent-culture research and safety evaluation.

## Follow-up

Run SaveVeyru with fixed model versions and inspect the raw message/event logs. Add human-legibility, convention stability, and takeover or prompt-injection probes, and compare mixed-strength populations.
