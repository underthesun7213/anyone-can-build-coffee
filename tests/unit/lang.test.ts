// Done when: "When / is opened, it should go to the language chosen last; with none,
// to /ja/ if the browser's language is Japanese, otherwise to /en/."
// The root page runs pickLanguage + langPath in the browser; this tests that logic.

import { describe, expect, it } from 'vitest';
import { langPath, pickLanguage } from '../../src/lib/lang.ts';

describe('root language choice', () => {
  it('goes to the last chosen language, else ja for Japanese browsers, else en', () => {
    expect(pickLanguage('en', ['ja-JP'])).toBe('en');
    expect(pickLanguage('ja', ['en-US'])).toBe('ja');
    expect(pickLanguage(null, ['ja-JP', 'en'])).toBe('ja');
    expect(pickLanguage(null, ['ja'])).toBe('ja');
    expect(pickLanguage(null, ['en-US', 'ja'])).toBe('en');
    expect(pickLanguage('fr', ['ko-KR'])).toBe('en');
    expect(pickLanguage(undefined, [])).toBe('en');
    expect(langPath('/anyone-can-build-coffee/', 'ja', '')).toBe('/anyone-can-build-coffee/ja/');
  });
});
