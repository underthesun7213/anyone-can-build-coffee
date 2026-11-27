// Done when — design basics (docs/plans/02-design.md §3). The badge and card
// tests read the built site in dist/, so run `npm run build` first (`npm run check`).

import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const page = (p: string) => read(join('dist', p));
const tokensCss = read('src/styles/tokens.css');
const [lightCss, darkCss = ''] = tokensCss.split('@media (prefers-color-scheme: dark)');
const colourTokens = (css: string) => [...css.matchAll(/--([a-z-]+):\s*#[0-9a-fA-F]{3,8}\s*;/g)].map((m) => m[1]);

function badgesIn(html: string) {
  return [...html.matchAll(/<span[^>]*class="badge badge-(espresso_[a-z]+)"[^>]*>([\s\S]*?)<\/span>\s*<\/span>/g)].map((m) => ({
    status: m[1],
    body: m[2],
  }));
}

describe('espresso status badges', () => {
  it('gives each of the three statuses its own text, icon and colour', () => {
    const html = page('en/index.html') + page('en/cafe/sample-roastery/index.html');
    const found = new Map(badgesIn(html).map((b) => [b.status, b.body]));
    expect([...found.keys()].sort()).toEqual(['espresso_auto', 'espresso_none', 'espresso_semi']);

    const icons = new Set<string>();
    const texts = new Set<string>();
    for (const body of found.values()) {
      icons.add(body.match(/data-icon="([^"]+)"/)![1]);
      texts.add(body.match(/class="badge-text"[^>]*>([^<]+)/)![1].trim());
    }
    expect(icons.size).toBe(3);
    expect(texts.size).toBe(3);

    // Each status has its own colour tokens, with different values.
    const value = (name: string) => lightCss.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]+)`))![1];
    const fills = ['status-semi-bg', 'status-auto-bg', 'status-none-bg'].map(value);
    const inks = ['status-semi-text', 'status-auto-text', 'status-none-text'].map(value);
    expect(new Set(fills).size).toBe(3);
    expect(new Set(inks).size).toBe(3);
  });

  it('hides the icon from screen readers and keeps the text', () => {
    const badges = badgesIn(page('ja/index.html'));
    expect(badges.length).toBeGreaterThan(0);
    for (const b of badges) {
      expect(b.body).toMatch(/<svg[^>]*aria-hidden="true"/);
      expect(b.body).toMatch(/class="badge-text"[^>]*>[^<]+/);
    }
  });
});

describe('themes and tokens', () => {
  it('redefines every colour token for dark mode', () => {
    const light = colourTokens(lightCss);
    const dark = colourTokens(darkCss);
    expect(light.length).toBeGreaterThan(0);
    expect(tokensCss).toContain('@media (prefers-color-scheme: dark)');
    expect(darkCss).toContain(':root');
    expect(dark.sort()).toEqual([...light].sort());
  });

  it('uses only tokens for colour outside the token file', () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(join(root, dir))) {
        const p = join(dir, name);
        if (statSync(join(root, p)).isDirectory()) walk(p);
        else if (/\.(astro|css)$/.test(name) && !p.endsWith('tokens.css')) files.push(p);
      }
    };
    walk('src');
    expect(files.length).toBeGreaterThan(0);
    const literal = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|lab)\(/;
    for (const f of files) {
      const styles = [...read(f).matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
      const css = f.endsWith('.css') ? read(f) : styles;
      expect(css, f).not.toMatch(literal);
    }
  });

  it('documents every colour token with light and dark values and contrast results', () => {
    const doc = read('docs/architecture/design-system.md');
    const darkValue = (name: string) => darkCss.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]+)`))![1];
    const lightValue = (name: string) => lightCss.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]+)`))![1];
    for (const token of colourTokens(lightCss)) {
      const row = doc.split('\n').find((l) => l.startsWith(`| \`--${token}\``));
      expect(row, token).toBeDefined();
      expect(row).toContain(lightValue(token));
      expect(row).toContain(darkValue(token));
    }
    expect(doc).toContain('## 대비 결과');
    expect(doc).toMatch(/\d+\.\d{2}:1 \| \d+\.\d{2}:1/);
  });
});

describe('phone and language', () => {
  it('makes the whole cafe card one link to the cafe page', () => {
    for (const lang of ['en', 'ja']) {
      const html = page(`${lang}/index.html`);
      const cards = [...html.matchAll(/<(\w+)[^>]*class="cafe-card"[^>]*data-cafe-id="([^"]+)"[^>]*href="([^"]+)"/g)];
      expect(cards.length).toBeGreaterThan(0);
      for (const [, tag, id, href] of cards) {
        expect(tag).toBe('a');
        expect(href).toBe(`/anyone-can-build-coffee/${lang}/cafe/${id}/`);
      }
    }
  });

  it('uses the Japanese font stack and a 1.7 line height for Japanese text', () => {
    const base = read('src/styles/base.css');
    const rule = base.match(/:lang\(ja\)\s*\{([^}]*)\}/)?.[1] ?? '';
    expect(rule).toContain('font-family: var(--font-ja)');
    expect(rule).toContain('line-height: var(--leading-ja)');
    expect(lightCss).toMatch(/--font-ja:\s*"Hiragino Sans"/);
    expect(lightCss).toMatch(/--leading-ja:\s*1\.7;/);
  });
});
