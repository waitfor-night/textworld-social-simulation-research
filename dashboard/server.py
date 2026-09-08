#!/usr/bin/env python3
"""研究看板本地服务器（仅用 Python 标准库）。

用法:
    python3 dashboard/server.py [端口]     # 默认 8000，自动打开浏览器
"""
import csv
import json
import os
import re
import sys
import threading
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DASH = os.path.dirname(os.path.abspath(__file__))

try:
    import markdown as _md
    RENDERER = "python-markdown"

    def render_md(text: str) -> str:
        return _md.markdown(text, extensions=["tables", "fenced_code"])

except ImportError:
    from mdrender import render as render_md
    RENDERER = "内置迷你渲染器"

KINDS = {"papers", "signals", "digests", "docs"}
NAME_RE = re.compile(r"^[\w.\-]+$")
BOOKMARKS_FILE = os.path.join(DASH, "bookmarks.json")
MARK_PURPOSES = {"reproduce", "cite", "feature", "track"}
MARK_PRIORITIES = {"important", "secondary", "undecided"}

_cache = {}
_lock = threading.Lock()
_bookmarks_lock = threading.Lock()


def read_text(path):
    with _lock:
        hit = _cache.get(path)
        try:
            mtime = os.path.getmtime(path)
        except OSError:
            return None
        if hit and hit[0] == mtime:
            return hit[1]
        try:
            with open(path, encoding="utf-8") as f:
                text = f.read()
        except OSError:
            return None
        _cache[path] = (mtime, text)
        return text


def load_papers():
    rows = []
    with open(os.path.join(ROOT, "papers", "index.csv"), encoding="utf-8") as f:
        for row in csv.DictReader(f):
            row["tags"] = [t for t in (row.get("tags") or "").split(";") if t]
            rows.append(row)
    return rows


def takeaway(text):
    m = re.search(r"##\s*一句话要点\s*\n+(.+?)(?=\n\s*\n|\n##|\Z)", text, re.S)
    if not m:
        return ""
    t = m.group(1).strip()
    return t if len(t) <= 240 else t[:240].rstrip() + "…"


def signal_meta(text):
    def grab(label):
        m = re.search(r"\*\*[^*]*" + label + r"[^*]*\*\*\s*(.+)", text)
        if not m:
            return ""
        v = m.group(1).strip()
        v = re.sub(r"`([^`]+)`", r"\1", v)
        v = v.rstrip("。")
        return v.split(" / ")[0].strip()

    return {
        "relevance": grab("相关性"),
        "confidence": grab("置信度"),
        "source_type": grab("来源类型"),
    }


def load_bookmarks():
    try:
        with open(BOOKMARKS_FILE, encoding="utf-8") as f:
            raw = json.load(f)
    except (OSError, ValueError):
        raw = {}
    result = {"papers": {}, "signals": {}}
    for kind in result:
        entries = raw.get(kind, {})
        # 兼容旧版仅保存名称数组的格式。
        if isinstance(entries, list):
            entries = {name: {"purposes": ["track"], "priority": "undecided"}
                       for name in entries}
        if not isinstance(entries, dict):
            continue
        for name, mark in entries.items():
            if not isinstance(name, str) or not NAME_RE.fullmatch(name) or not isinstance(mark, dict):
                continue
            raw_purposes = mark.get("purposes", [])
            purposes = sorted(set(raw_purposes) & MARK_PURPOSES) if isinstance(raw_purposes, list) else []
            priority = mark.get("priority", "")
            if purposes or priority in MARK_PRIORITIES:
                result[kind][name] = {
                    "purposes": purposes,
                    "priority": priority if priority in MARK_PRIORITIES else "",
                }
    return result


def save_bookmark(kind, name, mark):
    if kind not in ("papers", "signals") or not NAME_RE.fullmatch(name) or not isinstance(mark, dict):
        return None
    if not os.path.isfile(os.path.join(ROOT, kind, name + ".md")):
        return None
    raw_purposes = mark.get("purposes", [])
    if not isinstance(raw_purposes, list) or any(not isinstance(x, str) for x in raw_purposes):
        return None
    purposes = sorted(set(raw_purposes) & MARK_PURPOSES)
    priority = mark.get("priority", "")
    if priority not in MARK_PRIORITIES:
        priority = ""
    with _bookmarks_lock:
        data = load_bookmarks()
        if purposes or priority:
            data[kind][name] = {"purposes": purposes, "priority": priority}
        else:
            data[kind].pop(name, None)
        tmp = BOOKMARKS_FILE + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        os.replace(tmp, BOOKMARKS_FILE)
        return data


def count_md(kind):
    d = os.path.join(ROOT, kind)
    return sum(
        1
        for fn in os.listdir(d)
        if fn.endswith(".md") and fn != "README.md"
    )


def list_notes(kind):
    out = []
    d = os.path.join(ROOT, kind)
    for fn in sorted(os.listdir(d), reverse=True):
        if not fn.endswith(".md") or fn == "README.md":
            continue
        text = read_text(os.path.join(d, fn)) or ""
        m = re.search(r"^#\s+(.+)$", text, re.M)
        title = m.group(1).strip() if m else fn
        date = fn[:10] if re.match(r"\d{4}-\d{2}-\d{2}", fn) else ""
        item = {"name": fn[:-3], "title": title, "date": date}
        if kind == "signals":
            item.update(signal_meta(text))
        out.append(item)
    return out


