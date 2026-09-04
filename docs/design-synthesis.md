# Design synthesis: text worlds, social simulation, and role-playing

This memo distills useful design positions from the two shared discussions supplied for this project. It is a research-design document, not a verified literature review. Claims about prior work must be independently checked against the primary paper, code, or official project page before being promoted into `papers/`.

## 1. Working thesis

The most defensible research target is not “make a larger AI town.” It is:

> Study how local, identity-conditioned NPC actions spread through networks and constraints to form macro-events, how those events modify an executable world, and how different participants then observe and respond to the changed world.

The simulator should be treated primarily as a mechanism laboratory. A convincing result means that a mechanism is reproducible and causally sensitive inside the specified world. It does not automatically mean that the same mechanism predicts real human society.

## 2. Keep three simulation targets separate

| Target | What is being modeled | Typical output |
| --- | --- | --- |
| Digital individual | A real person's profile, history, or preferences | Survey answer, decision, short behavior |
| Controlled interaction | A small number of roles with goals, secrets, and relationships | Dialogue, negotiation, cooperation, conflict |
| Open social world | Many persistent agents acting in a shared environment | Information cascades, institutions, migration, crises |

These targets should not be compared with one score. The map should report at least five independent scales:

- identity: demographic prompt → history/trace → deep interview or life record;
- action: single answer → dialogue turn → platform action → schedule/resource action;
- time: one response → episode → days → years;
- society: pair → group → town → network/population;
- environment: prose description → LLM referee → explicit state and rules → calibrated world.

Large population size is not evidence of high-fidelity individuals. Conversely, a detailed individual simulator is not automatically a social simulator.

## 3. Text environment versus text world model

Use the following distinction throughout the project:

- A **text-based environment** is the external interface and experimental world. It supplies facts, legal actions, state transitions, observations, and feedback.
- A **text world model** is an agent's internal predictive model of that world. It should track state, predict consequences, represent uncertainty, generalize to new combinations, and support counterfactual reasoning.

The environment is the source of truth; the world model is a hypothesis about the truth. A useful loop is:

```text
environment interaction → trajectory and feedback → learned world model
→ imagined rollout/search/planning → environment execution and correction
```

An environment designed for world-model research should expose structured state alongside natural language, include partial observability and delayed feedback, support counterfactual branches, and record seeds and complete trajectories. Evaluation should separate legality, state tracking, prediction, planning, uncertainty calibration, and language quality.

## 4. Four computational parts

The proposed system has four replaceable parts plus shared data contracts and tracing.

| Part | Suggested name | Responsibility | Hard boundary |
| --- | --- | --- | --- |
| 1 | Role Agent Engine (RAE) | Identity, goals, beliefs, memory, planning, dialogue, action intent | Cannot read the full world or directly mutate it |
| 2 | Social Diffusion Engine (SDE) | Exposure, imitation, communication, network/spatial spread, local aggregation | Cannot invent world facts or declare events by itself |
| 3 | World State Engine (WSE) | Authoritative state, rules, action validation, effects, transactions, snapshots, replay | Does not generate private subjective experience |
| 4 | Game Master System (GMS) | Non-diegetic control plane that schedules, projects, compiles, aggregates, audits, and renders | Must not be a single omniscient black box with unrestricted write access |

The player should be a first-class participant, not a special `{{user}}` string:

```text
Participant = identity + controller(human|AI) + visibility + branch_state
```

This permits the same world to contain a human-controlled journalist, an AI resident, or a temporary narrator while keeping permissions and causal state explicit.

## 5. What “GM” means in this design

GMS is the glue and control plane. A GM LLM is only one semantic component inside it. Keep these distinct:

```text
GM System = deterministic runtime + semantic operators + tools + policies + audit
GM LLM    = one replaceable model used by selected operators
```

Recommended operators:

- `Projection` — render an identity-conditioned observation after deterministic visibility filtering;
- `ActionCompiler` — convert natural-language intent into typed action candidates;
- `Adjudicator` — resolve only rule-approved ambiguities;
- `EventSynthesizer` — name and explain evidence-backed event candidates;
- `NarrativeRenderer` — produce news, rumor, scene, or character-view prose from committed history;
- `ConsistencyAuditor` — detect leakage, contradictions, invalid effects, and causal gaps.

The most useful name for the projection-oriented role is **Perspective Game Master** (PGM), but the architecture should retain the broader **Game Master System** name because the control plane does more than projection.

## 6. Authority, observation, and belief

There must be one authoritative world state and many subjective views.

```text
WorldState(t)
  → deterministic VisibilityPolicy(world, identity, position, time)
  → visible slice
  → Projection/PGM
  → Observation(i,t)
  → BeliefState and memory update
  → ActionIntent
```

