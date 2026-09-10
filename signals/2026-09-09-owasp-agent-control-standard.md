# OWASP 2026 Top 10 与 Agent Control Standard

- **来源类型（Source type）：** official security announcement / control standard
- **作者或组织：** OWASP GenAI Security Project
- **发布于（Published on）：** 2026-09-01（公告页面 9 月 2 日 dateline）
- **观察日期（Observed on）：** 2026-09-09
- **规范链接（Canonical URL）：** https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/
- **相关论文/项目：** [Agent Control Standard (ACS)](https://genai.owasp.org/resource/agent-control-standard-acs/)
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `high`

## 观察到的内容

OWASP 公布 2026 年 LLM 应用 Top 10 更新，并发布 Agent Control Standard。ACS 要求代理具备可检查、可追踪、可插桩的运行时边界，支持中间件钩子和声明式策略执行；Top 10 的排序据称来自数千起事件和社区反馈。

## 证据与佐证

公告页与 ACS 资源页相互链接并公开标准内容，足以确认发布状态。事件汇总和风险排序属于 OWASP 社区/项目方的综合陈述，不等同于独立统计审计。

## 为什么重要

这为文本世界的工具、记忆和状态变更提供了一个外部控制标准参照：审计点应位于代理轨迹和实际 mutation 之间，并保留可回放证据。

## 后续跟进

逐条对照 ACS 的钩子、策略和追踪字段与本项目的世界状态、记忆上传和授权接口；记录无法映射的控制项和需要环境级裁决的边界。
