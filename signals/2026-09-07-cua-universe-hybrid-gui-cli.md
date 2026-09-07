# CUA-Universe：混合 GUI+CLI 计算机使用环境

- **来源类型：** 官方论文/预印本
- **作者或组织：** Haoting Shi、Wenhao Wang、Weicheng Fang、Yaozhong Liang、Tian Jin、Pengxiang Zhao、Guangyi Liu、Siheng Chen、Yanfeng Wang
- **发布于：** 2026-09-04（arXiv v1）
- **观察日期：** 2026-09-07
- **规范链接：** https://arxiv.org/abs/2609.05374
- **相关论文/项目：** [arXiv HTML 全文](https://arxiv.org/html/2609.05374v1)；与 OSWorld/OSWorld-MCP 的迁移评测见论文
- **相关性：** `adjacent`
- **置信度：** `medium`

## 观察到的内容

论文提出 CUA-Universe，把真实桌面软件改造成同时支持 GUI 与命令行的可复现实验环境。App-Forge、Task-Weave、Path-Steer 分别负责应用适配、混合任务合成和高效轨迹采集，覆盖 16 个应用；作者报告 9B 模型在自有评测、OSWorld 和 OSWorld-MCP 上同时提升成功率并减少步数/ token。

## 证据与佐证

arXiv 摘要和 HTML 方法部分给出环境构造、应用清单与指标（自有评测分数 +39.3、步数 -37%、token -60% 等）。页面未列出独立代码仓库，结果仍是单篇预印本的作者报告，需注意训练数据与评测设置可能共同作用。

## 为什么重要

它把“可操作的文本/命令接口”和“视觉状态”放在同一环境中，为研究代理如何在多种行动通道之间规划、迁移和保持状态提供了可复用的环境设计范式，也可启发文本世界中的多模态行动空间。

## 后续跟进

关注环境与任务数据是否公开；若公开，固定应用版本和 VM 镜像，比较纯 GUI、纯 CLI 与混合策略，并测试其对文本社会模拟中工具调用与状态一致性的迁移价值。
