# TextWorld / Social Simulation 个人研究综述

这是一份**极度个人风格的研究综述**，围绕文本世界模型（text world models）、文本环境（text environments）、社会模拟（social simulation）与角色扮演智能体（role-playing agents）展开。

它不是公共索引，而是一条主线：

> 筛选我认为重要的观点与方法论，建立自己关于「文本世界」的体系，
> 并最终基于这套体系完成一个 text world model 项目。

当前体系的综合文档见 [`docs/design-synthesis.md`](docs/design-synthesis.md)。

本仓库收集以下主题的论文、基准测试、环境、智能体架构与研究信号：

- 文本世界模型与基于语言的环境；
- 社会与多智能体模拟；
- 角色扮演、人格（persona）与角色智能体；
- 规划、记忆、工具使用与长程交互；
- 评估、数据集与安全性。

## 这里有什么

本仓库将持久的研究证据与快速变化的信号分开存放：

- `papers/` — 结构化论文记录与论文索引；
- `digests/` — 按日期组织的重要论文与趋势摘要；
- `signals/` — 新闻、实验室公告、博客文章与社交媒体信号；
- `templates/` — 可复用的笔记格式模板；
- `config/` — 主题过滤器与研究配置；
- `docs/` — 工作流、分类体系与来源政策。

## 编辑原则

1. 每条记录都带有来源 URL 和观察日期。
2. 文献事实、作者声称与我们的解读分开记录。
3. 社交媒体帖子只作为线索或信号，直到有原始来源支持为止。
4. 摘要是简洁的原创内容；本仓库链接到论文原文，而不转载受版权保护的全文。
5. 负面结果、局限性、缺失的基线以及评估缺口都会被明确记录。

## 工作流

预期的工作循环是：

1. 通过 arXiv 列表/API/RSS 与网络调研发现候选条目；
2. 按 arXiv 标识符、DOI 或规范 URL 去重；
3. 依据 [`TAXONOMY.md`](TAXONOMY.md) 按相关性筛选；
4. 撰写结构化的论文或信号记录；
5. 发布带引用和置信度标签的日期摘要。

参见 [`docs/workflow.md`](docs/workflow.md) 与 [`docs/source-policy.md`](docs/source-policy.md)。

当前的架构与研究设计综合文档见 [`docs/design-synthesis.md`](docs/design-synthesis.md)。

最新的研究收录摘要见 [`digests/2026-09-09.md`](digests/2026-09-09.md)，仓库扩充路线见 [`docs/repository-development-plan.md`](docs/repository-development-plan.md)。此前的文献与产品快照见 [`digests/2026-09-04-literature-product-snapshot.md`](digests/2026-09-04-literature-product-snapshot.md)，对应的产品对比见 [`signals/2026-09-04-roleplay-product-landscape.md`](signals/2026-09-04-roleplay-product-landscape.md)。

## arXiv 收录

arXiv 支持通过邮件订阅每日论文列表。其官方说明要求向相应分类发送纯文本邮件，并在邮件正文中加入学科分类。参见 [arXiv 官方订阅说明](https://info.arxiv.org/help/subscribe.html#subscribe-to-daily-listing-emails)。

为了实现可复现的自动化，本项目同时使用 arXiv 公开的元数据源/API 作为结构化的收录层。邮件是有用的提醒渠道；本仓库只存储规范化后的元数据和链接，不存储原始邮箱内容。

## 状态

这是一份持续演进的个人综述：前期条目多而杂，广收候选；后期随体系成型，覆盖度主动收窄到自己的研究主线。事实性错误欢迎通过 issue 指正。
