import { test, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PURPOSES, literals, type Bot } from '../schema'

const bots = (JSON.parse(readFileSync(join(import.meta.dir, '..', 'bots.json'), 'utf8')) as Bot[]).sort((a, b) => a.order - b.order)
const matchable = bots.filter(b => b.detectable && b.pattern)
const first = (ua: string) => matchable.find(b => new RegExp(b.pattern, 'i').test(ua))

test('every entry has the required fields', () => {
  for (const b of bots) {
    for (const k of ['token', 'name', 'operator', 'description', 'checked'] as const) expect(b[k], `${b.token}.${k}`).toBeTruthy()
    expect(PURPOSES.map(p => p.id)).toContain(b.purpose)
    expect(['respects', 'ignores', 'token-only', 'unknown']).toContain(b.robotsTxt)
    expect(['ip-json', 'reverse-dns', 'signature', 'none']).toContain(b.verify.method)
    expect(b.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    if (b.status === 'documented') expect(b.docs, `${b.token} is documented but has no docs URL`).toMatch(/^https?:\/\//)
    if (b.verify.method === 'ip-json') expect(b.verify.url, b.token).toMatch(/^https:\/\//)
  }
})
test('tokens and orders are unique', () => {
  expect(new Set(bots.map(b => b.token.toLowerCase())).size).toBe(bots.length)
  expect(new Set(bots.map(b => b.order)).size).toBe(bots.length)
})
test('a detectable bot has a pattern and a sample, an undetectable one has neither pattern nor sample', () => {
  for (const b of bots) {
    if (b.detectable) { expect(b.pattern, b.token).toBeTruthy(); expect(b.sampleUA, b.token).toBeTruthy() }
    else expect(b.pattern, b.token).toBe('')
  }
})
test('each sample user agent is matched first by its own entry', () => {
  for (const b of matchable) expect(first(b.sampleUA)?.token, b.sampleUA).toBe(b.token)
})
test('a browser matches nothing', () => {
  expect(first('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36')).toBeUndefined()
})
test('each literal used for substring filters matches its own pattern', () => {
  for (const b of matchable) for (const l of literals(b.pattern)) expect(new RegExp(b.pattern, 'i').test(l), `${b.token}: ${l}`).toBe(true)
})
test('the opt-out-of-training robots.txt names only training bots', () => {
  const txt = readFileSync(join(import.meta.dir, '..', 'robots', 'opt-out-of-training.txt'), 'utf8')
  const named = [...txt.matchAll(/^User-agent: (.+)$/gm)].map(m => m[1]).filter(t => t !== '*')
  expect(named.length).toBeGreaterThan(0)
  for (const t of named) expect(bots.find(b => b.token === t)?.purpose, t).toBe('training')
})
