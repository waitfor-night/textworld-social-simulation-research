# EVOHARNESSBENCH：代理能否跟上不断演化的 harness？

- **来源类型：** 官方论文/基准项目页
- **作者或组织：** Zixuan Ke、Vaidehi Patil、Haizhou Shi、Yang Li、Ye Liu、Sarath Shekkizhar、Anurag Koul、Jiayu Wang、Xuan Phi Nguyen、Semih Yavuz、Mohit Bansal、Shafiq Joty
- **发布于：** 2026-09-03（arXiv v1）
- **观察日期：** 2026-09-07
- **规范链接：** https://arxiv.org/abs/2609.04280
- **相关论文/项目：** [EvoHarnessBench 项目页](https://mas-orchestra.salesforceresearch.ai/evoharness/)
- **相关性：** `core`
- **置信度：** `high`

## 观察到的内容

该基准把非平稳性放在外部 harness，而不是任务流：17 条多阶段流、802 个任务、520 个工具、42 个技能和 62 个 specialist agents，分别测试 harness 扩张下的部署保留和携带持久状态的自适应。作者观察到 harness-induced forgetting，且保留旧能力与适应新能力可能相互牵制。

## 证据与佐证

arXiv 论文与 Salesforce Research 项目页均公开基准构造和评测模式；项目页还给出工具/技能/代理轴的详细结果（例如代理轴最坏部署 BWT -34.7%）及任务统计。构造是确定性的、基于既有可验证基准，项目页数字比摘要更细，需按版本核对。

## 为什么重要

社会模拟代理的工具、角色 roster、技能和记忆都会随时间增加；这个基准直接测量“环境能力扩张本身”是否造成遗忘，而不仅是模型在新任务上的学习。

## 后续跟进

固定项目页对应的 benchmark 版本，比较 raw replay、结构化记忆、prompt 和 code adaptation；把多代理轴迁移到文本社会世界，单独记录 forward/backward transfer 与协调失败。
