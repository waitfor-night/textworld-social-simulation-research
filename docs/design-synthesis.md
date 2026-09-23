# 设计综合：文本世界、社会模拟与角色扮演

这份备忘录提炼了为本项目提供的两份共享讨论中的有用设计立场。它是一份研究设计文档，而非经过核实的文献综述。关于先前工作的论断，必须先对照原始论文、代码或官方项目页面独立核实，才能提升到 `papers/` 中。

## 1. 工作论点

最有辩护力的研究目标不是「造一个更大的 AI 小镇」，而是：

> 研究局部的、以身份为条件（identity-conditioned）的 NPC 行为如何通过网络和约束扩散形成宏观事件，这些事件如何修改一个可执行的世界，以及不同的参与者随后如何观察并响应这个被改变的世界。

模拟器首先应被视为一个机制实验室。一个有说服力的结果意味着某个机制在指定世界内是可复现的、且对因果干预敏感的。这并不自动意味着同一机制能预测真实人类社会。

## 2. 把三种模拟目标分开

| 目标 | 建模对象 | 典型输出 |
| --- | --- | --- |
| 数字个体 | 一个真实人物的画像、历史或偏好 | 问卷答案、决策、短期行为 |
| 受控交互 | 少数几个带有目标、秘密和关系的角色 | 对话、谈判、合作、冲突 |
| 开放社会世界 | 许多在共享环境中持续存在的智能体 | 信息级联、制度、迁徙、危机 |

这些目标不应该用一个分数来比较。[LLM 社会模拟综述](../papers/2412.03563.md) 的个体—情景—社会三分法和 [角色智能体综述](../papers/2404.18231.md) 的人口统计—既定角色—个体化 persona 三分法提供了文献参照；[TrustSim](../papers/2410.23426.md) 进一步表明通用模型能力不自动转化为角色模拟一致性。角色研究本身也经历了从隐式 [speaker persona](../papers/1603.06155.md)、显式 [PERSONA-CHAT profile](../papers/1801.07243.md)，到基于原作经历的 [ChatHaruhi](../papers/2308.09597.md) 和可训练的 [RoleLLM](../papers/2310.00746.md) / [Character-LLM](../papers/2310.10158.md)；其评测随后从知识与风格扩展到 [人格访谈](../papers/2310.17976.md) 和 [角色决策](../papers/2404.12138.md)。[CoSER](../papers/2502.09082.md) 进一步把文学场景、人物经历、对话、动作、内心活动和多角色表演放进同一数据/评测框架；后续 [ROLETHINK](../papers/2503.08193.md) 与 [HER](../papers/2601.21459.md) 分别探索内心推理评测和 reasoning/RL，[HumanLLM](../papers/2601.10198.md) 则尝试建模多个心理模式的情境交互。这些工作仍不提供权威世界状态：内心文本可能是事后合理化，文学行为也不能直接外推到现实个体。[ANIMASK](../papers/2609.16667.md) 进一步用移除 persona 的配对重放区分角色约束与底层模型默认政策；[RoleBreak](../papers/2609.16614.md) 则显示语音角色的首次 persona/安全失败可能在十余轮内出现。因此 persona 评测应同时包含因果消融和首次失败时间，而不能只报告平均角色相似度。地图应至少报告五个独立的尺度：

- 身份：人口学提示词 → 历史/轨迹 → 深度访谈或生活记录；
- 动作：单次回答 → 对话轮次 → 平台动作 → 日程/资源动作；
- 时间：一次响应 → 一个情节（episode）→ 数天 → 数年；
- 社会：成对 → 群体 → 小镇 → 网络/总体；
- 环境：散文描述 → 大模型裁判 → 显式状态与规则 → 经过校准的世界。

群体规模大并不等于个体保真度高。反过来，一个细节丰富的个体模拟器也未必是社会模拟器。

## 3. 文本环境与文本世界模型

在整个项目中使用以下区分：

- **文本环境（text-based environment）** 是外部接口和实验世界。它提供事实、合法动作、状态转移、观察和反馈。
- **文本世界模型（text world model）** 是智能体对该世界的内部预测模型。它应跟踪状态、预测后果、表示不确定性、泛化到新组合，并支持反事实推理。

环境是真相的来源；世界模型是关于真相的假设。[World Model Science](../papers/2609.17419.md) 的 trajectory-level 对齐表明，局部动作仍可通过时全局状态保真可能已经失败，因此必须逐步比较 agent-implied state 与 benchmark-grounded state。一个有用的循环是：

```text
environment interaction → trajectory and feedback → learned world model
→ imagined rollout/search/planning → environment execution and correction
```

为世界模型研究设计的环境应同时暴露结构化状态与自然语言，包含部分可观察性和延迟反馈，支持反事实分支，并记录种子和完整轨迹。评估应区分合法性、状态跟踪、预测、规划、不确定性校准和语言质量。

