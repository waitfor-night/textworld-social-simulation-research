# EnvCraft：为 Agentic RL 合成可执行环境

- **来源类型（Source type）：** official preprint
- **作者或组织：** Yirong Zeng、Shen You、Jinhang Feng、Yufei Liu、Xiao Ding、Yutai Hou、Hao Cong、Yuxian Wang、Wu Ning、Wang Xu、Bibo Cai
- **发布于（Published on）：** 2026-09-09 (arXiv v1)
- **观察日期（Observed on）：** 2026-09-09
- **规范链接（Canonical URL）：** https://arxiv.org/abs/2609.05576
- **相关论文/项目：** EnvCraft
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `medium`

## 观察到的内容

EnvCraft 以沙箱隔离工作区和拓扑感知数据生成器合成 139 个可执行环境、约 20,000 个复杂任务，目标是为长程 Claw-like agent 提供训练环境。作者在 Qwen3/3.5 8B–32B 上报告 Claw 类基准最高提升 11.9%、一般工具使用基准提升 8.0%，同时降低推理 token 成本。

## 证据与佐证

arXiv 摘要公开环境数量、任务规模和模型范围；论文与代码可运行性、环境质量和跨任务泛化仍待固定版本复查，当前无独立复现。

## 为什么重要

它把环境合成从静态工具端点推进到有状态工作区和连贯轨迹，接近文本世界所需的状态、动作、反馈和恢复协议。对社会模拟而言，关键问题仍是能否表达角色关系、私有信息和制度后果。

## 后续跟进

获取环境生成器与任务 revision，检查状态权威性、终止条件、随机种子和验证器；再评估加入多角色、社会规范和可逆副作用后的训练收益。
