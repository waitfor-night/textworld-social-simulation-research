/* 研究看板前端逻辑（无框架、无外部依赖） */
"use strict";

const AREAS = {
  TWM: ["文本世界模型", "#6366f1"],
  ENV: ["文本环境", "#0ea5e9"],
  SIM: ["社会模拟", "#f59e0b"],
  MAS: ["多智能体系统", "#10b981"],
  RPL: ["角色扮演与人格", "#ec4899"],
  AGT: ["智能体架构", "#8b5cf6"],
  EVAL: ["评估", "#14b8a6"],
  DATA: ["数据与轨迹", "#64748b"],
  SAFE: ["安全与有效性", "#ef4444"],
};
const RELEVANCE = {
  core: "核心", adjacent: "相邻", background: "背景", signal: "信号",
};
const CONFIDENCE = { high: "高", medium: "中", low: "低" };
const TAGMAP = {
  planning: "规划", memory: "记忆", retrieval: "检索", reflection: "反思",
  "tool-use": "工具使用", "self-play": "自我博弈", "self-consistency": "自一致性",
  grounding: "依据事实", "long-horizon": "长程", embodiment: "具身",
  "interactive-fiction": "互动小说", games: "游戏", economics: "经济学",
  institutions: "制度", norms: "规范", culture: "文化",
  "theory-of-mind": "心智理论", emotion: "情感", identity: "身份",
  alignment: "对齐", benchmark: "基准测试", "human-eval": "人工评估",
  "llm-as-judge": "大模型评判", reproducibility: "可复现性", "open-source": "开源",
  trajectories: "轨迹", "world-model": "世界模型",
  "executable-environment": "可执行环境", "state-grounding": "状态依据",
  npc: "NPC", "game-engine": "游戏引擎", "closed-loop": "闭环",
  "opinion-dynamics": "意见动态", "social-influence": "社会影响",
  "multi-agent": "多智能体", personas: "人格", "persona-consistency": "人格一致性",
  dialogue: "对话", debate: "辩论", trust: "信任", privacy: "隐私",
};
const KINDS = {
  papers: { label: "论文", route: "paper" },
  signals: { label: "信号", route: "signal" },
  digests: { label: "研究摘要", route: "digest" },
  docs: { label: "文档", route: "doc" },
};

const $ = (sel) => document.querySelector(sel);
const content = $("#content");

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

async function api(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`请求失败：${path} (${res.status})`);
  return res.json();
}

async function apiNote(kind, name) {
  const res = await fetch(`/api/notes/${kind}/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error(`笔记不存在：${name}`);
  return res.text();
}

function highlight(text, q) {
  if (!q) return esc(text);
  const lower = text.toLowerCase();
  const ql = q.toLowerCase();
  let out = "", pos = 0;
  for (;;) {
    const idx = lower.indexOf(ql, pos);
    if (idx < 0) { out += esc(text.slice(pos)); break; }
    out += esc(text.slice(pos, idx));
    out += `<mark>${esc(text.slice(idx, idx + q.length))}</mark>`;
    pos = idx + q.length;
  }
  return out;
}

/* ---------- 主题 ---------- */
function initTheme() {
  const saved = localStorage.getItem("theme");
  const dark = saved === "dark"
    || (!saved && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}
$("#theme").addEventListener("click", () => {
  const cur = document.documentElement.dataset.theme;
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
});

/* ---------- 渲染辅助 ---------- */
function badge(text, color) {
  return `<span class="badge" style="--c:${color}">${esc(text)}</span>`;
}
function areaBadge(id) {
  const a = AREAS[id];
  return a ? badge(a[0], a[1]) : badge(id || "?", "#94a3b8");
}
function relBadge(v) {
  const map = { core: ["#4f46e5", RELEVANCE.core], adjacent: ["#64748b", RELEVANCE.adjacent],
    background: ["#94a3b8", RELEVANCE.background], signal: ["#d97706", RELEVANCE.signal] };
  const c = map[v] || ["#94a3b8", v];
  return badge(c[1], c[0]);
}
function confBadge(v) {
  const map = { high: ["#10b981", "高"], medium: ["#f59e0b", "中"], low: ["#ef4444", "低"] };
  const c = map[v] || ["#94a3b8", v || "?"];
  return badge(c[1], c[0]);
}
function tagText(t) { return TAGMAP[t] || t; }

function backLink(kind, listHash, label) {
  return `<div class="back"><a href="${listHash}">← 返回${label}列表</a></div>`;
}

function renderArticle(html) {
  const art = document.createElement("article");
  art.className = "note";
  art.innerHTML = html;
  art.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    const m = href.match(/(?:\.\.\/|\/)(papers|signals|digests|docs)\/([\w.\-]+)\.md/i);
    if (m) {
      e.preventDefault();
      location.hash = `#/${KINDS[m[1]].route}/${m[2]}`;
    } else if (/^https?:/i.test(href)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
  });
  return art;
}

