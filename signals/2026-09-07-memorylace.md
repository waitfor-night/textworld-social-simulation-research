# MemoryLACE：生命周期感知的记忆合并与证据检索

- **来源类型：** 官方论文/预印本
- **作者或组织：** Meriem Yacoubi、Pia Schmidt、Nenad Petrovic、Ahmed Frikha、Martin Kirchhoff、Alois Knoll
- **发布于：** 2026-09-02（arXiv v1）
- **观察日期：** 2026-09-07
- **规范链接：** https://arxiv.org/abs/2609.03201
- **相关论文/项目：** [arXiv HTML 全文](https://arxiv.org/html/2609.03201v1)；BEAM、StructMemEval
- **相关性：** `core`
- **置信度：** `medium`

## 观察到的内容

MemoryLACE（MemLACE）以稀疏的 merge、supersession 和 contradiction 关系显式表示文本证据生命周期，同时保留原子记忆和 provenance；检索时重建当前、历史、支持和冲突证据单元。作者在 BEAM 与 StructMemEval 上报告同 backbone 下的最高总体表现，并称 BEAM 端到端运行时间较 Hindsight 降低 66.6%。

## 证据与佐证

arXiv 摘要和 HTML 全文公开了架构、基准与消融设计；目前未看到作者代码/数据仓库。性能是预印本自报结果，且需确认不同 backbone、检索预算和 Hindsight 版本是否完全可比。

## 为什么重要

社会世界中的事实会更新、互相矛盾并带有时间与来源；局部生命周期关系能让代理保留历史而不把过期事实与当前状态混在一起，为角色记忆和叙事连续性提供轻量结构。

## 后续跟进

复现 BEAM/StructMemEval 并检查关系抽取错误；再构造含角色信念冲突、撤回和时间跳转的文本世界，测量证据链完整性、回答校准和 token/延迟成本。
