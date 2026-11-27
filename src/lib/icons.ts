// Espresso status icons and short labels (docs/plans/02-design.md §2.3), shared by the
// badges and the map markers (docs/plans/03-map.md). Icons are decorative: aria-hidden.

import type { Lang } from './codes.ts';

export type EspressoStatus = 'espresso_semi' | 'espresso_auto' | 'espresso_none';
export const ESPRESSO_STATUSES: readonly EspressoStatus[] = ['espresso_semi', 'espresso_auto', 'espresso_none'];

export const STATUS_SHORT: Record<EspressoStatus, Record<Lang, string>> = {
  espresso_semi: { en: 'Semi-automatic espresso', ja: 'セミオート' },
  espresso_auto: { en: 'Fully automatic espresso', ja: '全自動' },
  espresso_none: { en: 'No espresso machine — drip', ja: 'エスプレッソなし・ドリップ' },
};

export const ICON_NAME: Record<EspressoStatus, string> = {
  espresso_semi: 'portafilter',
  espresso_auto: 'button',
  espresso_none: 'dripper',
};

const ICON_BODY: Record<EspressoStatus, string> = {
  espresso_semi:
    '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M1.5 4.5h8v1.5a4 4 0 0 1-8 0z"/><path d="M9.5 5.5h5"/><path d="M4 12.5v1.5M7 12.5v1.5"/></g>',
  espresso_auto:
    '<g fill="none" stroke="currentColor" stroke-width="1.6">' +
    '<rect x="2.5" y="2.5" width="11" height="11" rx="2.5"/><circle cx="8" cy="8" r="2.2" fill="currentColor" stroke="none"/></g>',
  espresso_none:
    '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M2.5 3h11l-4 6h-3z"/><path d="M8 11.5v.5M8 14v.5"/></g>',
};

/** The status icon as an SVG string, hidden from screen readers. */
export function iconSvg(status: EspressoStatus, size = 16, className = 'badge-icon'): string {
  return (
    `<svg class="${className}" data-icon="${ICON_NAME[status]}" aria-hidden="true" focusable="false" ` +
    `viewBox="0 0 16 16" width="${size}" height="${size}">${ICON_BODY[status]}</svg>`
  );
}