这一环境观可从四个历史基线理解：[TextWorld](../papers/1806.11532.md) 提供可控生成与显式状态，[Jericho](../papers/1909.05398.md) 引入人工互动小说的语言和常识复杂度，[LIGHT](../papers/1903.03094.md) 将身份、对话、动作和局部世界 grounding 结合，[ALFWorld](../papers/2010.03768.md) 则把抽象文本策略与具体具身执行对齐。它们支持“语言接口不等于世界状态”这一边界，但不直接证明开放社会模拟的有效性。

[CoALA](../papers/2309.02427.md) 可用于描述记忆、内部/外部动作与决策循环，[Autonomous Agents Survey](../papers/2308.11432.md) 则提供更宽的规划、记忆、工具和评测引文入口；两者都是组织框架，不是模块有效性的独立实验证据。

## 4. 四个计算部件

所提议的系统有四个可替换部件，外加共享的数据契约和追踪。

| 部件 | 建议名称 | 职责 | 硬边界 |
| --- | --- | --- | --- |
| 1 | 角色智能体引擎（Role Agent Engine, RAE） | 身份、目标、信念、记忆、规划、对话、动作意图 | 不能读取完整世界，也不能直接修改它 |
| 2 | 社会扩散引擎（Social Diffusion Engine, SDE） | 曝光、模仿、通信、网络/空间传播、局部聚合 | 不能发明世界事实，也不能自行宣布事件 |
| 3 | 世界状态引擎（World State Engine, WSE） | 权威状态、规则、动作校验、效果、事务、快照、重放 | 不生成私密的主观体验 |
| 4 | 游戏主控系统（Game Master System, GMS） | 非剧情内的控制平面：调度、投影、编译、聚合、审计、渲染 | 不能是一个拥有无限制写权限的单一全知黑箱 |

历史基线分别覆盖了其中一部分：[ReAct](../papers/2210.03629.md) 给出最小行动闭环，[Generative Agents](../papers/2304.03442.md) 组合记忆、反思与计划，[SOTOPIA](../papers/2310.11667.md) 提供带私有目标的社会交互评测，[CAMEL](../papers/2303.17760.md) 探索角色化通信，[Voyager](../papers/2305.16291.md) 将长期能力保存为可执行技能，[Concordia](../papers/2312.03664.md) 则把组件化代理与 Game Master 引入生成式 ABM。本项目的四部件拆分是对这些模式的综合与约束，不是任何单篇论文的原样实现。

玩家应是一等参与者，而不是一个特殊的 `{{user}}` 字符串：

```text
Participant = identity + controller(human|AI) + visibility + branch_state
```

这使得同一个世界可以容纳人类控制的记者、AI 居民或临时叙述者，同时保持权限和因果状态的显式化。[DUMA-Bench](../papers/2609.24662.md) 表明用户与 agent 均可改变共享状态的 dual-control 设定会显著扩大攻击面，因此 human/AI controller 必须经过同一 typed effect、权限和审计边界。[Agentic Societies Need a Social Harness](../papers/2609.17527.md) 进一步提示 personal harness 与跨主体 social harness 应分离：后者负责身份、消息合法性、运行时验证和事后追责，而不是让每个角色自行决定通信是否可信。隔离运行也不是隐式信道的屏障：[For Your Eyes Only](../papers/2609.19504.md) 显示同架构隔离实例仍可仅靠共享预训练传递可检测信号。

## 5. 「GM」在此设计中意味着什么

GMS 是粘合剂和控制平面。GM LLM 只是其中的一个语义组件。请保持以下区分：

```text
GM System = deterministic runtime + semantic operators + tools + policies + audit
GM LLM    = one replaceable model used by selected operators
```

推荐的操作算子：

- `Projection`（投影）— 在确定性可见性过滤之后，渲染以身份为条件的观察；
- `ActionCompiler`（动作编译器）— 将自然语言意图转换为带类型的候选动作；
- `Adjudicator`（裁决器）— 只解决规则批准的歧义；
- `EventSynthesizer`（事件合成器）— 命名并解释有证据支持的事件候选；
- `NarrativeRenderer`（叙事渲染器）— 从已提交的历史中生成新闻、传闻、场景或角色视角的散文；
- `ConsistencyAuditor`（一致性审计器）— 检测信息泄漏、矛盾、无效效果和因果缺口。

