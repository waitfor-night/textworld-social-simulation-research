# Literature and Product Snapshot: Text Worlds, Social Simulation, and Role-playing

- **Date:** 2026-09-04
- **Scope:** Recent arXiv work and official product/repository documentation
- **Method:** Primary-source scan; abstracts and official documentation were recorded without mirroring full text. This is a triage snapshot, not a systematic literature review.

## Executive summary

The current landscape is converging on a layered view of social text environments. Text world model work formalizes the environment as a transition process; social simulation work supplies mechanisms and aggregate phenomena; role-playing systems supply practical interfaces for identity, memory, group conversation, and branching. The open gap is a reproducible system that makes authority, visibility, beliefs, events, and replay explicit at the same time.

## 1. Text world models are becoming an explicit transition layer

[Bridging the Agent-World Gap](../papers/2606.09032.md) is a useful anchor: a text world model predicts how a textual state changes after an action in web, terminal, API, or dialogue environments. This framing prevents a common category error in which agent fluency is treated as evidence that the environment model is correct.

[WorldMind](../papers/2608.21439.md) is adjacent rather than text-native, but its four-way separation—state understanding, decision, temporal control, and outcome generation—supports the same architectural direction. For this repository, the transferable rule is: do not let the narrative renderer become the authority on world state.

## 2. Social simulation is splitting into complementary research objects

- **Long-horizon individual life:** [Agentopia](../papers/2606.07513.md) uses a persistent society with 100 agents and 10 simulated years, and reports downstream role-playing gains from simulated experience.
- **Micro-to-macro explanation:** [CAMO](../papers/2604.14691.md) turns simulation records into factors, causal structure, and counterfactual probes around a macro target.
- **Attitude and opinion diffusion:** [LLM-Agent-based Social Simulation for Attitude Diffusion](../papers/2604.03898.md) combines multidimensional beliefs, a small-world network, and external news/event timelines; [Towards Simulating Social Influence Dynamics](../papers/2507.22467.md) studies conformity, polarization, and fragmentation under controlled influence scenarios.
- **Human-grounded opinion evaluation:** [DEBATE](../papers/2510.25110.md) evaluates both public messages and private stance trajectories against human discussion groups, making group dynamics measurable rather than purely anecdotal.
- **Large-scale interventions:** [AgentSociety](../papers/2502.08691.md) reports more than 10,000 agents and 5 million interactions across several social and urban scenarios.
- **Norms:** [CRSEC](../papers/2403.08251.md) makes social norms explicit through creation/representation, spreading, evaluation, and compliance.
- **Methodological caution:** [Integrating LLM in Agent-Based Social Simulation](../papers/2507.19364.md) emphasizes that plausible language and operational usefulness do not automatically establish explanatory or predictive validity.

The implication is that one universal “social realism” score will be misleading. The map should keep separate evaluation tracks for trajectory fidelity, aggregate outcomes, causal mechanisms, rule compliance, and narrative quality.

## 3. Products already expose most interface primitives

The [role-playing product landscape](../signals/2026-09-04-roleplay-product-landscape.md) shows recurring implementations of:

- first-class personas and participants;
- NPC–NPC group interaction;
- manual or automatic speaker selection;
- public history versus private character context;
- memory compression and retrieval;
- branching timelines and replay;
- an engine-owned state loop in open-source systems.

The strongest design lesson is to make the player just another participant. A human should enter through the same action and observation interfaces as an AI agent, with explicit permissions for what is public, private, delayed, or hidden.

## 4. Common gap across papers and products

The following matrix is a useful working hypothesis for the next implementation cycle:

| Layer | Existing evidence | Remaining gap |
|---|---|---|
| World state | Text-world transitions, game state, engine-owned state | A shared schema for social facts, beliefs, norms, inventory/resources, and uncertainty |
| Projection | Personas, character cards, memory retrieval | Formal visibility/authority rules and auditable observation traces |
| Agent behavior | Role-playing, NPC decisions, social influence | Stable identity and policy comparisons under controlled state |
| Diffusion | Opinion dynamics and external shocks | Reproducible exposure scheduling and network interventions |
| Event semantics | RPG event/state checks and product branches | Event sourcing with causal parents, delayed effects, and replay |
| Evaluation | Human trajectories, mechanics checks, causal probes | A small benchmark suite that evaluates all layers without conflating them |

## Recommended next experiments

1. Implement a minimal 20–50-agent text society with structured state, public/private observations, event-sourced updates, and deterministic seeds.
2. Reproduce one opinion-dynamics task inspired by DEBATE and one rule-consistency task inspired by RPGBENCH.
3. Add a product-style group chat mode with automatic speaker scheduling and compare it against user-triggered turns.
4. Log every projection, observation, action proposal, accepted event, belief update, memory write, and rendered message.
5. Use CAMO-style factor extraction and counterfactual replay to test whether an observed macro pattern survives intervention.

## Source notes

The paper records in [`papers/`](../papers/) link to canonical arXiv pages and identify author-reported claims as such. The product note links to official documentation or repositories. Because several entries are preprints or evolving products, version, implementation, and evaluation details should be refreshed before a formal survey or citation-heavy publication.