async function orderedNames(kind) {
  if (kind === "papers") {
    if (!papersCache) papersCache = await api("/api/papers");
    return papersCache.slice()
      .sort((a, b) => (b.observed_on || "").localeCompare(a.observed_on || ""))
      .map((p) => ({ name: p.id, title: p.title }));
  }
  return getList(kind);
}

function noteNavHTML(kind, prev, next) {
  const btn = (item, dir) => item
    ? `<a class="pnav" href="#/${KINDS[kind].route}/${esc(item.name)}">
         <span class="pnav-dir">${dir}</span>
         <span class="pnav-title">${esc(item.title)}</span>
       </a>`
    : `<span class="pnav disabled"><span class="pnav-dir">${dir}</span></span>`;
  return `<div class="note-nav">${btn(prev, "← 上一条")}${btn(next, "下一条 →")}</div>`;
}

async function viewNote(kind, name) {
  setNav(kind);
  window.scrollTo(0, 0);
  try {
    const html = await apiNote(kind, name);
    let nav = "";
    if (kind !== "docs") {
      const items = await orderedNames(kind);
      const idx = items.findIndex((x) => x.name === name);
      if (idx >= 0) {
        nav = noteNavHTML(kind,
          idx > 0 ? items[idx - 1] : null,
          idx < items.length - 1 ? items[idx + 1] : null);
      }
    }
    content.innerHTML = backLink(kind, `#/${kind}`, KINDS[kind].label) + nav;
    content.appendChild(renderArticle(html));
    if (nav) {
      content.insertAdjacentHTML("beforeend",
        `<div class="note-nav-bottom">${nav}</div>`);
    }
  } catch (err) {
    content.innerHTML = `<div class="error">${esc(err.message)}</div>`;
  }
}

/* ---------- 总览 ---------- */
async function viewOverview() {
  setNav("overview");
  const meta = await api("/api/meta");
  const total = meta.papers + meta.signals + meta.digests + meta.docs;
  const areaEntries = Object.entries(meta.areas).sort((a, b) => b[1] - a[1]);
  const maxArea = Math.max(1, ...areaEntries.map(([, n]) => n));
  content.innerHTML = `
    <h1>总览</h1>
    <p class="lead">文本世界模型、社会模拟与角色扮演智能体的研究索引。
    数据实时读取自仓库目录，修改 Markdown 后刷新页面即可看到变化。</p>
    <div class="stats">
      <div class="stat"><div class="num">${meta.papers}</div><div class="lbl">论文记录</div></div>
      <div class="stat"><div class="num">${meta.signals}</div><div class="lbl">网络信号</div></div>
      <div class="stat"><div class="num">${meta.digests}</div><div class="lbl">研究摘要</div></div>
      <div class="stat"><div class="num">${meta.docs}</div><div class="lbl">文档</div></div>
    </div>
    <section class="panel">
      <h2>论文按主领域分布</h2>
      ${areaEntries.map(([id, n]) => `
        <div class="bar-row">
          <span class="bar-label">${areaBadge(id)}</span>
          <div class="bar"><div class="bar-fill" style="width:${(n / maxArea * 100).toFixed(1)}%;background:${AREAS[id] ? AREAS[id][1] : "#94a3b8"}"></div></div>
          <span class="bar-num">${n}</span>
        </div>`).join("")}
      <p class="muted">最近观察日期：${esc(meta.latest_observed)}</p>
    </section>
    <section class="panel">
      <h2>快速入口</h2>
      <div class="quick">
        <a href="#/digests"><strong>研究摘要</strong><span>按日期的趋势总结与下一步行动</span></a>
        <a href="#/docs"><strong>文档</strong><span>设计综合、工作流、来源政策</span></a>
        <a href="#/papers"><strong>论文</strong><span>结构化论文记录与索引</span></a>
        <a href="#/signals"><strong>信号</strong><span>新闻、公告与早期线索</span></a>
      </div>
    </section>`;
}

