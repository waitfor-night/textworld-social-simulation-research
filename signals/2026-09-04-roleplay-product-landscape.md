# Role-playing and Social Simulation Product Landscape

- **Source type:** official product documentation / official repository
- **Author or organization:** Character.AI, Nomi, SillyTavern, AI Dungeon, TavernAI, and a16z Infra
- **Published on:** Various; see the linked primary sources
- **Observed on:** 2026-09-04
- **Canonical URL:** See the product-specific links below
- **Related paper/project:** [`docs/design-synthesis.md`](../docs/design-synthesis.md)
- **Relevance:** `core`
- **Confidence:** `high` for documented product behavior; `medium` for research implications

## What was observed

Current role-playing products and open-source systems already expose several building blocks that are important for social text environments:

| System | Player/persona model | Multi-character behavior | Memory/state | Branching, control, or scheduling | Research-relevant pattern |
|---|---|---|---|---|---|
| [TavernAI](https://github.com/TavernAI/TavernAI) | Any character can be AI or user; arbitrary participants can be assigned roles | MultiChat gives each character its own history/knowledge; timelines merge at meetings and diverge afterward | Persistent state and per-character knowledge are part of the product concept | Branching timelines, scripts/assets, and control over whose information enters context | Strongest product-level example of first-class participants plus asymmetric knowledge |
| [AI Town](https://github.com/a16z-infra/ai-town/blob/main/ARCHITECTURE.md) | Human and AI use the same action pathway | Agents submit inputs to an engine-owned world; conversations are persisted as world data | Load/step/save loop, state diffs, persistent conversations, and memory retrieval | Independent ticks are batched; a single-thread-per-world invariant avoids concurrent state writes | Clear separation between agent behavior and authoritative simulation state |
| [SillyTavern group chats](https://docs.sillytavern.app/usage/core-concepts/groupchats/) | Personas represent the identity used by a participant in a chat | Shared history; either swap one active character card or join all cards into context | Character cards, persona, and World Info provide context layers | Auto-mode can trigger generations without the user; reply strategies can schedule who speaks | Practical speaker scheduling and context composition, with a known risk of merged personalities |
| [Character.AI group chats](https://support.character.ai/hc/en-us/articles/41760067000475-Community-Update-September-2025) | User interacts with a group of characters | Characters can react to and message one another without a user-scripted next speaker | Product details are not exposed as an authoritative public state model | Group interaction was documented as an evolving/limited-rollout feature | NPC–NPC interaction is a user-facing product requirement, not only a benchmark idea |
| [Nomi group chat and support](https://nomi.ai/support/) | Multiple Nomis selected into a conversation | User can select the next Nomi or enable auto-chat | Shared Backstory+ notes can alter conversation style and habits | Manual and automatic speaker selection are both exposed | Shared social context and speaker scheduling are useful, but still product-level abstractions |
| [AI Dungeon memory](https://help.aidungeon.com/faq/the-memory-system) | Collaborative storytelling with player actions such as Do/Say | Multiplayer gives each player a character identity | Context budget, generated memory summaries, retrieval, Story Cards, Plot Essentials, and Author's Note | Context assembly is prioritized because the full history cannot fit indefinitely | Memory should be treated as a retrieval/compression policy, not an ever-growing transcript |

## Evidence and corroboration

- TavernAI's official repository describes a private portable role-playing engine with persistent state, branching, and a MultiChat design in which each character has separate history and knowledge. It also states that any participant may be AI or user and that context inclusion can be controlled.
- AI Town's official architecture describes a world engine that loads state, runs ticks, computes diffs, and saves state; agents submit inputs, while only the engine writes game state. It explicitly aims to decouple agent behavior from the game engine and let humans and AI use the same actions.
- SillyTavern's official documentation describes shared group history, active-character swapping versus joining all cards, automatic generation, and personas. The documentation also warns that joining all character cards can cause confusion or merged personalities.
- Character.AI's official community update documents characters reacting to and messaging one another in group chats, while noting that the feature was still being improved and rolled out.
- Nomi's official support page documents manual or automatic next-speaker selection and shared Backstory+ notes.
- AI Dungeon's official memory documentation describes context limits, generated summaries, retrieval of relevant memories, and the distinction between current collaborative-story memory and an older structured-stat system.

## Why it matters

The product landscape suggests that the missing research contribution is not simply “more realistic chat.” The recurring systems problem is to combine:

1. first-class human and AI participants;
2. public messages with private beliefs and private memories;
3. a speaker scheduler that can let NPCs act without a user turn;
4. an authoritative state/event layer separate from generated prose;
5. context retrieval and compression that preserves causally important facts;
6. branching, replay, and inspection of alternative histories.

The products implement these pieces unevenly. TavernAI is strong on participant-specific history and branching; AI Town is strong on engine ownership and deterministic state updates; SillyTavern and Nomi expose practical group scheduling; AI Dungeon demonstrates production memory constraints; Character.AI demonstrates the demand for autonomous character-to-character interaction.

## Follow-up

- Reproduce the product behaviors as minimal environment primitives: `join`, `speak`, `select_next_speaker`, `private_observe`, `remember`, `forget`, `branch`, and `replay`.
- Add a comparison protocol for public context, private context, authoritative state, and rendered narrative.
- Check the current source code and licensing terms before reusing implementation details; this note records documented behavior, not permission to copy code or assets.
- Pair product tests with [RPGBENCH](../papers/2502.00595.md), [DEBATE](../papers/2510.25110.md), and [CAMO](../papers/2604.14691.md)-style evaluation.
