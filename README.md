# TextWorld / Social Simulation Research Radar

一个面向 text world models、text environments、社会模拟和 role-playing agents 的公开研究索引。

This repository collects papers, benchmarks, environments, agent architectures, and research signals around:

- text world models and language-based environments;
- social and multi-agent simulation;
- role-playing, persona, and character agents;
- planning, memory, tool use, and long-horizon interaction;
- evaluation, datasets, and safety.

## What lives here

The repository separates durable research evidence from fast-moving signals:

- `papers/` — structured paper records and the paper index;
- `digests/` — dated summaries of the most important papers and trends;
- `signals/` — news, lab announcements, blog posts, and social-media signals;
- `templates/` — reusable formats for consistent notes;
- `config/` — topic filters and research configuration;
- `docs/` — workflow, taxonomy, and source policy.

## Editorial principles

1. Every record has a source URL and an observation date.
2. Bibliographic facts, author claims, and our interpretation are kept separate.
3. A social-media post is treated as a lead or signal until a primary source supports it.
4. Summaries are concise and original; this repository links to papers instead of redistributing copyrighted full text.
5. Negative results, limitations, missing baselines, and evaluation gaps are recorded explicitly.

## Workflow

The intended loop is:

1. discover candidates through arXiv listings/API/RSS and web research;
2. deduplicate by arXiv identifier, DOI, or canonical URL;
3. triage by relevance using [`TAXONOMY.md`](TAXONOMY.md);
4. write a structured paper or signal record;
5. publish a dated digest with citations and confidence labels.

See [`docs/workflow.md`](docs/workflow.md) and [`docs/source-policy.md`](docs/source-policy.md).

The current architecture and research-design synthesis is documented in [`docs/design-synthesis.md`](docs/design-synthesis.md).

The latest web-signal digest is [`digests/2026-09-04.md`](digests/2026-09-04.md). The literature and product snapshot is [`digests/2026-09-04-literature-product-snapshot.md`](digests/2026-09-04-literature-product-snapshot.md), with the corresponding product comparison in [`signals/2026-09-04-roleplay-product-landscape.md`](signals/2026-09-04-roleplay-product-landscape.md).

## arXiv intake

arXiv supports daily listing subscriptions by email. Its official instructions require a plain-text message sent to the relevant archive, with subject classes added in the message body. See the [official arXiv subscription instructions](https://info.arxiv.org/help/subscribe.html#subscribe-to-daily-listing-emails).

For reproducible automation, this project also uses arXiv's public metadata feeds/API as the structured intake layer. Email is a useful alert channel; the repository stores normalized metadata and links rather than raw mailbox content.

## Status

This is an actively maintained research map. Early entries may be incomplete; corrections and additions are welcome through issues or pull requests.