/* ---------- 论文 ---------- */
let papersCache = null;
let paperPage = 1;

async function viewPapers() {
  setNav("papers");
  if (!papersCache) papersCache = await api("/api/papers");
  const papers = papersCache.slice().sort((a, b) =>
    (b.observed_on || "").localeCompare(a.observed_on || ""));
  const areas = [...new Set(papers.map((p) => p.primary_area || "?"))].sort();

  content.innerHTML = `
    <h1>论文 <span class="muted">(${papers.length})</span></h1>
    <div class="filters">
      <select id="f-area"><option value="">全部领域</option>
        ${areas.map((a) => `<option value="${esc(a)}">${esc(AREAS[a] ? AREAS[a][0] : a)}</option>`).join("")}
      </select>
      <select id="f-rel"><option value="">全部相关性</option>
        ${Object.entries(RELEVANCE).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}
      </select>
      <input id="f-text" type="search" placeholder="按标题 / 作者 / 标签过滤…">
    </div>
    <div id="paper-table"></div>
    <div id="pager"></div>`;

  const filtered = () => {
    const area = $("#f-area").value;
    const rel = $("#f-rel").value;
    const q = $("#f-text").value.trim().toLowerCase();
    return papers.filter((p) =>
      (!area || p.primary_area === area)
      && (!rel || p.relevance === rel)
      && (!q || (p.title + " " + p.first_author + " " + p.tags.join(" "))
        .toLowerCase().includes(q)));
  };

  const tableHTML = (rows) => rows.length ? `
    <table class="paper-table">
      <thead><tr>
        <th>标题</th><th>第一作者</th><th>年份</th><th>主领域</th>
        <th>相关性</th><th>置信度</th><th>观察日期</th>
      </tr></thead>
      <tbody>
        ${rows.map((p) => `
          <tr class="clickable" data-href="#/paper/${esc(p.id)}">
            <td class="title-cell">
              <div class="t">${esc(p.title)}</div>
              ${p.takeaway ? `<div class="subtle">${esc(p.takeaway)}</div>` : ""}
            </td>
            <td>${esc(p.first_author)}</td>
            <td>${esc(p.year)}</td>
            <td>${areaBadge(p.primary_area)}</td>
            <td>${relBadge(p.relevance)}</td>
            <td>${confBadge(p.confidence)}</td>
            <td class="nowrap">${esc(p.observed_on)}</td>
          </tr>`).join("")}
      </tbody>
    </table>` : `<p class="muted">没有符合过滤条件的论文。</p>`;

  const render = () => {
    const rows = filtered();
    const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    if (paperPage > totalPages) paperPage = totalPages;
    const pageRows = rows.slice((paperPage - 1) * PAGE_SIZE, paperPage * PAGE_SIZE);
    $("#paper-table").innerHTML = tableHTML(pageRows);
    $("#pager").innerHTML = pagerHTML(paperPage, totalPages, rows.length);
  };

  ["#f-area", "#f-rel", "#f-text"].forEach((s) =>
    $(s).addEventListener("input", () => { paperPage = 1; render(); }));
  bindPager((p) => { paperPage = p; render(); scrollToListTop(); });
  $("#paper-table").addEventListener("click", (e) => {
    const tr = e.target.closest("tr[data-href]");
    if (tr) location.hash = tr.dataset.href;
  });
  render();
}

/* ---------- 分页 ---------- */
const PAGE_SIZE = 10;
const listCache = {};
const listPage = {};

function pagerHTML(page, totalPages, total) {
  if (totalPages <= 1) {
    return `<div class="pager"><span class="muted">共 ${total} 条</span></div>`;
  }
  const btn = (label, p, disabled, cls) =>
    `<button type="button" class="page-btn ${cls || ""}" data-page="${p}"${disabled ? " disabled" : ""}>${label}</button>`;
  let nums = "";
  for (let i = 1; i <= totalPages; i++) {
    nums += btn(String(i), i, false, i === page ? "current" : "");
  }
  return `<div class="pager">
    <span class="muted">第 ${page} / ${totalPages} 页 · 共 ${total} 条</span>
    ${btn("‹ 上一页", page - 1, page <= 1)}
    ${nums}
    ${btn("下一页 ›", page + 1, page >= totalPages)}
  </div>`;
}

function bindPager(onGo) {
  const pager = $("#pager");
  if (!pager) return;
  pager.addEventListener("click", (e) => {
    const b = e.target.closest(".page-btn");
    if (b && !b.disabled) onGo(parseInt(b.dataset.page, 10));
  });
}

