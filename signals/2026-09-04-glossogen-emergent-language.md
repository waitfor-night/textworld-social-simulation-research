# GlossoGen: Emergent Language in Complex Multi-Agent LLM Interactions

- **来源类型：** 官方论文/预印本及官方代码仓库
- **作者或组织：** Elias Stengel-Eskin 及其合著者
- **发布于：** 2026-09-01（arXiv v1）
- **观察日期：** 2026-09-04
- **规范链接：** https://arxiv.org/abs/2609.01491
- **相关论文/项目：** [GlossoGen 预印本](https://arxiv.org/abs/2609.01491)；[模拟平台](https://github.com/agencyenterprise/GlossoGen)；[论文代码](https://github.com/esteng/emergent_communication)
- **相关性：** core
- **置信度：** medium

## 观察到的内容

GlossoGen 研究在 SaveVeyru 场景中、信息不完全且承受压力的智能体团队之间的通信。论文报告，智能体会发展出具有组合性与形态学能产性的约定（conventions），这些约定可能偏离其英语先验，甚至变得人类无法理解。它将效率压力、模型强度与事后复盘约定阶段确定为驱动因素，并报告新智能体仅凭使用即可学会既有约定。

## 证据与佐证

arXiv 记录同时链接了平台仓库与论文代码。平台 README 描述了角色与频道专属场景、工具调用、事件溯源运行日志、fork/swap 干预与事后指标，佐证了一个受控实验产物的存在。语言演化发现本身仍是全新的、作者自报的预印本结果。

## 为什么重要

私有暗语与文化漂移是多智能体社会可能出现的失效模式：它们可以改善协调，却降低人类可监控性。事件日志与干预钩子使其成为连接涌现文化研究与安全评估的特别有用的桥梁。

## 后续跟进

以固定模型版本运行 SaveVeyru，并检查原始消息/事件日志。加入人类可读性、约定稳定性与接管或提示注入探针，并比较混合强度的群体。
