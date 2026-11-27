// UI strings in English and Japanese (PRD v0.6 §10), translated by the founder.

import type { Lang } from '../lib/codes.ts';

export const STRINGS = {
  siteName: { en: 'Coffee Finder Japan (working name)', ja: 'コーヒーファインダー（仮）' },
  tagline: {
    en: 'Does this cafe make espresso on a machine — semi-automatic or fully automatic?',
    ja: 'このカフェはエスプレッソマシンで淹れている？ セミオート？ 全自動？',
  },
  listTitle: { en: 'Cafes', ja: 'カフェ一覧' },
  cafeCount: { en: '{n} cafes', ja: '{n}件' },
  espresso: { en: 'Espresso', ja: 'エスプレッソ' },
  otherMethods: { en: 'Other methods', ja: 'その他の淹れ方' },
  station: { en: 'Station', ja: '最寄り駅' },
  address: { en: 'Address', ja: '住所' },
  chainStore: { en: 'Chain store — information is for the chain as a whole', ja: 'チェーン店 — チェーン全体の情報です' },
  website: { en: 'Website', ja: 'ウェブサイト' },
  directions: { en: 'Directions', ja: '道順' },
  backToList: { en: 'Back to the list', ja: '一覧に戻る' },
  switchTo: { en: '日本語', ja: 'English' },
  dataUpdated: { en: 'Data last updated {date}', ja: 'データ更新日 {date}' },
  sampleNotice: {
    en: 'Sample data — not real cafes yet.',
    ja: 'サンプルデータです。実在のカフェではありません。',
  },
  notFoundTitle: { en: 'Page not found', ja: 'ページが見つかりません' },
  mapLabel: { en: 'Map of the cafes', ja: 'カフェの地図' },
  mapLoading: { en: 'Loading the map…', ja: '地図を読み込み中…' },
  mapFailed: {
    en: 'The map could not load. The list below still works.',
    ja: '地図を読み込めませんでした。下の一覧はそのまま使えます。',
  },
  details: { en: 'Details', ja: '詳しく見る' },
} satisfies Record<string, Record<Lang, string>>;

export type StringKey = keyof typeof STRINGS;

export function t(lang: Lang, key: StringKey, vars: Record<string, string | number> = {}): string {
  let s: string = STRINGS[key][lang];
  for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}