def do_search(q):
    ql = q.lower()
    results = []
    for kind in ("papers", "signals", "digests", "docs"):
        d = os.path.join(ROOT, kind)
        for fn in sorted(os.listdir(d)):
            if not fn.endswith(".md") or fn == "README.md":
                continue
            text = read_text(os.path.join(d, fn)) or ""
            if not text:
                continue
            title_m = re.search(r"^#\s+(.+)$", text, re.M)
            title = title_m.group(1).strip() if title_m else fn
            name = fn[:-3]
            if ql in title.lower():
                results.append({"kind": kind, "name": name, "title": title,
                                "snippet": "", "in_title": True})
                continue
            idx = text.lower().find(ql)
            if idx >= 0:
                s = max(0, idx - 40)
                e = min(len(text), idx + len(q) + 60)
                snippet = text[s:e].replace("\n", " ").strip()
                if s > 0:
                    snippet = "…" + snippet
                if e < len(text):
                    snippet = snippet + "…"
                results.append({"kind": kind, "name": name, "title": title,
                                "snippet": snippet, "in_title": False})
    results.sort(key=lambda r: (not r["in_title"], r["title"]))
    return results[:30]


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass

    def _send(self, code, body, ctype="application/json; charset=utf-8"):
        data = body.encode("utf-8") if isinstance(body, str) else body
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def _send_file(self, path):
        data = read_text(path)
        if data is None:
            self._send(404, json.dumps({"error": "not found"}))
            return
        ext = os.path.splitext(path)[1]
        ctype = {
            ".html": "text/html; charset=utf-8",
            ".js": "text/javascript; charset=utf-8",
            ".css": "text/css; charset=utf-8",
        }.get(ext, "application/octet-stream")
        self._send(200, data, ctype)

    def do_GET(self):
        u = urlparse(self.path)
        path = unquote(u.path)
        if path == "/":
            return self._send_file(os.path.join(DASH, "index.html"))
        if path.startswith("/api/"):
            return self._api(path, u.query)
        safe = os.path.basename(path)
        if safe in ("app.js", "style.css") and safe == path[1:]:
            return self._send_file(os.path.join(DASH, safe))
        self._send(404, json.dumps({"error": "not found"}))

    def _api(self, path, query):
        qs = {}
        for p in query.split("&"):
            if "=" in p:
                k, v = p.split("=", 1)
                qs[k] = unquote(v)

        if path == "/api/meta":
            papers = load_papers()
            areas = {}
            for p in papers:
                a = p.get("primary_area") or "?"
                areas[a] = areas.get(a, 0) + 1
            return self._send(200, json.dumps({
                "papers": len(papers),
                "signals": count_md("signals"),
                "digests": count_md("digests"),
                "docs": count_md("docs"),
                "areas": areas,
                "latest_observed": max(
                    (p.get("observed_on") or "" for p in papers), default=""
                ),
            }, ensure_ascii=False))

        if path == "/api/bookmarks":
            return self._send(200, json.dumps(load_bookmarks(), ensure_ascii=False))

        if path == "/api/papers":
            papers = load_papers()
            for p in papers:
                nf = p.get("note_file")
                t = read_text(os.path.join(ROOT, "papers", nf)) if nf else None
                p["takeaway"] = takeaway(t) if t else ""
            return self._send(200, json.dumps(papers, ensure_ascii=False))

        if path == "/api/signals":
            return self._send(200, json.dumps(list_notes("signals"), ensure_ascii=False))

        if path == "/api/digests":
            return self._send(200, json.dumps(list_notes("digests"), ensure_ascii=False))

        if path == "/api/docs":
            return self._send(200, json.dumps(list_notes("docs"), ensure_ascii=False))

        if path.startswith("/api/notes/"):
            parts = path[len("/api/notes/"):].split("/", 1)
            if len(parts) == 2:
                return self._note(parts[0], parts[1])

        if path == "/api/search":
            q = qs.get("q", "").strip()
            if not q:
                return self._send(200, "[]")
            return self._send(200, json.dumps(do_search(q), ensure_ascii=False))

        self._send(404, json.dumps({"error": "unknown endpoint"}))

    def do_POST(self):
        if urlparse(self.path).path != "/api/bookmarks":
            return self._send(404, json.dumps({"error": "unknown endpoint"}))
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if size > 4096:
                raise ValueError
            body = json.loads(self.rfile.read(size))
            data = save_bookmark(body.get("kind"), body.get("name"), body.get("mark"))
            if data is None:
                raise ValueError
        except (ValueError, TypeError, json.JSONDecodeError):
            return self._send(400, json.dumps({"error": "invalid bookmark"}))
        return self._send(200, json.dumps(data, ensure_ascii=False))

    def _note(self, kind, name):
        if kind not in KINDS or not NAME_RE.fullmatch(name):
            return self._send(404, json.dumps({"error": "invalid name"}))
        base = os.path.realpath(os.path.join(ROOT, kind))
        fpath = os.path.realpath(os.path.join(base, name + ".md"))
        if not fpath.startswith(base + os.sep):
            return self._send(403, json.dumps({"error": "forbidden"}))
        text = read_text(fpath)
        if text is None:
            return self._send(404, json.dumps({"error": "note not found"}))
        return self._send(200, render_md(text), "text/html; charset=utf-8")


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    venv_dir = os.path.join(DASH, ".venv")
    venv_py = os.path.join(venv_dir, "bin", "python")
    if RENDERER == "内置迷你渲染器" and os.path.exists(venv_py) \
            and not sys.prefix.startswith(venv_dir + os.sep):
        os.execv(venv_py, [venv_py, os.path.abspath(__file__)] + sys.argv[1:])
    srv = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    url = f"http://localhost:{port}"
    print(f"研究看板已启动：{url}  （Ctrl+C 退出）", flush=True)
    print(f"Markdown 渲染器：{RENDERER}", flush=True)
    threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\n已退出。")


if __name__ == "__main__":
    main()
