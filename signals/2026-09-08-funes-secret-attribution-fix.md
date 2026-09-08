# Funes 修复记忆上传前秘密扫描的归属错误

- **来源类型（Source type）：** official code release / security fix
- **作者或组织：** Hugging Face（David Corvoysier / `dacorvo`）
- **发布于（Published on）：** 2026-09-08（GitHub Atom 更新时间；补丁 author date 为 2026-09-07）
- **观察日期（Observed on）：** 2026-09-08
- **规范链接（Canonical URL）：** https://github.com/huggingface/funes/commit/3b2eb2fe844bda795e99f75579a341300eee152f
- **相关论文/项目：** [Funes](https://github.com/huggingface/funes)；[原信号笔记](2026-09-07-funes-local-agent-memory.md)；[后续精简提交](https://github.com/huggingface/funes/commit/e5d154a568fc8f1425d1516c6c0e1f3e0bc69fc5)
- **相关性（Relevance）：** `core`
- **置信度（Confidence）：** `high`

## 观察到的内容

Funes 修复了向远端推送记忆前的秘密扫描归属错误：旧实现把多段文本拼成一个文件，并按 TruffleHog 对解码后内容报告的行号判断秘密属于哪段文本。对 base64 或转义换行等内容，行号可能偏移，导致索引停止，或更严重地扣留干净块而上传含秘密的块。新实现为每段文本建立独立临时文件，直接按扫描器返回的文件名归属发现项，并对未知文件保持 fail-closed。

## 证据与佐证

公开提交包含问题说明、Rust 实现变更和相应测试；提交 `e5d154a` 随后删除了已不再使用、可能被未来调用方误信的行号字段。证据能够确认缺陷与修复进入公开主分支，但这里没有独立安全审计或受影响版本范围，因此不推断实际泄露事件。

## 为什么重要

持久代理记忆会把会话内容跨边界保存或上传。这个缺陷说明“安装了秘密扫描器”并不足够：扫描结果必须可靠映射到原始记忆单元，否则安全门可能放行错误对象。文本社会模拟若保存私有信念、凭据或工具输出，也需要对象级来源与 fail-closed 语义。

## 后续跟进

锁定包含该修复的首个发布版本；运行仓库测试，并增加 base64、转义换行、多块混排和未知文件名回归用例。审计 push 路径的其余转换是否仍会破坏扫描结果与原始记忆块的一一对应。
