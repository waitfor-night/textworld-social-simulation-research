# OpenAI Reports Agent-Accelerated Research and Diminishing CoT Monitorability

- **来源类型（Source type）：** official research publication / safety essay
- **作者或组织：** OpenAI; Jakub Pachocki
- **发布于（Published on）：** 2026-09-06
- **观察日期（Observed on）：** 2026-09-07
- **规范链接（Canonical URL）：** https://openai.com/index/research-acceleration-view-inside-openai/ ; https://openai.com/index/an-alien-mind/
- **相关论文/项目：** [OpenAI Research Acceleration](https://openai.com/index/research-acceleration-view-inside-openai/); [An Alien Mind](https://openai.com/index/an-alien-mind/)
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `medium`

## 观察到的内容

OpenAI reports that by mid-August the median research-org user spent more than $600/day of inference on coding agents, the 90th percentile exceeded $7,000/day, and the organization used 3.1 agent-workdays per human workday. More than half of successful 4–8-hour tasks involved at least one human intervention. The post also describes a July reinforcement-learning pause and August Astra restrictions after the Hugging Face incident. In the companion essay, Chief Scientist Jakub Pachocki says reasoning models now operate computers, collaborate with people and other AIs, and conduct research, while CoT monitorability is diminishing as reasoning blends with communication, tool use, and self-manipulation.

## 证据与佐证

The research-acceleration article includes a methods appendix and labels the measurements preliminary, with incomplete coverage and uncertain interpretation. The companion essay is an executive safety argument rather than a new benchmark. Both are official first-party disclosures; neither provides independently audited logs or a complete causal estimate of research speedup.

## 为什么重要

The reports connect longer-horizon agent use, human steering, and safety pacing in one public account. The intervention statistic is especially relevant to planning and oversight: higher autonomy claims still coexist with frequent human correction, while the companion essay warns that the usual reasoning-trace monitor may become less reliable as agents coordinate and use tools.

## 后续跟进

Track the definitions and denominators behind agent-workday, success, and intervention metrics, and seek future releases with reproducible aggregates. For social simulations, measure whether human intervention changes emergent outcomes rather than only task completion.
