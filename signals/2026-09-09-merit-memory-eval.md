# MERIT：带成本核算的长期记忆工具任务评测

- **来源类型（Source type）：** official preprint / benchmark and harness release
- **作者或组织：** Shweta Mishra、Shashank Mishra
- **发布于（Published on）：** 2026-07-26 (arXiv v1; surfaced in 2026-09-09 new-list scan)
- **观察日期（Observed on）：** 2026-09-09
- **规范链接（Canonical URL）：** https://arxiv.org/abs/2609.05441
- **相关论文/项目：** MERIT benchmark、harness 和 traces（论文发布页）
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `medium`

## 观察到的内容

MERIT 用三个领域的跨情节工具任务测量记忆的边际效用，加入自动泄漏检查、更新事实、记忆污染以及 token 和美元计量。作者报告 23,440 个 episode；更新事实上的 embedding 检索跨模型波动很大，正确检索后代理只在约 55% 情况采取正确行动，而更新写入存储为 0.70–1.00；不同记忆实现可使成功率相差最多 60 个百分点。

## 证据与佐证

arXiv 摘要公开了任务设计、预注册网格、成本和 traces 发布；数字是作者报告，尚需检查代码、模型版本、泄漏控制和完整重放。

## 为什么重要

它把记忆评测从“能否回答历史问题”推进到“记忆是否改变工具行动且成本可接受”，与社会世界中的更新事实、权限和副作用更贴近。

## 后续跟进

固定 benchmark revision 与模型端点，复现更新事实、污染和 full-replay 对照；再加入角色关系、私有状态和权威世界状态检查。
