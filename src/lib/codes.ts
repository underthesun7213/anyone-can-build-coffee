// Codes from PRD v0.6 §5 (methods), §6 (sources) and §9 (status). Used by the
// loader, the validator and the pages. No Astro imports (ADR-0005).

export type Lang = 'en' | 'ja';
export const LANGS: readonly Lang[] = ['en', 'ja'];

type Label = { en: string; ja: string };

export const METHOD_GROUPS = {
  espresso: ['espresso_semi', 'espresso_auto', 'espresso_none'],
  hand: ['hand_drip', 'siphon', 'french_press', 'aeropress'],
  machine: ['batch_brew'],
  premade: ['premade'],
} as const;

export type MethodCode =
  | (typeof METHOD_GROUPS)['espresso'][number]
  | (typeof METHOD_GROUPS)['hand'][number]
  | (typeof METHOD_GROUPS)['machine'][number]
  | (typeof METHOD_GROUPS)['premade'][number];

export const METHOD_LABELS: Record<MethodCode, Label> = {
  espresso_semi: { en: 'Semi-automatic espresso (incl. lever)', ja: 'セミオート / レバー式エスプレッソ' },
  espresso_auto: { en: 'Fully automatic espresso', ja: '全自動エスプレッソ' },
  espresso_none: { en: 'No espresso machine (filter / drip)', ja: 'エスプレッソマシンなし（フィルター / ドリップ）' },
  hand_drip: { en: 'Hand drip / pour-over', ja: 'ハンドドリップ' },
  siphon: { en: 'Siphon', ja: 'サイフォン' },
  french_press: { en: 'French press', ja: 'フレンチプレス' },
  aeropress: { en: 'AeroPress', ja: 'エアロプレス' },
  batch_brew: { en: 'Drip machine / batch brew', ja: 'マシンドリップ / バッチブリュー' },
  premade: { en: 'Pre-made or packaged', ja: '作り置き / パック' },
};

export const METHOD_CODES = Object.keys(METHOD_LABELS) as MethodCode[];
export const ESPRESSO_CODES: readonly MethodCode[] = METHOD_GROUPS.espresso;

export const SOURCE_LABELS = {
  cafe_site: { en: 'Cafe website', ja: '公式サイト' },
  cafe_social: { en: "Cafe's post", ja: '店舗の投稿' },
  owner: { en: 'From the cafe', ja: '店舗からの情報' },
  visit: { en: 'Seen in person', ja: '現地で確認' },
  third_party: { en: 'Article', ja: '記事' },
} satisfies Record<string, Label>;

export type SourceCode = keyof typeof SOURCE_LABELS;
export const SOURCE_CODES = Object.keys(SOURCE_LABELS) as SourceCode[];

export const STATUS_CODES = ['active', 'closed', 'moved'] as const;
export type StatusCode = (typeof STATUS_CODES)[number];

export const COORD_SOURCES = ['osm', 'geocoded'] as const;

/** Espresso methods first, in §5 order, then the rest in §5 order. */
export function methodOrder(code: MethodCode): number {
  return METHOD_CODES.indexOf(code);
}

export function isEspresso(code: string): boolean {
  return (ESPRESSO_CODES as readonly string[]).includes(code);
}
