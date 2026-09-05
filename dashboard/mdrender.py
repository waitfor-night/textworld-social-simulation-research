"""极简 Markdown 渲染器：无第三方依赖时作为 python-markdown 的回退。

覆盖本仓库用到的语法：标题、表格、列表、引用、代码块、分隔线、
行内代码/加粗/斜体/链接。
"""
import html
import re

_INLINE_PATTERNS = [
    (re.compile(r"`([^`]+)`"), r"<code>\1</code>"),
    (re.compile(r"\*\*([^*]+)\*\*"), r"<strong>\1</strong>"),
    (re.compile(r"\*([^*]+)\*"), r"<em>\1</em>"),
    (re.compile(r"\[([^\]]+)\]\(([^)]+)\)"), r'<a href="\2">\1</a>'),
]


def _inline(text):
    text = html.escape(text, quote=False)
    for pat, rep in _INLINE_PATTERNS:
        text = pat.sub(rep, text)
    return text


def _table(rows):
    def cells(r):
        r = r.strip()
        if r.startswith("|"):
            r = r[1:]
        if r.endswith("|"):
            r = r[:-1]
        return [c.strip() for c in r.split("|")]

    header = cells(rows[0])
    out = ["<table>", "<thead><tr>"]
    out += [f"<th>{_inline(c)}</th>" for c in header]
    out.append("</tr></thead><tbody>")
    for r in rows[2:]:
        if r.strip().startswith("|"):
            out.append("<tr>" + "".join(
                f"<td>{_inline(c)}</td>" for c in cells(r)) + "</tr>")
    out.append("</tbody></table>")
    return "".join(out)


def _list(lines, i, ordered):
    tag = "ol" if ordered else "ul"
    items = []
    while i < len(lines):
        s = lines[i].strip()
        m = (re.match(r"^\d+\.\s+(.*)$", s) if ordered
             else re.match(r"^[-*+]\s+(.*)$", s))
        if not m:
            break
        i += 1
        cont = []
        while i < len(lines):
            cur = lines[i]
            if cur.strip() == "":
                i += 1
                continue
            if (cur.startswith("  ") and not re.match(r"^\s*[-*+]\s+", cur)
                    and not re.match(r"^\s*\d+\.\s+", cur)):
                cont.append(cur.strip())
                i += 1
            else:
                break
        item = _inline(m.group(1))
        if cont:
            item += "<br>" + "<br>".join(_inline(c) for c in cont)
        items.append(f"<li>{item}</li>")
    return f"<{tag}>" + "".join(items) + f"</{tag}>", i


def render(text):
    lines = text.split("\n")
    out = []
    i = 0
    n = len(lines)
    while i < n:
        s = lines[i].strip()

        if s.startswith("```"):
            buf = []
            i += 1
            while i < n and not lines[i].strip().startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1
            out.append("<pre><code>" + html.escape("\n".join(buf))
                       + "</code></pre>")
            continue

        if s.startswith("#"):
            level = len(s) - len(s.lstrip("#"))
            out.append(f"<h{level}>{_inline(s[level:].strip())}</h{level}>")
            i += 1
            continue

        if (re.match(r"^\|.*\|$", s) and i + 1 < n
                and re.match(r"^\|?[\s:|-]+\|?$", lines[i + 1].strip())):
            rows = []
            while i < n and lines[i].strip().startswith("|"):
                rows.append(lines[i])
                i += 1
            out.append(_table(rows))
            continue

        if re.match(r"^[-*+]\s+", s):
            block, i = _list(lines, i, ordered=False)
            out.append(block)
            continue
        if re.match(r"^\d+\.\s+", s):
            block, i = _list(lines, i, ordered=True)
            out.append(block)
            continue

        if s.startswith(">"):
            buf = []
            while i < n and lines[i].strip().startswith(">"):
                buf.append(lines[i].strip().lstrip(">").strip())
                i += 1
            out.append("<blockquote>" + "<br>".join(
                _inline(b) for b in buf) + "</blockquote>")
            continue

        if re.match(r"^([-*_])\1{2,}$", s):
            out.append("<hr>")
            i += 1
            continue

        if s == "":
            i += 1
            continue

        buf = []
        while i < n:
            cur = lines[i].strip()
            if cur == "" or cur.startswith(("#", "```", ">", "|")) \
                    or re.match(r"^[-*+]\s+", cur) \
                    or re.match(r"^\d+\.\s+", cur):
                break
            buf.append(cur)
            i += 1
        out.append("<p>" + _inline(" ".join(buf)) + "</p>")

    return "\n".join(out)
