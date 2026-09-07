# Funes：面向编码代理的本地可审计长期记忆

- **来源类型：** 官方博客、代码仓库与数据集
- **作者或组织：** Hugging Face
- **发布于：** 2026-09-03（项目公告）
- **观察日期：** 2026-09-07
- **规范链接：** https://huggingface.co/blog/funes
- **相关论文/项目：** [funes 仓库](https://github.com/huggingface/funes)；[handoff-recall benchmark](https://huggingface.co/datasets/dacorvo/funes-handoff-recall-benchmark)；[memory 数据集](https://huggingface.co/datasets/huggingface/funes-memory)
- **相关性：** `adjacent`
- **置信度：** `high`

## 观察到的内容

Funes 为 Claude Code、Codex、pi 和 Hermes 等编码代理提供本地持久记忆：解析会话 trace，保留原始 provenance，在 Lance 数据集中做向量与 BM25 融合检索，并用交叉编码器、邻近事件和 recency 做重排。公告同时发布 handoff-versus-recall 对照，作者称 recall 在其任务上比 handoff 低约 4–8 倍成本。

## 证据与佐证

博客、仓库和 Hugging Face 数据集均为公开一手工件；成本/任务数字是项目自测，且一项压缩运行失败。它面向编码工作流，不直接证明社会代理的关系记忆或隐私安全。

## 为什么重要

它把“记忆”落成可检查的事件解析、原始证据和本地索引，而非只提供一段摘要；这为文本社会世界中的跨回合记忆、交接和溯源实验提供了可复用的工程基线。

## 后续跟进

固定仓库版本，审计删除、访问控制和 provenance 保留；把 handoff/recall 对照改成含私有信念、关系冲突和身份变化的社会轨迹，并报告召回、遗漏和泄漏成本。
