# EDGE-KOPA 宣布 EMNLP 2026 Industry Track oral，工件仍待发布

- **来源类型（Source type）：** official project announcement
- **作者或组织：** EDGE-KOPA 作者团队（Dain Kim、Eungi Cho、Kyumin Kim、Shinyeong Noh、Kyuseong Lim）
- **发布于（Published on）：** 2026-09-08
- **观察日期（Observed on）：** 2026-09-08
- **规范链接（Canonical URL）：** https://github.com/dneirfi/EDGE-KOPA/commit/780c37125e42373ec963e70399c2e1ed3912353d
- **相关论文/项目：** [arXiv:2609.05395](https://arxiv.org/abs/2609.05395)；[EDGE-KOPA 仓库](https://github.com/dneirfi/EDGE-KOPA)；[原信号笔记](2026-09-07-kopa-bench-edge.md)
- **相关性（Relevance）：** `signal`
- **置信度（Confidence）：** `medium`

## 观察到的内容

作者在项目 README 中宣布 EDGE-KOPA 入选 EMNLP 2026 Industry Track oral，并补充了方法、结果表、MIT/KOGL 许可说明及 arXiv 链接。README 仍明确将 KOPA-Bench 的 145 个任务、1,781 条 EDGE 训练轨迹和两个微调 checkpoint 标为“coming soon”。

## 证据与佐证

GitHub 提交及其差异可直接核验公告与 README 内容，arXiv 论文佐证项目和自报实验结果。当前没有会议官方日程/录用列表的独立链接；仓库仍只有三次提交，Hugging Face collection 链接还是 `TODO_HF_COLLECTION`，因此 oral 状态按作者公告记录，不能据此声称 benchmark、训练数据或模型已经公开。

## 为什么重要

该更新提高了项目可见度，也澄清了许可边界，但没有消除实时公共 API 基准的关键复现障碍。对文本环境评测而言，论文公开、会议录用和可运行工件是三个不同成熟度层级。

## 后续跟进

等待会议官方 program 佐证 oral 状态，并监测 Hugging Face collection、任务定义、MCP servers、评测 harness、训练语料和 checkpoint 的实际发布；发布后立即固定 commit、数据 revision 与 API 快照再复测。
