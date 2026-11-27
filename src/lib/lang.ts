// Language choice and URL helpers (PRD v0.6 §10). Used in the browser and at build.

import type { Lang } from './codes.ts';

export const LANG_STORAGE_KEY = 'lang';

/** Last chosen language if valid; otherwise Japanese browsers get `ja`, everyone else `en`. */
export function pickLanguage(stored: string | null | undefined, browserLanguages: readonly string[]): Lang {
  if (stored === 'en' || stored === 'ja') return stored;
  const first = browserLanguages[0] ?? '';
  return first.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

/** Joins the site base and a path into one absolute path ending in "/". */
export function withBase(base: string, path: string): string {
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.replace(/^\/+/, '');
  const joined = `${b}/${p}`;
  return joined.endsWith('/') ? joined : `${joined}/`;
}

/** The same page in another language: "/en/cafe/x/" -> "/ja/cafe/x/". `rest` is the path after the language. */
export function langPath(base: string, lang: Lang, rest: string): string {
  return withBase(base, `${lang}/${rest.replace(/^\/+/, '')}`);
}
