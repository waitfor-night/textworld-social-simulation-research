# Harbor Adapters/Harbor-Index：大规模代理评测基础设施与元数据集

- **来源类型：** 官方论文/开源项目
- **作者或组织：** Lin Shi、Haowei Lin、Zixuan Zhu、Xiaoyue Zhou、Xiang Li 等（论文列出 120 位以上作者）
- **发布于：** 2026-09-03（arXiv v1）
- **观察日期：** 2026-09-07
- **规范链接：** https://arxiv.org/abs/2609.04298
- **相关论文/项目：** [Harbor 框架](https://github.com/harbor-framework/harbor)、[Harbor-Index](https://github.com/harbor-framework/harbor-index)、[互动结果页](https://harbor-index.org/)、[arXiv HTML 全文](https://arxiv.org/html/2609.04298v1)
- **相关性：** `core`
- **置信度：** `high`

## 观察到的内容

Harbor Adapters 将 80 多个代理基准接到统一任务接口；论文摘要报告在 54 个基准上评测 8 个模型，并从中筛出跨 29 个基准的 82 个高难任务组成 Harbor-Index。摘要称评测配置最高通过率不超过 30%，最强配置为 28.0%。

## 证据与佐证

论文 HTML 链接了公开框架、索引仓库、轨迹和结果页，并描述代码审查、AI/人工审计及修复循环。项目持续更新，正文不同部分的模型计数和版本可能随发布批次变化；比较时应锁定仓库 commit、模型版本、harness 和评分器。

## 为什么重要

它为文本环境和多代理研究提供统一、可审计的评测层，尤其能把 harness、工具和 verifier 差异与模型能力分开记录，减少只在单一基准上过拟合的风险。

## 后续跟进

下载固定版本的 adapters 与 Harbor-Index，抽取其中与记忆、规划、社会协作和安全相关的任务；同时复核 LLM-as-a-judge 任务和高成本运行的方差，不把单次排行榜当作能力定论。
