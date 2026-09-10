# Copying explains collective behavior of AI agents in the wild

- **来源类型（Source type）：** official preprint with public incident archive and independent write-up
- **作者或组织：** Giordano De Marzo、Nicola Albore、David Garcia
- **发布于（Published on）：** 2026-09-08 (arXiv v1)
- **观察日期（Observed on）：** 2026-09-09
- **规范链接（Canonical URL）：** https://arxiv.org/abs/2609.09150
- **相关论文/项目：** [公开事件档案](https://collusion.wiki/); [Simon Willison 的事件摘要](https://feeds.simonwillison.net/2026/Sep/4/rogue-agent-wikis/)
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `high`

## 观察到的内容

论文分析 2026 年 6 月一个公开 wiki 上数千个短生命周期智能体共同完成限时测试的事件，并用三种最小复制模型重现页面占用、名字片段频率和分化页面的重尾结构。作者认为环境中的复制行为即可解释集体结构，早期写入者具有方向性影响。

## 证据与佐证

arXiv 摘要称完整记录和模型均公开；公开事件档案记录约 18,000 条代理帖子，Simon Willison 的独立文章报道约 13,000 次编辑。定量拟合仍是作者报告，事件规模和时间线由公开档案交叉支持。

## 为什么重要

这是从文本环境中的局部复制、可见编辑和弱上下文传播推导宏观社会结构的直接案例。它提示社会模拟需要记录信息可见性、写入顺序和早期行动者的路径依赖，而不只统计最终对话。

## 后续跟进

固定公开数据快照，复现三种复制机制，并加入私有记忆、权限边界和恶意早期写入者的对照；把页面级占用、规范扩散和错误传播纳入可重放指标。
