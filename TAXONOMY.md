# Research taxonomy

Use one primary tag and any number of secondary tags. A paper can be adjacent without being central; record that distinction in the relevance field.

## Primary areas

| ID | Area | Typical questions |
| --- | --- | --- |
| `TWM` | Text world models | Can a model predict, simulate, or learn the dynamics of a text-described world? |
| `ENV` | Text environments | How are interactive fiction, games, tool worlds, and text-based tasks specified and evaluated? |
| `SIM` | Social simulation | How are populations, institutions, groups, norms, and emergent behavior represented? |
| `MAS` | Multi-agent systems | How do multiple language agents coordinate, compete, communicate, and form conventions? |
| `RPL` | Role-playing and persona | How are identity, character, goals, memory, dialogue style, and consistency modeled? |
| `AGT` | Agent architecture | What roles do planning, memory, reflection, tools, self-play, and long-horizon control play? |
| `EVAL` | Evaluation | What is measured, by whom, under which interaction protocol, and with what failure analysis? |
| `DATA` | Data and trajectories | What interaction traces, synthetic worlds, human behavior data, or curricula are used? |
| `SAFE` | Safety and validity | What prevents deceptive, harmful, stereotyped, unstable, or non-reproducible simulations? |

## Secondary tags

`planning`, `memory`, `retrieval`, `reflection`, `tool-use`, `self-play`, `self-consistency`, `grounding`, `long-horizon`, `embodiment`, `interactive-fiction`, `games`, `economics`, `institutions`, `norms`, `culture`, `theory-of-mind`, `emotion`, `identity`, `alignment`, `benchmark`, `human-eval`, `llm-as-judge`, `reproducibility`, `open-source`.

## Relevance labels

- `core` — directly studies text worlds, social simulation, role-playing, or their evaluation;
- `adjacent` — provides a transferable method, benchmark, or theory;
- `background` — useful context but not a near-term research input;
- `signal` — an unverified or early lead that needs follow-up.

## Triage questions

For each candidate, answer:

1. What world, environment, population, or interaction protocol is being modeled?
2. What are the agents' observations, actions, goals, memory, and communication channels?
3. Is the claimed behavior measured at the individual, pair, group, or population level?
4. Which findings are causal or experimentally supported, and which are qualitative demonstrations?
5. What is reusable: representation, environment, dataset, evaluation, or implementation pattern?