Keep three layers separate:

1. **Authority** — what actually happened: inventory, price, law, location, relationship edge, event phase.
2. **Observation** — what a participant could access through position, role, organization, channel, delay, and reliability.
3. **Belief** — what that participant thinks the observation means; it may be wrong, incomplete, or biased.

The LLM may explain a filtered slice in a role-appropriate way, but it must not decide that a hidden secret is visible. This separation makes misinformation, private knowledge, asymmetric information, and competing interpretations possible without corrupting the world truth.

## 7. Social MapReduce execution model

Each simulation barrier can be implemented as a hierarchical, event-driven MapReduce rather than asking one GM to read every trajectory.

```text
Map 1:   WorldSnapshot + Identity        → PersonalObservation
Map 2:   PersonalObservation + Memory    → RawAction / ActionIntent
Compile: RawAction                       → TypedAction
Shuffle: TypedAction + social/spatial graphs → Exposures
Reduce:  Exposures by (place, topic, group, organization) → AggregateSignal
Reduce:  AggregateSignal + rules         → EventCandidate / WorldDelta
Commit:  validated WorldDelta            → WorldState(t+1) + EventLog
Render:  committed history               → participant views / narrative outputs
```

The diffusion engine answers “how does a signal arrive?” The GM answers “how is an arrived signal interpreted or rendered?” The world engine decides whether the resulting effect is legal and real.

## 8. Macro-events must be evidence-backed

A macro-event is not a sentence generated by a narrator. It should be an entity with a lifecycle and evidence:

```text
event_id, type, phase, time_window, spatial_scope,
affected_population, participants, supporting_micro_actions,
triggering_conditions, causal_parents, severity, confidence,
world_state_diff
```

Candidate detectors can combine population/behavior thresholds, graph change, spatial concentration, resource pressure, belief or emotion shifts, self-exciting processes, and hard rules. The semantic model can name, summarize, and explain an event after the detector has found it.

The feedback loop is the research core:

```text
local action → typed effect → exposure/propagation → aggregation
→ event lifecycle → validated world delta → differentiated observation
→ new NPC response
```

The first benchmark family should include information, resource, institutional, and disaster shocks. For each one, compare paired counterfactual replays, mechanism ablations, rule-only agents, LLM agents, and hybrid agents.

## 9. Narrative is a read-only projection

Story generation should consume history rather than author it invisibly:

```text
authoritative event log → event DAG → character-view subgraph
→ turning points/conflicts → outline → scenes or chapters
```

If a writer wants to force a plot point, record it as an explicit external intervention and branch the simulation. This preserves the distinction between emergent history and authored intervention.

## 10. Engineering order

Build the smallest deterministic core before adding scale or stylistic complexity:

1. schemas for `WorldState`, `AgentState`, `BeliefState`, `Observation`, `ActionIntent`, `TypedAction`, `Effect`, `Exposure`, `EventCandidate`, `MacroEvent`, and `StateDiff`;
2. authoritative world state, logical clock, validation, atomic commit, append-only log, snapshots, replay, and branch IDs;
3. experiment configuration with seed, model/prompt versions, scenario version, sampling parameters, and code commit;
4. rule-based, random, threshold, and utility baselines;
5. identity projection and information-permission tests;
6. NPC runtime, memory, relationship, activity, and scheduling adapters;
7. diffusion, event lifecycle, feedback, and causal replay;
8. narrative rendering and only then large-scale serving/tracing optimization.

The project should initially target a reproducible 200–500 agent slice. Scale to thousands only after the same event can be replayed, explained, and falsified.

## 11. Evaluation checklist

Report at least:

- world invariants, transaction correctness, state hashes, and replay determinism;
- individual identity/goal consistency, knowledge-boundary violations, and behavior under interventions;
- group distributions, variance, correlations, network structure, and temporal dynamics;
- event detection precision/recall, lead time, lifecycle, spatial scope, and counterfactual sensitivity;
- narrative causality, agency, surprise-within-constraints, and usefulness to a human writer;
- request count, context length, prefix reuse, queue/prefill/decode/tool-wait latency, and cost per valid event.

Do not rely on a single LLM judge. Use independent structured metrics and, for narrative usefulness, blind evaluation by writers or domain experts.

## 12. Research and system traces

The simulation can become a distinctive inference workload, but only if traces preserve causal context. Record `simulation_id`, `branch_id`, logical tick, agent, event, dependency parents, model, shared-prefix identity, input/output tokens, queue/prefill/decode/tool-wait times, cache reuse, priority, and commit time. Keep scientific runs fixed to one model/configuration; study model routing and serving optimization as separate system experiments.
