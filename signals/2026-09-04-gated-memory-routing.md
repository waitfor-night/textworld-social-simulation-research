# Learning What to Retain: Gated-Memory Routing for Efficient Collaboration in Multi-Agent LLM Systems

- **来源类型：** 官方论文/预印本与官方代码仓库
- **作者或组织：** Rakibul Hasan Rajib, Mengxing Zheng, and Qian Lou
- **发布于：** 2026-08-31（arXiv v1）
- **观察日期：** 2026-09-04
- **规范链接：** https://arxiv.org/abs/2609.00237
- **相关论文/项目：** [Gated-Memory Routing 预印本](https://arxiv.org/abs/2609.00237)；[代码仓库](https://github.com/rajibrhasan/gated-memory-routing)
- **相关性：** adjacent
- **置信度：** medium

## 观察到的内容

Gated-Memory Routing 使用一个学习的写入门控来保留非冗余的推理步骤，一个检索门控来暴露紧凑的相关子集，以及一个自适应停止控制器，在证据充分时即停止。论文报告了在五个推理和代码基准测试上的最佳平均准确率，比最强基线高出 2.44 分，并将 HumanEval 的推理成本降低了 31.9%。arXiv 记录显示该工作已被 EMNLP 2026 接收。

## 证据与佐证

标注日期的 arXiv 摘要链接了一个公开的 GitHub 仓库，并给出了基准测试层面的数字。证据仍是单一的作者自报结果，且任务并非社会模拟；其迁移价值取决于门控能否保留关系和规范信息，而不仅仅是任务进展标记。

## 为什么重要

多智能体社会可能淹没在重复消息和陈旧上下文中。学习的保留与检索使记忆成为一种可度量的路由策略，可以与手工设计的摘要进行比较，并检查其遗漏之处。

## 后续跟进

审计仓库保留的条目和检索轨迹。在多角色对话上评估同样的门控，配合关系、信念和规范探针，同时报告任务成功率以及从上下文中丢失的社会重要事实。