对投影导向角色最贴切的名称是 **Perspective Game Master（视角游戏主控，PGM）**，但架构应保留更宽泛的 **Game Master System** 名称，因为控制平面做的远不止投影。工具结果还必须满足 execution integrity：[APEXA](../papers/2609.24165.md) 在部署中捕获了“生成完整校准报告但命令从未执行”的情况，因此没有 committed event 或 tool receipt 的结果只能成为明确的 non-result。动作提交也应区分 authorization 与 readiness：[ActGov](../papers/2609.24446.md) 在 effect boundary 对每个工具调用检查 task-scoped authorization；[Cognitive Admission Control](../papers/2609.16313.md) 则提示即使已有权限，高风险 typed action 在执行前仍要满足证据类别、新鲜度、scope 和 witness independence，并将证书、dispatch guard 与 replay protection 绑定。[Cognitive Serializability](../papers/2609.20261.md) 进一步要求动作与其推导输入（数据、证据、政策、授权）存在共同有效点，并把授权 provenance 作为结构化状态而非摘要文本传递——[Verification-Status Laundering](../papers/2609.20211.md) 显示摘要和记忆压缩会洗掉验证状态，把风险动作批准率从个位数推到 60–98%。并发资源冲突同样需要显式控制：[ClashBench](../papers/2609.19892.md) 中 44.5% 轨迹出现破坏性抢占，且多数未在最终回复中披露。

## 6. 权威、观察与信念

必须有一个权威的世界状态和许多主观视角。

```text
WorldState(t)
  → deterministic VisibilityPolicy(world, identity, position, time)
  → visible slice
  → Projection/PGM
  → Observation(i,t)
  → BeliefState and memory update
  → ActionIntent
```

保持三个层次分离：

1. **权威（Authority）** — 实际发生了什么：库存、价格、法律、位置、关系边、事件阶段。
2. **观察（Observation）** — 参与者通过位置、角色、组织、渠道、延迟和可靠性所能获得的信息。
3. **信念（Belief）** — 参与者认为该观察意味着什么；它可能是错误的、不完整的或有偏的。[Bayesian Belief Layer](../papers/2609.21997.md) 进一步展示了一种最小可审计实现：用概率 stance 和显式 prior strength 控制更新，再把语言表达作为独立通道，而不是从输出文本反推 belief。

状态还必须区分 `tentative → committed → invalidated` 并保留 lineage。[Clarification Is Not Correction](../papers/2609.25337.md) 显示后续澄清常被模型当作追加上下文，而非撤销早期解释；因此冲突证据必须使旧 Task/Belief State 及其依赖计划显式失效。[ReAdapt](../papers/2609.25284.md) 进一步将目标、信念、关系、规范和披露状态放入 typed Adapt 步骤，提示 Relationship State 也应随证据更新，而非仅作为静态 persona 文本。

大模型可以用符合角色的方式解释过滤后的信息切片，但它绝不能决定一个隐藏的秘密变得可见。这种分离使错误信息、私有知识、不对称信息和相互竞争的解释成为可能，而不会破坏世界真相。

扩散机制本身也必须参数化。[Message capacity and claim wording](../papers/2609.19183.md) 表明集体真值发现的转折点由每个 agent 的阅读上限和 claim 措辞设定的单 agent 阈值共同决定；两者都是可测的单 agent 量。因此 SDE 实验至少要报告 message capacity、wording threshold 和网络度统计，而非只报告拓扑。

## 7. Social MapReduce 执行模型

每个模拟屏障可以实现为分层的、事件驱动的 MapReduce，而不是让一个 GM 去读每条轨迹。

```text
Map 1:   WorldSnapshot + Identity        → PersonalObservation
Map 2:   PersonalObservation + Memory    → RawAction / ActionIntent
Compile: RawAction                       → TypedAction
Shuffle: TypedAction + social/spatial graphs → Exposures
Reduce:  Exposures by (place, topic, group, organization) → AggregateSignal
Reduce:  AggregateSignal + rules         → EventCandidate / WorldDelta
Commit:  validated WorldDelta            → WorldState(t+1) + EventLog
Render:  committed history               → participant views / narrative outputs
```

扩散引擎回答「信号如何到达？」GM 回答「到达的信号如何被解释或渲染？」世界引擎决定由此产生的效果是否合法且真实。

## 8. 宏观事件必须有证据支撑

宏观事件不是叙述者生成的一句话。它应该是一个有生命周期和证据的实体：

```text
event_id, type, phase, time_window, spatial_scope,
affected_population, participants, supporting_micro_actions,
triggering_conditions, causal_parents, severity, confidence,
world_state_diff
```

候选检测器可以结合群体/行为阈值、图变化、空间集中度、资源压力、信念或情感转变、自激过程以及硬规则。语义模型在检测器发现事件之后，才可以命名、总结和解释它。

反馈循环是研究的核心：

```text
local action → typed effect → exposure/propagation → aggregation
→ event lifecycle → validated world delta → differentiated observation
→ new NPC response
```

