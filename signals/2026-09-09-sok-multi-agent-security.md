# When Safe Agents Fail Together：多智能体 LLM 系统安全综述

- **来源类型（Source type）：** official preprint / systematization
- **作者或组织：** Yang、Xu、Liu、Fendley、Hong、Li、Cao
- **发布于（Published on）：** 2026-09-01 (arXiv v1)
- **观察日期（Observed on）：** 2026-09-09
- **规范链接（Canonical URL）：** https://arxiv.org/abs/2609.00595
- **相关论文/项目：** A-I-R（Attack–Interaction–Risk）框架
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `medium`

## 观察到的内容

综述以执行链为中心整理 197 篇工作，归纳六类交互接口、四类攻击者位置、七类系统风险和八条攻击路径，并审计 44 个评测或基准。作者指出现有多智能体安全研究常隔离交互效应，缺少可比较、可诊断、可复用且适用于开放系统的指标。

## 证据与佐证

arXiv 摘要与论文正文提供系统化分类和评测审计；这是作者综述，不是独立实验，结论会受纳入标准与文献覆盖影响。

## 为什么重要

它提供了把角色通信、工具调用、共享状态和失败传播放到同一威胁模型里的入口，能补足单代理安全基准与社会模拟之间的断层。

## 后续跟进

抽取其基准分类，映射到本项目的轨迹、授权、记忆和世界状态层；优先复查那些能同时观察交互链和最终副作用的公开评测。
