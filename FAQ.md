# FAQ

## How do I opt out of AI training but stay in AI answers?

Block only the training crawlers: paste [`robots/opt-out-of-training.txt`](robots/opt-out-of-training.txt) into your robots.txt above your other rules. Search engines, AI search and live fetches still reach every page. For training crawlers that ignore robots.txt, the files in [`server/`](server/) return a 403 instead.

## Does blocking GPTBot keep my site out of ChatGPT?

GPTBot only collects training data. ChatGPT search uses OAI-SearchBot and live answers use ChatGPT-User, each with its own robots.txt token. A GPTBot rule touches neither. ([source](https://developers.openai.com/api/docs/bots))

## Can robots.txt stop ChatGPT-User from opening my pages?

OpenAI says robots.txt rules may not apply to ChatGPT-User, because a person asked for the page. Perplexity-User and Meta-ExternalFetcher work the same way. ([source](https://developers.openai.com/api/docs/bots))

## Does blocking Google-Extended hurt me in Google Search?

Google says Google-Extended doesn't affect inclusion or ranking in Search. It controls Gemini training and Gemini grounding, not AI Overviews or AI Mode. ([source](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers))

## Why is Google-Extended never in my logs?

Google-Extended sends no requests of its own. Google crawls with Googlebot and reads the token from robots.txt, so a server or CDN rule on that user agent blocks nothing. ([source](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers))

## Are anthropic-ai and Claude-Web still Anthropic's crawlers?

Anthropic's docs list only ClaudeBot, Claude-SearchBot and Claude-User. Rules for the old names don't reach any current Claude crawler. ([source](https://support.claude.com/en/articles/8896518))

## Does Anthropic publish IP addresses for its bots?

It does, at claude.com/crawling/bots.json. A request from an address on that list is from Anthropic. ([source](https://support.claude.com/en/articles/8896518))

## Is Google-NotebookLM still the token for NotebookLM?

It's now Google-GeminiNotebook. Rules for the old name stop working once Google drops it. ([source](https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers))

## How do I know a request from a bot is real?

User agents are claims. Check the request against the operator's published IP ranges or reverse DNS; the `verify` field says which method each operator offers.
