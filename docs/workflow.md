# Research workflow

## 1. Intake

Collect candidate items from:

- arXiv daily listings, Atom/API metadata, and author-provided updates;
- official lab, benchmark, and project pages;
- reputable reporting about new systems or releases;
- public posts from researchers and organizations, used as discovery signals.

The structured record should contain the canonical URL, publication or posting date, and the date on which this project observed it.

## 2. Deduplication

Prefer identifiers in this order:

1. arXiv identifier plus version;
2. DOI;
3. canonical project or article URL;
4. title plus first author only as a fallback.

When a paper receives a new arXiv version, update the existing record and note what changed instead of creating a duplicate.

## 3. Triage

Assign a relevance label from [`TAXONOMY.md`](../TAXONOMY.md), then tag the item by method and research object. Prioritize items that contribute a new environment, interaction protocol, dataset, evaluation, or reproducible system.

## 4. Paper summary

Use [`templates/paper.md`](../templates/paper.md). Separate:

- bibliographic facts;
- the authors' stated claims;
- evidence from experiments or demonstrations;
- our interpretation and reusable patterns;
- limitations and open questions.

Do not copy abstracts or paper sections wholesale. Keep quotations short and link to the original.

## 5. Web signal summary

Use [`templates/signal.md`](../templates/signal.md). Record what was actually observed, who published it, and whether a primary source corroborates it. Do not promote a rumor, teaser, or metric screenshot to a research finding without evidence.

## 6. Digest

Create one dated Markdown file under `digests/` for each substantial review run. A digest should answer:

- What is genuinely new?
- Which methods or environments recur across papers?
- What evaluation patterns are becoming common?
- Where do claims disagree or remain weakly supported?
- What should be read, reproduced, or monitored next?

## 7. Quality check

Before publishing, verify links, dates, author names, arXiv versions, tags, and the distinction between evidence and inference. If a source is inaccessible, mark the record as unverified rather than filling gaps from memory.
