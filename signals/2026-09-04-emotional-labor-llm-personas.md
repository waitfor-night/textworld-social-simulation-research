# Emotional Labor Strategy Preferences in LLM Personas

- **Source type:** official paper/preprint
- **Author or organization:** Mohammad Saim and Tianyu Jiang
- **Published on:** 2026-08-31 (arXiv v1)
- **Observed on:** 2026-09-04
- **Canonical URL:** https://arxiv.org/abs/2609.00310
- **Related paper/project:** [Emotional Labor Strategy preprint](https://arxiv.org/abs/2609.00310)
- **Relevance:** core
- **Confidence:** medium

## What was observed

The authors introduce a dataset of 500 socially situated events, each offering surface acting, deep acting, or genuine expression, and evaluate 50 fictional-character personas with five LLMs. They report that models prefer deep acting overall, that Conscientiousness and Emotional Stability predict this preference, and that persona conditioning reliably changes outputs with variation by model and emotion.

## Evidence and corroboration

The dated arXiv abstract is the primary evidence and identifies the two persona-profiling tracks (observer-rated composites and in-character self-report). It does not provide an independent behavioural dataset or a public implementation link on the abstract page. Findings should be treated as author-reported and checked for character-selection and prompt-encoding effects.

## Why it matters

Persona agents need more than a stable voice: social strategies can vary with traits, context, and the target emotion. The three-choice setup offers a compact way to test whether a simulated character's social behaviour is consistent without equating stylistic imitation with psychological validity.

## Follow-up

Inspect the full annotation and prompting protocol, then test the choices with non-fictional and culturally varied scenarios. Report uncertainty and stereotype risks rather than treating trait-to-strategy associations as universal.
