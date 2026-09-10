# NormReact：LLM 的二阶社会规范推理

- **来源类型（Source type）：** official preprint / annotated dataset
- **作者或组织：** Sunny Rai、Jinyi Kuang、Reyhan Jamalova、Annie Lou、Cristina Bicchieri、Niyati Malhotra、Victor Hugo Orozco-Olvera、Ana Maria Munoz-Boudet、Lyle H Ungar、Sharath C Guntuku
- **发布于（Published on）：** 2026-07-17 (arXiv v1; surfaced in 2026-09-09 new-list scan)
- **观察日期（Observed on）：** 2026-09-09
- **规范链接（Canonical URL）：** https://arxiv.org/abs/2609.05437
- **相关论文/项目：** NormReact 数据集（论文发布页）
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `medium`

## 观察到的内容

NormReact 包含 450 个规范违规场景，标注违规者情绪、自我约束、旁观者他人约束，并交叉性别和社会距离。六个模型普遍高估负面惩罚，在社会距离增大时与人类判断更不一致。

## 证据与佐证

arXiv 摘要给出数据规模、任务定义和模型结果；当前未找到独立复现。人类标注范围和场景构造决定了外推边界。

## 为什么重要

社会模拟若把规范执行简化成“违规即惩罚”，会生成比现实更严厉的制度动态。该数据集提供了把社会距离、容忍和情绪调节纳入角色评测的具体接口。

## 后续跟进

核对标注协议和人类一致性，在文本世界中加入声誉、关系和制度成本；分别评估违规者、旁观者和裁决者的预测偏差。
