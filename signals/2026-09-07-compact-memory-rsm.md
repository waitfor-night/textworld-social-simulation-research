# Compact-Memory LLM Agents：在线聚类与原子感知记忆打包

- **来源类型：** 官方论文/预印本
- **作者或组织：** Jiahe Geng、Jinpeng Wang、Kun Yuan
- **发布于：** 2026-09-04（arXiv v1）
- **观察日期：** 2026-09-07
- **规范链接：** https://arxiv.org/abs/2609.04915
- **相关论文/项目：** [arXiv HTML 全文](https://arxiv.org/html/2609.04915v1)；AMA-Bench、RealMem
- **相关性：** `core`
- **置信度：** `medium`

## 观察到的内容

论文提出 RSM-full：用 cosine-gated max-member merge 在线合并记忆，再用 atom-aware grouped packer 组装上下文。在 AMA-Bench 的 4k token 预算下，作者报告达到 Full-Context 质量的 83% 而只用 32% token；相对 Online K-Means 在约 2.6k–5k 区间提升 3.5–6.0 个百分点，并在独立的 RealMem persona-memory 基准上复现正向收益。

## 证据与佐证

arXiv 摘要与 HTML 附录给出四种子、组件消融和 RealMem 比较；页面未提供独立代码仓库。论文也限定其优势主要在约 2k–5k prompt token 的紧预算区间，较高预算下其他基线可能更强，故不应泛化为所有长上下文设置。

## 为什么重要

角色代理通常需要在固定 token 预算下保留长期事件、偏好和关系；该工作把记忆质量拆为写入合并和上下文组装两个可测组件，便于研究社会记忆的成本—连续性折衷。

## 后续跟进

核对 AMA-Bench/RealMem 的公开协议与统计检验，测试不同 persona 密度、矛盾事件和模型升级方向；比较 RSM-full 与生命周期关系记忆在同一社会模拟轨迹上的延迟、召回和错误传播。
