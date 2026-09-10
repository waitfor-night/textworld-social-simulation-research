# PspMAS：用 Prospect State 保持大规模多智能体异质性

- **来源类型（Source type）：** official preprint / EMNLP Findings acceptance
- **作者或组织：** Zhimei Chen、Mu Chen、Fakhri Karray
- **发布于（Published on）：** 2026-09-07 (arXiv v1)
- **观察日期（Observed on）：** 2026-09-09
- **规范链接（Canonical URL）：** https://arxiv.org/abs/2609.08033
- **相关论文/项目：** PspMAS（Prospect-State Propagation Multi-Agent System）
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `medium`

## 观察到的内容

论文观察到，大规模 LLM 多智能体系统在压缩状态时会逐渐失去个体异质性。PspMAS 将紧凑的 Prospect State（心理痕迹，由并行传播器更新）与表达性的 Semantic State（感知、推理和规划）分开，以支持经济和社会模拟中的规模扩展；论文报告在扩展人口时较能保持角色差异。

## 证据与佐证

arXiv 页面标注 EMNLP 2026 Findings 接收，摘要说明了状态分解和社会模拟目标；具体实验、代码和跨模型稳定性仍需核查，当前没有独立复现。

## 为什么重要

它把“规模化后角色趋同”作为状态表示问题，而不只是模型能力问题。文本世界可以据此把私有心理迹象、共享事实和可见叙事分层，避免通信压缩把不同角色的信念抹平。

## 后续跟进

固定人口规模、传播频率和压缩预算，测量角色信念、语言风格、行动策略与群体统计的漂移；加入冲突记忆和私有信息泄漏测试。
