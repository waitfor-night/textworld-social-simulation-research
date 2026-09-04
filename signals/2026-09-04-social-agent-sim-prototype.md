# Social World Model Agentic Simulation: Open Prototype

- **Source type:** official repository
- **Author or organization:** Marco Patzelt
- **Published on:** Not stated; no dated release was visible during the scan
- **Observed on:** 2026-09-04
- **Canonical URL:** https://github.com/marcopatzelt/social-agent-sim
- **Related paper/project:** [social-agent-sim repository](https://github.com/marcopatzelt/social-agent-sim)
- **Relevance:** signal
- **Confidence:** low

## What was observed

The public repository describes six LLM agents living in a Berlin apartment building. Agents receive short identity seeds rather than explicit personality or goal instructions; a deterministic engine supplies time, hunger and fatigue, locations, opening hours, sound propagation, acquaintance gating, phone constraints, finances, and memory compression. Each simulated hour the engine builds a perception, calls an agent, validates JSON actions against world state, updates memory and relationships, and writes a tick log.

## Evidence and corroboration

These details are stated in the repository README, which is the primary artifact. The page did not expose a dated release or independent run report during this scan, so the existence of the design is more certain than any claim that its behaviour is emergent or realistic. No personal contact information from the page is reproduced here.

## Why it matters

The prototype is a concrete example of separating an authoritative environment from an LLM policy and of using constraints to induce social behaviour. Its perception builder, acquaintance gating, and compressed per-agent memory are directly comparable to the primitives tracked in this map.

## Follow-up

Pin a commit and run the smallest scenario without adding hidden prompts. Inspect logs for reproducibility, leakage between agents, and whether the claimed behaviour survives seed and model changes; record licensing and data provenance before reuse.
