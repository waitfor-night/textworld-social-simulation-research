# CreaMem：面向个性化代理的场景感知记忆

- **来源类型（Source type）：** official preprint / EMNLP Findings acceptance
- **作者或组织：** Qixuan Sun 等
- **发布于（Published on）：** 2026-09-08 (arXiv v1)
- **观察日期（Observed on）：** 2026-09-09
- **规范链接（Canonical URL）：** https://arxiv.org/abs/2609.08550
- **相关论文/项目：** CreaMem 代码仓库（论文页面链接）
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `medium`

## 观察到的内容

CreaMem 将长期记忆按 Life Scene 划分，减少跨场景干扰；每条记忆同时编码 episodic 和 trait 两个视角，并使用平衡检索。作者在两个长期记忆基准上报告各项问答指标提升，多跳问题收益更明显，并称代码已发布。

## 证据与佐证

arXiv 摘要公开了场景分区、双重编码和代码发布信息；实验数字目前只有作者报告，需锁定代码、数据版本和基线实现后复核。

## 为什么重要

角色代理往往同时处在家庭、工作和公共场景；把事件记忆与跨场景特质混在一起会产生错误迁移。CreaMem 提供了一个可与关系状态、私有信念和世界状态分开的记忆接口。

## 后续跟进

复现跨场景检索、场景切换和矛盾事件；同时报告记忆污染、隐私泄漏、更新延迟与 token/延迟成本，而不只报告 QA 分数。
