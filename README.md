# SEO and AI crawler list

The crawlers that matter for SEO and AI search: search engines, AI search indexes, assistants and agents that fetch pages live, training crawlers, SEO and AI visibility tools, and ad checkers. Each entry is written from the operator's own docs, with its user agent, how to verify it and whether it follows robots.txt.

Browse it at [talalsyed.com/ai-crawlers](https://talalsyed.com/ai-crawlers).

## Scope

In: search engine crawlers, AI search indexers and search APIs, live assistant and agent fetchers (coding agents included), major training crawlers, SEO tools and AI visibility trackers, and ad landing-page checkers.

Out: link previews, archivers, scrapers, security scanners, feed readers, uptime monitors.

Every entry is written from the operator's own documentation (`docs`). Where an operator publishes nothing, the entry is `undocumented` and `docs` is empty.

## Files

| File | What |
|---|---|
| `bots.json` | The list. Source of truth |
| `schema.ts` | Field types and the purposes |
| `bots.csv` | The list as a spreadsheet (generated) |
| `robots/opt-out-of-training.txt` | Stay in search and AI answers, opt out of model training (generated) |
| `robots/allow-all.txt` | Allow everything (generated) |
| `server/` | The training opt-out as a 403 for nginx, Apache, Caddy and HAProxy, for crawlers that ignore robots.txt (generated). Token-only entries like Google-Extended send no requests, so only robots.txt covers them |
| `FAQ.md` | Out-of-date robots.txt advice, corrected with sources (generated from `myths.json`) |
| `coverage.md` | What was checked and why each category is in or out |

## Fields

| Field | Holds |
|---|---|
| `token` | user-agent token as the operator documents it |
| `pattern` | regex that matches the user agent, case-insensitive; empty when the bot sends a plain browser user agent |
| `order` | match order: test patterns in this order, first match wins |
| `purpose` | `seo`, `search`, `user`, `training`, `tool`, `ads` |
| `description` | one line: what the bot is and what it crawls for |
| `robotsTxt` | `respects`, `ignores`, `token-only` (a robots.txt control token, not a crawler), `unknown` |
| `verify` | how to confirm a request is real: `ip-json` (with the URL), `reverse-dns`, `signature`, `none` |
| `docs` | the operator's page for this bot |
| `status` | `documented` or `undocumented` |
| `detectable` | `false` when the user agent can't be told apart from a browser |
| `checked` | when the entry was last checked against the operator's docs |

User agents are claims. Anyone can send `Googlebot`; check `verify` before trusting one.

## Contributing

Open a pull request that changes `bots.json` and links the operator's own page for the bot, then run `bun scripts/build.ts` and `bun test`.

## The list

<!-- table:start -->

### Search engines (21)

Build search indexes. Google's and Bing's also feed their AI answers.

| Bot | Operator | What it does | robots.txt |
|---|---|---|---|
| [Googlebot-Image](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google | Crawls images for Google Images, Discover and image features in Search. | respects |
| [Googlebot-Video](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google | Crawls video for video features in Google Search. | respects |
| [Googlebot-News](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google | Crawls for Google News and news.google.com, as Googlebot. | respects |
| [GoogleOther](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google | Google's generic crawler for product teams and research. | respects |
| [Googlebot](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google | Google Search's main crawler. Also feeds AI Overviews and AI Mode. | respects |
| [Google-InspectionTool](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google | Search Console URL Inspection and the Rich Results Test. | respects |
| [Storebot-Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google | Crawls product pages for Google Shopping. | respects |
| [Bingbot](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0) | Microsoft | Bing's crawler. Also feeds Microsoft Copilot and engines built on Bing. | respects |
| [Applebot](https://support.apple.com/en-us/119829) | Apple | Apple's crawler for Siri, Spotlight and Safari suggestions. | respects |
| [DuckDuckBot](https://duckduckgo.com/duckduckgo-help-pages/results/duckduckbot) | DuckDuckGo | DuckDuckGo's own crawler. Most of its results come from Bing. | respects |
| [YandexBot](https://yandex.com/support/webmaster/robot-workings/check-yandex-robots.html) | Yandex | Yandex Search crawler. | respects |
| [Yahoo Slurp](https://help.yahoo.com/kb/SLN22600.html) | Yahoo | Yahoo Search crawler. | respects |
| [Baiduspider](https://help.baidu.com/question?prod_id=99&class=0&id=3001) | Baidu | Baidu Search crawler. | respects |
| [Yeti](https://searchadvisor.naver.com/guide/seo-basic-firewall) | Naver | Naver Search crawler (South Korea). | respects |
| [SeznamBot](https://o-seznam.cz/napoveda/vyhledavani/en/seznambot-crawler/) | Seznam | Seznam Search crawler (Czech Republic). | respects |
| [PetalBot](https://webmaster.petalsearch.com/site/petalbot) | Huawei | Huawei's crawler for Petal Search and Huawei Assistant. | respects |
| [MojeekBot](https://www.mojeek.com/bot.html) | Mojeek | Mojeek's crawler, an independent search index. | respects |
| [Qwantbot](https://help.qwant.com/bot/) | Qwant | Qwant's crawler, also feeding the European Search Perspective index. | respects |
| [Yahoo Japan (Y!J)](https://support.yahoo-net.jp/PccSearch/s/article/H000007955) | LY Corporation (Yahoo Japan) | Yahoo! JAPAN Search crawler. | unknown |
| [coccocbot](http://help.coccoc.com/searchengine) | Coc Coc | Coc Coc Search crawler (Vietnam). | respects |
| [Kagibot](https://kagi.com/bot) | Kagi | Kagi Search's own index crawler. | respects |

### AI search (21)

Build the indexes AI search engines and search APIs answer from.

| Bot | Operator | What it does | robots.txt |
|---|---|---|---|
| [OAI-SearchBot](https://platform.openai.com/docs/bots) | OpenAI | Builds the index behind ChatGPT search results and citations. | respects |
| [Claude-SearchBot](https://support.claude.com/en/articles/8896518) | Anthropic | Builds the index behind Claude's search results and citations. | respects |
| [PerplexityBot](https://docs.perplexity.ai/guides/bots) | Perplexity | Builds the index behind Perplexity's answers and citations. | respects |
| [Google-CloudVertexBot](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google | Crawls a site for Vertex AI Search agents its owner builds on it. | respects |
| [Amazon Bedrock crawlers](https://docs.aws.amazon.com/bedrock/latest/userguide/webcrawl-data-source-connector.html) | Amazon | Crawls pages for Amazon Bedrock knowledge bases a company sets up. | respects |
| [Amzn-SearchBot](https://developer.amazon.com/amazonbot) | Amazon | Search index for Alexa+ and Amazon's AI experiences. | respects |
| AzureAI-SearchBot | Microsoft | Index that grounds Azure AI services and Microsoft AI agents. | unknown |
| [meta-webindexer](https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/) | Meta | Search index for Meta AI. | respects |
| [MistralAI-Index](https://docs.mistral.ai/robots) | Mistral | Search index for Mistral's Le Chat. | respects |
| [Diffbot](https://www.diffbot.com/docs/crawl/faq/robots-txt) | Diffbot | Builds Diffbot's Knowledge Graph and web data, sold to AI products. | respects |
| xAI-SearchBot | xAI | Search index for Grok. | unknown |
| [Kimi-SearchBot](https://kimi.com/policies/kimi-crawlers) | Moonshot AI | Search index for Moonshot's Kimi. | respects |
| Dola-SearchBot | ByteDance | Search index for ByteDance's Dola (Doubao). | unknown |
| [YandexAdditional](https://yandex.ru/support/webmaster/en/search-appearance/fast.html) | Yandex | Feeds YandexGPT answers in Yandex Search. | token-only |
| [ExaSearchBot](https://crawler.exa.ai/) | Exa | Crawler for Exa's search API, used by many AI apps and agents. | respects |
| ExaBot | Exa | Exa's older search crawler. | unknown |
| TavilyBot | Tavily | Crawler for Tavily's search API for AI agents. | unknown |
| [LinkupBot](https://linkup.so/bot) | Linkup | Crawler for Linkup's search API for AI apps. | respects |
| [ShapBot](https://docs.parallel.ai/resources/crawler) | Parallel | Crawler for Parallel's search API for AI agents. | respects |
| [YouBot](https://docs.you.com/youbot) | You.com | Crawler for You.com search and its search API. | respects |
| Bravebot | Brave | Crawler for Brave Search, its AI answers and the Brave Search API. | unknown |

### Live fetch (27)

Open a page when someone asks an assistant or agent to.

| Bot | Operator | What it does | robots.txt |
|---|---|---|---|
| [ChatGPT-User](https://platform.openai.com/docs/bots) | OpenAI | Opens a page when a ChatGPT user asks about it or clicks a link. | ignores |
| [ChatGPT Agent](https://help.openai.com/en/articles/11845367) | OpenAI | ChatGPT's agent mode, a remote browser that does tasks for a user. | unknown |
| [Claude Code](https://code.claude.com/docs/en/tools-reference) | Anthropic | Anthropic's coding agent, fetching docs and pages for a developer. | unknown |
| [Claude-User](https://support.claude.com/en/articles/8896518) | Anthropic | Opens a page when a Claude user asks about it. | respects |
| [Perplexity-User](https://docs.perplexity.ai/guides/bots) | Perplexity | Opens a page when a Perplexity user asks about it. | ignores |
| Gemini-Deep-Research | Google | Reads pages for Gemini Deep Research reports. | unknown |
| [Google-Agent](https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers) | Google | Google's browsing agent doing tasks for a user (Project Mariner). | ignores |
| GoogleAgent-URLContext | Google | Reads pages a developer's app hands to the Gemini API as URL context. | unknown |
| [Google-GeminiNotebook](https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers) | Google | Reads a page a user adds as a source in Gemini Notebook (formerly NotebookLM). | ignores |
| [MistralAI-User](https://docs.mistral.ai/robots) | Mistral | Opens a page when a Le Chat user asks about it. | respects |
| [DuckAssistBot](https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot) | DuckDuckGo | Fetches pages for DuckDuckGo's Search Assist answers. | respects |
| [Meta-ExternalFetcher](https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/) | Meta | Opens links users share with Meta AI. | ignores |
| [Amzn-User](https://developer.amazon.com/amazonbot) | Amazon | Fetches pages live for Alexa+ and Amazon's assistants. | ignores |
| [Diffbot-User](https://www.diffbot.com/docs/crawl/faq/robots-txt) | Diffbot | Diffbot fetching a page because a person asked it to. | unknown |
| [Kimi-User](https://kimi.com/policies/kimi-crawlers) | Moonshot AI | Opens a page when a Kimi user asks about it. | ignores |
| [Shap-User](https://parallel.ai/parallel-web-systems-bots) | Parallel | Parallel's API fetching a page for a customer's agent. | ignores |
| [ExaUser](https://crawler.exa.ai/) | Exa | Exa's API fetching a page live for a customer's query. | unknown |
| kagi-fetcher | Kagi | Reads a page for Kagi Assistant and the Kagi summarizer. | unknown |
| GrokBot | xAI | Opens a page when a Grok user asks about it. | unknown |
| Codex | OpenAI | OpenAI's coding agent, fetching pages for a developer. | unknown |
| Cursor | Anysphere | Cursor's coding agent, fetching docs for a developer. | unknown |
| GitHub Copilot | GitHub | GitHub Copilot's agent, fetching docs for a developer. | unknown |
| Devin | Cognition | Cognition's coding agent, browsing for a developer. | unknown |
| Gemini CLI | Google | Google's command-line coding agent, fetching pages for a developer. | unknown |
| Trae | ByteDance | ByteDance's coding IDE agent, fetching docs for a developer. | unknown |
| OpenCode | Anomaly | Open-source coding agent, fetching docs for a developer. | unknown |
| qodercli | Alibaba (Qoder) | Alibaba's Qoder CLI coding agent, fetching docs for a developer. | unknown |

### Training (16)

Collect pages to train models.

| Bot | Operator | What it does | robots.txt |
|---|---|---|---|
| [Applebot-Extended](https://support.apple.com/en-us/119829) | Apple | robots.txt token for Apple Intelligence training. Applebot does the fetching. | token-only |
| [GPTBot](https://platform.openai.com/docs/bots) | OpenAI | Collects pages to train OpenAI's models. | respects |
| [ClaudeBot](https://support.claude.com/en/articles/8896518) | Anthropic | Collects pages to train Anthropic's models. | respects |
| [Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | Google | robots.txt token for Gemini and Vertex AI training and grounding. Googlebot does the fetching. | token-only |
| [Meta-ExternalAgent](https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/) | Meta | Collects pages to train Meta's AI models, plus some product indexing. | respects |
| [Amazonbot](https://developer.amazon.com/amazonbot) | Amazon | Amazon's crawler for its products and services, model training included. | respects |
| [MistralAI-Training](https://docs.mistral.ai/robots) | Mistral | Collects pages for Mistral's training datasets. | respects |
| Bytespider | ByteDance | Collects pages to train ByteDance's models (Doubao). | unknown |
| [CCBot](https://commoncrawl.org/ccbot) | Common Crawl | Common Crawl, the open web archive most AI labs train on. | respects |
| Cohere | Cohere | Collects pages to train Cohere's models. | unknown |
| DeepSeekBot | DeepSeek | DeepSeek's crawler for its models. | unknown |
| Qwenbot | Alibaba | Alibaba's crawler for its Qwen models. | unknown |
| ChatGLM-Spider | Zhipu AI | Zhipu AI's crawler for its GLM models. | unknown |
| [KimiBot](https://kimi.com/policies/kimi-crawlers) | Moonshot AI | Moonshot AI's crawler for its Kimi models. | respects |
| [ElevenlabsCrawler](https://elevenlabs.io/docs/bots) | ElevenLabs | ElevenLabs' crawler for its models and agents. | respects |
| [AI2Bot](https://allenai.org/crawler) | Ai2 | Ai2's crawler for its open models and datasets (Dolma). | respects |

### SEO and AI visibility tools (11)

Third-party crawlers for SEO and AI visibility data.

| Bot | Operator | What it does | robots.txt |
|---|---|---|---|
| [AhrefsBot](https://ahrefs.com/robot) | Ahrefs | Ahrefs' backlink and SEO index. | respects |
| [SemrushBot](https://www.semrush.com/bot/) | Semrush | Semrush's backlink and SEO data. | respects |
| [SiteAuditBot](https://www.semrush.com/bot/) | Semrush | Semrush Site Audit, run by a Semrush user. | respects |
| [MJ12bot](https://mj12bot.com/) | Majestic | Majestic's backlink index. | respects |
| [DotBot](https://moz.com/help/moz-procedures/crawlers/dotbot) | Moz | Moz's link index. | respects |
| [DataForSeoBot](https://dataforseo.com/dataforseo-bot) | DataForSEO | DataForSEO's backlink and SEO data APIs. | respects |
| [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) | Screaming Frog | Screaming Frog, a desktop crawler run by an SEO. | respects |
| [SERankingBacklinksBot](https://seranking.com/backlinks-crawler) | SE Ranking | SE Ranking's backlink index. | respects |
| [Scrunchbot](https://scrunchai.com/bots) | Scrunch | Scrunch's AI visibility monitoring. | respects |
| Qwairy-Bot | Qwairy | Qwairy's AI visibility monitoring. | unknown |
| KimeBot | KIME | KIME's AI visibility monitoring. | unknown |

### Ads checks (3)

Check landing pages for ad platforms.

| Bot | Operator | What it does | robots.txt |
|---|---|---|---|
| [AdsBot-Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-special-case-crawlers) | Google | Checks landing page quality for Google Ads. | respects |
| [Meta-ExternalAds](https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/) | Meta | Meta's crawler for its ads and business products. | respects |
| [OAI-AdsBot](https://platform.openai.com/docs/bots) | OpenAI | Checks landing pages for ChatGPT ads. | unknown |

<!-- table:end -->

## License

MIT. Maintained by [Talal Syed](https://talalsyed.com).
