# Role-playing and Social Simulation Product Landscape

- **来源类型：** 官方产品文档 / 官方代码仓库
- **作者或组织：** Character.AI、Nomi、SillyTavern、AI Dungeon、TavernAI 以及 a16z Infra
- **发布于：** 各不相同；见下方链接的原始来源
- **观察日期：** 2026-09-04
- **规范链接：** 见下方各产品专属链接
- **相关论文/项目：** [`docs/design-synthesis.md`](../docs/design-synthesis.md)
- **相关性：** `core`
- **置信度：** `high`（针对已记录的产品行为）；`medium`（针对研究意义）

## 观察到的内容

当前的角色扮演产品与开源系统已经暴露出若干对社会文本环境至关重要的构建模块：

| 系统 | 玩家/人格模型 | 多角色行为 | 记忆/状态 | 分支、控制或调度 | 研究相关模式 |
|---|---|---|---|---|---|
| [TavernAI](https://github.com/TavernAI/TavernAI) | 任意角色都可以是 AI 或用户；任意参与者都可被分配角色 | MultiChat 让每个角色拥有自己的历史/知识；时间线在会面时合并、之后再度分叉 | 持久状态与逐角色知识属于产品概念的一部分 | 分支时间线、脚本/资产，以及对「谁的信息进入上下文」的控制 | 「一等参与者 + 不对称知识」的最强产品级范例 |
| [AI Town](https://github.com/a16z-infra/ai-town/blob/main/ARCHITECTURE.md) | 人类与 AI 使用同一条动作通路 | 智能体向引擎所有的世界提交输入；对话作为世界数据持久化 | 加载/步进/保存循环、状态差异、持久对话与记忆检索 | 独立的 tick 批量执行；每个世界单线程的不变量避免了并发状态写入 | 智能体行为与权威模拟状态之间的清晰分离 |
| [SillyTavern group chats](https://docs.sillytavern.app/usage/core-concepts/groupchats/) | Personas 代表参与者在聊天中使用的身份 | 共享历史；可切换一张激活角色卡，或将所有卡并入上下文 | 角色卡、persona 与 World Info 提供上下文层 | Auto-mode 可在无用户时触发生成；回复策略可调度谁发言 | 实用的说话人调度与上下文组合，但存在人格融合的已知风险 |
| [Character.AI group chats](https://support.character.ai/hc/en-us/articles/41760067000475-Community-Update-September-2025) | 用户与一组角色互动 | 角色可以相互回应与发消息，无需用户编写下一位发言者 | 产品细节未作为权威公开状态模型暴露 | 群组互动被记录为一项演进中/限量推出的功能 | NPC–NPC 互动是面向用户的产品需求，而不只是基准测试的设想 |
| [Nomi group chat and support](https://nomi.ai/support/) | 将多个 Nomi 选入一场对话 | 用户可以选择下一位 Nomi 或开启自动聊天 | 共享的 Backstory+ 笔记可以改变对话风格与习惯 | 手动与自动发言者选择均已暴露 | 共享社会上下文与说话人调度很有用，但仍属于产品级抽象 |
| [AI Dungeon memory](https://help.aidungeon.com/faq/the-memory-system) | 协作式叙事，玩家动作包括 Do/Say 等 | 多人模式给予每位玩家一个角色身份 | 上下文预算、生成的记忆摘要、检索、Story Cards、Plot Essentials 与 Author's Note | 由于完整历史无法无限容纳，上下文组装被赋予优先级 | 记忆应被视为一种检索/压缩策略，而不是不断增长的记录文本 |

## 证据与佐证

- TavernAI 的官方仓库描述了一个私有的便携式角色扮演引擎，具有持久状态、分支，以及 MultiChat 设计——每个角色拥有独立的历史与知识。它还声明任何参与者都可以是 AI 或用户，且上下文纳入是可控的。
- AI Town 的官方架构描述了一个世界引擎，负责加载状态、运行 tick、计算差异并保存状态；智能体提交输入，只有引擎写入游戏状态。它明确旨在将智能体行为与游戏引擎解耦，并让人类与 AI 使用相同的动作。
- SillyTavern 的官方文档描述了共享群组历史、激活角色切换与并入全部角色卡两种模式、自动生成以及 personas。文档同时提醒，并入全部角色卡可能造成混淆或人格融合。
- Character.AI 的官方社区更新记录了角色在群聊中相互回应与发消息，同时指出该功能仍在改进与逐步推出。
- Nomi 的官方支持页面记录了手动或自动的下一位发言者选择与共享 Backstory+ 笔记。
- AI Dungeon 的官方记忆文档描述了上下文限制、生成式摘要、相关记忆检索，以及当前协作故事记忆与更早的结构化属性系统之间的区别。

## 为什么重要

产品格局表明，缺失的研究贡献不只是「更逼真的聊天」。反复出现的系统性问题在于如何组合：

1. 一等的人类与 AI 参与者；
2. 公开消息与私人信念、私人记忆并存；
3. 一个允许 NPC 在无用户回合时行动的说话人调度器；
4. 一个与生成文本分离的权威状态/事件层；
5. 保留因果重要事实的上下文检索与压缩；
6. 对备选历史的分支、重放与检查。

各产品对这些模块的实现参差不齐。TavernAI 强在参与者专属历史与分支；AI Town 强在引擎所有权与确定性状态更新；SillyTavern 与 Nomi 暴露了实用的群组调度；AI Dungeon 展示了生产环境中的记忆约束；Character.AI 展示了对角色间自主互动的需求。

## 后续跟进

- 将产品行为复现为最小的环境原语：`join`、`speak`、`select_next_speaker`、`private_observe`、`remember`、`forget`、`branch` 与 `replay`。
- 为公开上下文、私有上下文、权威状态与渲染叙事添加对比协议。
- 复用实现细节之前先核查当前源代码与许可条款；本笔记记录的是已记录的行为，不代表复制代码或资产的许可。
- 将产品测试与 [RPGBENCH](../papers/2502.00595.md)、[DEBATE](../papers/2510.25110.md) 和 [CAMO](../papers/2604.14691.md) 风格的评估配对进行。
