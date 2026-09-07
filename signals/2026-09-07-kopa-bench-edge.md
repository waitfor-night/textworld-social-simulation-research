# KOPA-Bench/EDGE：韩国公共 API 多步工具调用基准

- **来源类型：** 官方论文/项目页
- **作者或组织：** Dain Kim、Eungi Cho、Kyumin Kim、Shinyeong Noh、Kyuseong Lim
- **发布于：** 2026-09-04（arXiv v1）
- **观察日期：** 2026-09-07
- **规范链接：** https://arxiv.org/abs/2609.05395
- **相关论文/项目：** [EDGE-KOPA 仓库](https://github.com/dneirfi/EDGE-KOPA)；[arXiv HTML 全文](https://arxiv.org/html/2609.05395v1)
- **相关性：** `core`
- **置信度：** `medium`

## 观察到的内容

KOPA-Bench 包含 145 个真实公共事务任务，覆盖 2,318 个实时工具和六个领域；EDGE 通过实际调用 API 过滤工具依赖，再按输出基数合成可执行的多步轨迹。论文报告 GRPO 微调后的 9B 模型在 KOPA-Bench 和 BFCL 上接近同系列未调优 27B 模型。

## 证据与佐证

论文正文链接了 [EDGE-KOPA](https://github.com/dneirfi/EDGE-KOPA)。仓库 README 给出 145/2,318/六领域及 1,781 条轨迹、Qwen3.5-9B pass@1 由 0.3275 到 0.4310 的数字，但同时明确代码、基准和 checkpoint 尚未公开，当前仓库只是占位符；实时 API 的可用性和漂移也是限制。

## 为什么重要

它将“环境中工具依赖是否真的可执行”作为数据生成约束，而不是只靠 schema 或语言模型臆测，适合索引多步规划、工具组合和环境反馈对代理行为的影响。

## 后续跟进

等待正式发布并锁定 API 快照、任务许可和评测脚本；复现实验时分开报告 RESPONSE、ENVIRONMENT、ACTION 三个维度，并测试冻结 API 或非韩国公共 API 的外推。