function scrollToListTop() {
  const el = document.querySelector("#content .filters, #content h1");
  const top = el
    ? el.getBoundingClientRect().top + window.scrollY - 64
    : 0;
  window.scrollTo({ top, behavior: "smooth" });
}

async function getList(kind) {
  if (!listCache[kind]) listCache[kind] = await api(`/api/${kind}`);
  return listCache[kind];
}

/* ---------- 信号 / 摘要 / 文档列表 ---------- */
async function viewList(kind) {
  setNav(kind);
  const items = await getList(kind);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const page = Math.min(listPage[kind] || 1, totalPages);
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  content.innerHTML = `
    <h1>${KINDS[kind].label} <span class="muted">(${items.length})</span></h1>
    <div class="card-list">
      ${pageItems.map((it) => {
        const extra = kind === "signals" ? `
          <div class="card-meta">
            ${esc(it.date)} ·
            ${relBadge(it.relevance || "signal")}
            ${it.confidence ? confBadge(it.confidence) : ""}
            ${it.source_type ? `<span class="muted">${esc(it.source_type)}</span>` : ""}
          </div>` : `<div class="card-meta muted">${esc(it.date)}</div>`;
        return `
        <a class="card" href="#/${KINDS[kind].route}/${esc(it.name)}">
          <div class="card-title">${esc(it.title)}</div>
          ${extra}
        </a>`;
      }).join("")}
    </div>
    <div id="pager">${pagerHTML(page, totalPages, items.length)}</div>`;
  bindPager((p) => {
    listPage[kind] = p;
    viewList(kind).then(scrollToListTop);
  });
}

/* ---------- 搜索 ---------- */
async function viewSearch(q) {
  setNav(null);
  content.innerHTML = `<h1>搜索：${esc(q)}</h1><p class="muted">搜索中…</p>`;
  const results = await api(`/api/search?q=${encodeURIComponent(q)}`);
  if (!results.length) {
    content.innerHTML = `<h1>搜索：${esc(q)}</h1>
      <p class="muted">没有找到匹配内容。试试英文关键词（如 Terminal-Universe）或中文关键词（如 账本、记忆）。</p>`;
    return;
  }
  const groups = {};
  for (const r of results) (groups[r.kind] ||= []).push(r);
  content.innerHTML = `<h1>搜索：${esc(q)} <span class="muted">(${results.length} 条)</span></h1>
    ${Object.entries(groups).map(([kind, list]) => `
      <section class="panel">
        <h2>${KINDS[kind].label}</h2>
        <div class="card-list">
          ${list.map((r) => `
            <a class="card" href="#/${KINDS[r.kind].route}/${esc(r.name)}">
              <div class="card-title">${highlight(r.title, q)}</div>
              ${r.snippet ? `<div class="subtle">${highlight(r.snippet, q)}</div>` : ""}
            </a>`).join("")}
        </div>
      </section>`).join("")}`;
}

/* ---------- 路由 ---------- */
function setNav(kind) {
  document.querySelectorAll("#nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === kind);
  });
}

function route() {
  const hash = location.hash || "#/overview";
  const m =
    hash.match(/^#\/paper\/([\w.\-]+)$/) || hash.match(/^#\/signal\/([\w.\-]+)$/)
    || hash.match(/^#\/digest\/([\w.\-]+)$/) || hash.match(/^#\/doc\/([\w.\-]+)$/);
  if (m) {
    const kind = hash.startsWith("#/paper") ? "papers"
      : hash.startsWith("#/signal") ? "signals"
      : hash.startsWith("#/digest") ? "digests" : "docs";
    return viewNote(kind, m[1]);
  }
  if (hash.startsWith("#/search/")) {
    return viewSearch(decodeURIComponent(hash.slice("#/search/".length)));
  }
  const views = {
    "#/overview": viewOverview,
    "#/papers": viewPapers,
    "#/signals": () => viewList("signals"),
    "#/digests": () => viewList("digests"),
    "#/docs": () => viewList("docs"),
  };
  const fn = views[hash] || viewOverview;
  return fn().catch((err) => {
    content.innerHTML = `<div class="error">加载失败：${esc(err.message)}</div>`;
  });
}

/* ---------- 启动 ---------- */
initTheme();
$("#search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const q = e.target.value.trim();
    if (q) location.hash = `#/search/${encodeURIComponent(q)}`;
  }
});
window.addEventListener("hashchange", route);
route();
