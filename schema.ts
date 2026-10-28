// The shape of bots.json, and the purposes in the order they are shown.
export type Purpose = 'search' | 'user' | 'seo' | 'training' | 'tool' | 'ads'
export type Bot = {
  token: string            // user-agent token as the operator documents it
  pattern: string          // regex source, case-insensitive; '' when the bot sends no distinctive user agent
  order: number            // match order: specific tokens before the ones they contain
  name: string
  operator: string
  purpose: Purpose
  description: string      // one line: what the bot is and what it crawls for
  robotsTxt: 'respects' | 'ignores' | 'token-only' | 'unknown'
  verify: { method: 'ip-json' | 'reverse-dns' | 'signature' | 'none'; url: string }
  docs: string             // the operator's own page; '' when none was found
  status: 'documented' | 'undocumented'
  detectable: boolean      // false when the user agent is a plain browser, so it can't be told apart
  sampleUA: string
  checked: string          // YYYY-MM-DD
}

export const PURPOSES: { id: Purpose; label: string; description: string }[] = [
  { id: 'seo', label: 'Search engines', description: 'Build search indexes. Google\'s and Bing\'s also feed their AI answers.' },
  { id: 'search', label: 'AI search', description: 'Build the indexes AI search engines and search APIs answer from.' },
  { id: 'user', label: 'Live fetch', description: 'Open a page when someone asks an assistant or agent to.' },
  { id: 'training', label: 'Training', description: 'Collect pages to train models.' },
  { id: 'tool', label: 'SEO and AI visibility tools', description: 'Third-party crawlers for SEO and AI visibility data.' },
  { id: 'ads', label: 'Ads checks', description: 'Check landing pages for ad platforms.' },
]

// The substrings a log or analytics filter can match on (Cloudflare's userAgent_like has no regex): one per
// alternative in the pattern, with regex syntax taken out.
export const literals = (pattern: string) => pattern ? pattern.split('|').map(p => p.replace(/\\b/g, '').replace(/\\(.)/g, '$1')) : []
