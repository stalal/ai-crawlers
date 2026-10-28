// Writes the generated files from bots.json: robots.txt files, server configs that turn the training opt-out into a 403,
// bots.csv, FAQ.md (from myths.json) and the table in README.md.
//   bun scripts/build.ts
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PURPOSES, literals, type Bot } from '../schema'

const ROOT = join(import.meta.dir, '..')
const bots = (JSON.parse(readFileSync(join(ROOT, 'bots.json'), 'utf8')) as Bot[]).sort((a, b) => a.order - b.order)
const myths = JSON.parse(readFileSync(join(ROOT, 'myths.json'), 'utf8')) as { myth: string; fact: string; source: string }[]
const write = (path: string, text: string) => writeFileSync(join(ROOT, path), text)

// Stay visible in search and AI answers, opt out of training: only training tokens are disallowed.
const training = bots.filter(b => b.purpose === 'training')
const optOut = ['# Stay in search and AI answers, opt out of model training.', '# Generated from bots.json; every other bot falls through to the * group.', '',
  ...training.map(b => `User-agent: ${b.token}`), 'Disallow: /', '', 'User-agent: *', 'Allow: /', ''].join('\n')
const allowAll = ['# Allow every crawler.', 'User-agent: *', 'Allow: /', ''].join('\n')
write('robots/opt-out-of-training.txt', optOut)
write('robots/allow-all.txt', allowAll)

// The same opt-out enforced at the server, for training crawlers that ignore robots.txt or don't say. Token-only entries
// (Google-Extended, Applebot-Extended) send no requests of their own, so only robots.txt can cover them.
const enforced = training.filter(b => b.detectable && b.pattern && b.robotsTxt !== 'token-only')
const names = enforced.flatMap(b => literals(b.pattern))
const alt = names.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
const head = (c: string) => `${c} Return 403 to AI training crawlers. Generated from bots.json; search, AI search and live-fetch bots are untouched.\n`
mkdirSync(join(ROOT, 'server'), { recursive: true })
write('server/nginx-block-training.conf', `${head('#')}# Include inside a server block.\nif ($http_user_agent ~* "(${alt})") {\n    return 403;\n}\n`)
write('server/apache-block-training.htaccess', `${head('#')}RewriteEngine On\nRewriteCond %{HTTP_USER_AGENT} (${alt}) [NC]\nRewriteRule ^ - [F,L]\n`)
write('server/caddy-block-training.caddy', `${head('#')}# Import inside a site block.\n@trainingbots header_regexp User-Agent "(?i)(${alt})"\nrespond @trainingbots 403\n`)
write('server/haproxy-block-training.txt', `${names.join('\n')}\n`)

const csvCell = (v: unknown) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s }
const cols = ['token', 'name', 'operator', 'purpose', 'description', 'robotsTxt', 'verify', 'docs', 'status', 'detectable', 'pattern', 'checked'] as const
const row = (b: Bot) => cols.map(c => csvCell(c === 'verify' ? [b.verify.method, b.verify.url].filter(Boolean).join(' ') : b[c]))
write('bots.csv', [cols.join(','), ...bots.map(b => row(b).join(','))].join('\n') + '\n')

const QUESTIONS: Record<string, string> = {
  'Blocking GPTBot keeps your site out of ChatGPT': 'Does blocking GPTBot keep my site out of ChatGPT?',
  'robots.txt stops ChatGPT-User from opening your pages': 'Can robots.txt stop ChatGPT-User from opening my pages?',
  'Blocking Google-Extended hurts you in Google Search': 'Does blocking Google-Extended hurt me in Google Search?',
  'No Google-Extended hits in your logs means the block failed': 'Why is Google-Extended never in my logs?',
  "anthropic-ai and Claude-Web are Anthropic's crawlers": "Are anthropic-ai and Claude-Web still Anthropic's crawlers?",
  "Anthropic doesn't publish IP addresses for its bots": 'Does Anthropic publish IP addresses for its bots?',
  'Google-NotebookLM is the token for NotebookLM': 'Is Google-NotebookLM still the token for NotebookLM?',
}
write('FAQ.md', ['# FAQ', '', '## How do I opt out of AI training but stay in AI answers?', '',
  'Block only the training crawlers: paste [`robots/opt-out-of-training.txt`](robots/opt-out-of-training.txt) into your robots.txt above your other rules. Search engines, AI search and live fetches still reach every page. For training crawlers that ignore robots.txt, the files in [`server/`](server/) return a 403 instead.', '',
  ...myths.flatMap(m => [`## ${QUESTIONS[m.myth] ?? m.myth}`, '', `${m.fact} ([source](${m.source}))`, '']),
  '## How do I know a request from a bot is real?', '', "User agents are claims. Check the request against the operator's published IP ranges or reverse DNS; the `verify` field says which method each operator offers.", ''].join('\n'))

const md = (s: string) => s.replace(/\|/g, '\\|')
const table = PURPOSES.map(p => {
  const list = bots.filter(b => b.purpose === p.id)
  return [`### ${p.label} (${list.length})`, '', p.description, '', '| Bot | Operator | What it does | robots.txt |', '|---|---|---|---|',
    ...list.map(b => `| ${b.docs ? `[${md(b.name)}](${b.docs})` : md(b.name)} | ${md(b.operator)} | ${md(b.description)} | ${b.robotsTxt} |`), ''].join('\n')
}).join('\n')
const readmePath = join(ROOT, 'README.md')
const readme = readFileSync(readmePath, 'utf8')
const START = '<!-- table:start -->', END = '<!-- table:end -->'
writeFileSync(readmePath, readme.slice(0, readme.indexOf(START) + START.length) + '\n\n' + table + '\n' + readme.slice(readme.indexOf(END)))
console.log(`${bots.length} bots: robots/, server/ (${names.length} user agents), bots.csv, FAQ.md, README table`)
