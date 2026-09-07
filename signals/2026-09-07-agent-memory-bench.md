# Agent-Memory-Bench: Execution-Graded Memory for Coding Agents

- **来源类型（Source type）：** benchmark announcement / open-source project
- **作者或组织：** GiulioDER (Gde05)
- **发布于（Published on）：** 2026-09-02 (public announcement; repository continuously updated)
- **观察日期（Observed on）：** 2026-09-07
- **规范链接（Canonical URL）：** https://discuss.huggingface.co/t/open-call-test-your-agent-memory-layer-on-an-adversarial-coding-benchmark/179762
- **相关论文/项目：** [agent-memory-bench repository](https://github.com/GiulioDER/agent-memory-bench); [corpus on Hugging Face](https://huggingface.co/datasets/Gde05/agent-memory-bench-corpus); [benchmark site](https://giulioder.github.io/agent-memory-bench/)
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `medium`

## 观察到的内容

AMB is presented as a preregistered, execution-graded benchmark in which Claude Code completes real repository tasks and an executable checker grades the resulting artifact. The public announcement describes 195 pre-authored session transcripts and a hard corpus of 4,900 documents (196 real plus 4,704 synthetic distractors, about 143,000 chunks). The repository's current `official-003` status reports eight arms, 26 official-grid tasks (34 executable), 317 paired cells, and present/absent/superseded/contradictory/adjacent conditions. Its headline is a null: `claude_md` baseline task success 0.577, `placebo` 0.672, and `recall` and `bare` 0.659, with no arm's 95% interval excluding zero.

## 证据与佐证

The announcement, repository README, corpus card, preregistration, scripts, and result artifacts are public. The authors state that the current run measures retrieval over a pre-ingested corpus, not extraction, consolidation, or persistence; it uses one relatively inexpensive model and one seed per cell, was not announced in advance, and has budget-matching limitations. The benchmark is built by the authors of `recall`, one of the evaluated arms.

## 为什么重要

Execution grading and explicit stale/contradictory/adjacent conditions are stronger tests of useful memory than retrieval-only scores. The null result and disclosed protocol limits are themselves useful evidence against declaring a memory layer superior from a small leaderboard.

## 后续跟进

Run the repository's static audits and `verify_run` command, then reproduce the paired cells. Add write-path, consolidation, cross-session social-world tasks and a no-memory baseline before adapting the protocol to role-play or multi-agent simulation.