第一批基准测试族应包括信息冲击、资源冲击、制度冲击和灾难冲击。对每一种冲击，比较配对的反事实重放、机制消融、纯规则智能体、大模型智能体和混合智能体。

## 9. 叙事是只读投影

故事生成应消费历史，而不是在暗中书写历史：

```text
authoritative event log → event DAG → character-view subgraph
→ turning points/conflicts → outline → scenes or chapters
```

如果作者想强制一个情节点，请将其记录为显式的外部干预并分支模拟。这保持了涌现历史与人为干预之间的区分。

## 10. 工程顺序

在增加规模或风格复杂度之前，先构建最小的确定性核心：

1. `WorldState`、`AgentState`、`BeliefState`、`Observation`、`ActionIntent`、`TypedAction`、`Effect`、`Exposure`、`EventCandidate`、`MacroEvent` 和 `StateDiff` 的模式；
2. 权威世界状态、逻辑时钟、校验、原子提交、只追加日志、快照、重放和分支 ID；
3. 带种子、模型/提示词版本、场景版本、采样参数和代码提交号的实验配置；
4. 基于规则、随机、阈值和效用的基线；
5. 身份投影和信息权限测试；
6. NPC 运行时、记忆、关系、活动和日程适配器；把记忆拆成结构化写入、预算化检索和使用门控，并分别测量 over-use/under-use；最小主动策略应保留 `act / inspect / ask / wait`，且求助由已测准确率、反事实信息价值和成本触发，而不是模型自报置信度；持久身份/策略更新先进入 provisional state，经配对重放和保护场景后再升级；
7. 扩散、事件生命周期、反馈和因果重放；
8. 叙事渲染，最后才是大规模服务/追踪优化。

项目初期应瞄准可复现的 200–500 个智能体的切片。只有在同一事件可以被重放、解释和证伪之后，再扩展到数千个。

## 11. 评估清单

至少报告：

- 世界不变量、事务正确性、状态哈希和重放确定性；计划节点同时记录预期状态和前置条件，环境拒绝后重建剩余状态序列，而非同义改写动作；在每个 tick 做断言，并用故意删除必需能力的 mutant 验证 evaluator 确实会拒绝错误实现；
- 个体身份/目标一致性、知识边界违规，以及干预下的行为；persona 数据按用途授权，并用移除/屏蔽属性的配对重放检查隐性经济或行为 steering；
- 群体分布、方差、相关性、网络结构和时间动态；校准前先做参数可识别性与 prior-predictive reachability，再以未参与修复的统计做 held-out adequacy audit；
- 事件检测的精确率/召回率、提前量、生命周期、空间范围和反事实敏感性；
- 叙事因果性、能动性、约束内的惊喜感，以及对人类作者的实用性；
- 请求数、上下文长度、前缀复用、队列/预填充/解码/工具等待延迟，以及每个有效事件的成本。

记忆也需要行动型配对验证：[DolphinBench](../papers/2609.24971.md) 要求有相关历史时任务成功、删除后失败，并同时报告成本与延迟；这比直接询问记忆事实更接近跨 session 承诺测试。持久 artifact 则应逐 checkpoint 报告 acquire、retain、adapt 和 selection gap，而不是只看演化终点。

不要依赖单一的大模型评判，也不要用 gold-history next-turn 指标替代自主轨迹：局部文本、局部动作、环境执行和完整 episode 成功应分别报告。使用独立的结构化指标；对于叙事实用性，采用作家或领域专家的盲评。[ERPBench](../papers/2609.17885.md) 的 live database 评分显示保存表单不等于写入正确状态；[MIRAGE](../papers/2609.19059.md) 同样显示回答正确不等于真实使用历史证据。因此 outcome、authority state 与 provenance 必须分开。审计还应记录 principal、model/tool substrate 与 evidence 三类独立性，避免同源 auditor 形成自证闭环。

## 12. 研究与系统轨迹

模拟可以成为一种独特的推理工作负载，但前提是轨迹保留因果上下文。记录 `simulation_id`、`branch_id`、逻辑 tick、智能体、事件、依赖父节点、模型、共享前缀标识、输入/输出 token 数、队列/预填充/解码/工具等待时间、缓存复用、优先级和提交时间。科学运行固定使用单一模型/配置；把模型路由和服务优化作为独立的系统实验来研究。[Emergence World](../papers/2609.17320.md) 与 [Collective Loss of Control](../papers/2609.18460.md) 表明持续系统还要记录信息进入记忆、跨代理/跨运行传播、检测、遏制和延迟行动；单轮安全判定不能代表系统级韧性。恢复操作则应像 [Rollback-Induced Reflection](../papers/2609.18304.md) 那样分开记录环境回滚和跨分支保留的知识，并为后者保存来源 lineage。
