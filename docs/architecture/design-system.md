# Design system

- 상태: 승인됨 (색 값은 2026-11-27 창업자가 로컬 미리보기에서 승인) · 작성일: 2026-11-27 · 계획: [02-design.md](../plans/02-design.md)
- 원본: `src/styles/tokens.css` (색 값이 있는 유일한 파일), `src/styles/base.css`, `src/components/`

## 원칙

1. 에스프레소 상태가 페이지에서 가장 눈에 띈다. 나머지는 조용하다.
2. 담백하게: 강조색 하나, 장식 없음, 넉넉한 간격.
3. 휴대폰 먼저: 한 열, 탭 영역 44 × 44 px 이상, 글자 16 px 이상.
4. 영어·일본어 모두 잘 읽힌다. `:lang(ja)`는 일본어 글꼴과 행간 1.7.
5. WCAG AA 대비. 색만으로 구분하지 않는다.

## 색 토큰

라이트 값은 `:root`, 다크 값은 `@media (prefers-color-scheme: dark)`에서 다시 정의한다. 브라우저 설정을 따른다.

| Token | Role | Light | Dark |
|---|---|---|---|
| `--bg` | Page background | `#fbfaf7` | `#141312` |
| `--surface` | Cards, header | `#ffffff` | `#1d1b19` |
| `--text` | Body text | `#1f1d1a` | `#ece9e4` |
| `--text-muted` | Secondary text | `#5c5750` | `#aaa49b` |
| `--border` | Card and chip borders (decorative) | `#d9d4cc` | `#3a3631` |
| `--accent` | Links, focus, selected states | `#1f57b8` | `#8db3ff` |
| `--accent-text` | Text on accent | `#ffffff` | `#0d1a33` |
| `--status-semi-bg` | Semi-automatic badge fill | `#1d6b4e` | `#46c08f` |
| `--status-semi-text` | Semi-automatic badge text | `#ffffff` | `#0b1f16` |
| `--status-auto-bg` | Fully automatic badge fill | `#fff4df` | `#2a2010` |
| `--status-auto-text` | Fully automatic badge text | `#7a4f00` | `#f2b650` |
| `--status-auto-border` | Fully automatic badge outline | `#b07a1a` | `#b8862e` |
| `--status-none-bg` | No-machine badge fill, sample notice | `#eeebe6` | `#2b2825` |
| `--status-none-text` | No-machine badge text, sample notice | `#46423d` | `#d4cfc8` |

## 대비 결과

WCAG 2.x 상대 휘도로 계산했다(`tokens.css`의 값에서 직접). 글자는 4.5:1, 배지 테두리처럼 글자가 아닌 요소는 3:1이 기준이다. `--border`는 장식용이라 기준에 넣지 않았다(카드는 배경색 차이와 내용으로도 구분된다).


| Pair | Use | Needed | Light | Dark |
|---|---|---|---|---|
| `--text` on `--bg` | Body text on page | 4.5:1 | 16.11:1 | 15.33:1 |
| `--text` on `--surface` | Body text on cards | 4.5:1 | 16.81:1 | 14.18:1 |
| `--text-muted` on `--bg` | Secondary text on page | 4.5:1 | 6.86:1 | 7.50:1 |
| `--text-muted` on `--surface` | Secondary text on cards | 4.5:1 | 7.16:1 | 6.94:1 |
| `--accent` on `--bg` | Links on page | 4.5:1 | 6.46:1 | 8.86:1 |
| `--accent` on `--surface` | Links on cards | 4.5:1 | 6.74:1 | 8.20:1 |
| `--accent-text` on `--accent` | Text on accent | 4.5:1 | 6.74:1 | 8.27:1 |
| `--status-semi-text` on `--status-semi-bg` | Semi-automatic badge | 4.5:1 | 6.43:1 | 7.53:1 |
| `--status-auto-text` on `--status-auto-bg` | Fully automatic badge | 4.5:1 | 6.54:1 | 8.82:1 |
| `--status-auto-border` on `--surface` | Fully automatic outline on cards | 3:1 | 3.72:1 | 5.30:1 |
| `--status-none-text` on `--status-none-bg` | No-machine badge | 4.5:1 | 8.38:1 | 9.46:1 |

## 글자

| 토큰 | 값 |
|---|---|
| `--font-sans` | `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--font-ja` | `"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Noto Sans JP", Meiryo, sans-serif` |
| `--text-sm` / `-md` / `-lg` / `-xl` | 14 / 16 / 20 / 24 px |
| `--leading` / `--leading-ja` | 1.6 / 1.7 |

웹 글꼴은 쓰지 않는다(빠르고, 외부 요청이 없다).

## 간격과 모양

`--space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-6` 24 · `-8` 32 px · `--radius` 8 px · `--radius-pill` 999 px · `--tap` 44 px

## 컴포넌트

| 컴포넌트 | 파일 | 요점 |
|---|---|---|
| 에스프레소 상태 배지 | `EspressoBadge.astro` | 상태마다 글자·아이콘·색이 다르다. 반자동 = 채움(가장 강함), 전자동 = 테두리, 없음 = 중립. 아이콘은 `aria-hidden`, 화면 낭독기는 글자만 읽는다 |
| 방식 칩 | `MethodList.astro` | 핸드드립·사이폰 등. 작은 중립 pill |
| 카페 카드 | `CafeCard.astro` | 카드 전체가 링크 하나(어디를 눌러도 카페 페이지) |
| 헤더 | `Base.astro` | 사이트 이름 + EN/JA 전환 버튼(44 px) |
| 샘플 안내 | `Base.astro` | 조용한 띠. 데이터가 샘플인 동안만 |
| 상세 레이아웃 | `cafe/[id].astro` | 이름(두 언어) → 배지 → 다른 방식 → 체인 메모 → 역·주소 → 웹사이트·길찾기 버튼 |
| 404 | `404.astro` | 두 언어, 같은 토큰 |

## 아이콘

직접 그린 16 × 16 SVG 세 개, `currentColor`로 배지 글자색을 따른다.

| 상태 | 아이콘 |
|---|---|
| 반자동 | 포터필터(원 + 손잡이) |
| 전자동 | 버튼(둥근 사각형 + 점) |
| 없음 | 드리퍼(깔때기 + 방울) |

## 규칙

- 컴포넌트와 페이지 CSS에는 색 값을 직접 쓰지 않는다. `var(--…)`만 쓴다(테스트로 확인).
- 새 색이 필요하면 `tokens.css`에 라이트·다크 두 값을 넣고, 이 문서의 표와 대비 결과를 갱신한다.
