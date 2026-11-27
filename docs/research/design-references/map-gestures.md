# 디자인 레퍼런스: 목록 위 지도의 스크롤·이동 제스처

Status: 조사 완료 · 확인일: 2026-11-27

관련: [03-map](../../plans/03-map.md) · [ADR-0007](../../adr/0007-map-leaflet-osm.md) · [design-system](../../architecture/design-system.md) · 현재 코드 `src/lib/map.ts` `mapOptions`, `src/client/map.ts`

## 결정할 질문

목록 위 40vh 지도에서, 페이지 스크롤은 그대로 쉽게 두면서 "지도는 이렇게 움직인다"를 사람들이 알게 하려면 어떤 패턴을 쓰나? (휴대폰 먼저, 데스크톱 포함, EN/JA)

## 지금 상태 (코드에서 확인)

- 터치(`pointer: coarse`): `dragging: false`, `touchZoom: true`. Leaflet 1.9.4 CSS에서 이때 컨테이너는 `.leaflet-touch-zoom`만 붙어 `touch-action: pan-x pan-y`가 된다. 그래서 한 손가락은 브라우저가 페이지 스크롤로 처리하고, 두 손가락은 Leaflet이 받는다.
- 두 손가락 **이동**도 이미 된다. `Map.TouchZoom.js`의 `_onTouchMove`가 `touchZoom !== 'center'`이면 두 손가락 중점을 따라 중심을 옮긴다. 핀치와 이동이 한 동작이다.
- 안내가 **전혀 없다.** 한 손가락으로 끌면 지도는 반응하지 않고 페이지만 움직인다. 창업자는 이걸 "고장"으로 읽었다.
- 데스크톱: 끌기 = 이동, 휠 = 페이지 스크롤(`scrollWheelZoom: false`), 확대는 +/− 버튼과 더블클릭뿐이다. 역시 안내가 없다.
- 부수 발견: Leaflet 기본 +/− 버튼은 터치에서 30 × 30 px다(`.leaflet-touch .leaflet-bar a`). 디자인 원칙(44 px)에 못 미친다.
- Leaflet 1.9.4 CSS에는 `prefers-reduced-motion` 규칙이 없다. 확대 애니메이션, 페이드, 관성은 옵션으로 꺼야 한다.

## 패턴 비교

| 방식 | 레퍼런스(링크) | 장점 | 단점 | 접근성 메모 |
|---|---|---|---|---|
| A. 협조형(cooperative) + 제스처 실패 시 짧은 안내 오버레이 ("두 손가락으로 이동", "Ctrl + 스크롤로 확대") | [Google Maps JS `gestureHandling`](https://developers.google.com/maps/documentation/javascript/interaction), [cooperative 예제](https://developers.google.com/maps/documentation/javascript/examples/interaction-cooperative), [Leaflet.GestureHandling](https://github.com/elmarquis/Leaflet.GestureHandling) | 페이지 스크롤이 절대 막히지 않는다. 사람들이 Google 지도 임베드에서 이미 본 패턴이라 배울 게 적다. 지금 설정에 안내만 더하면 된다 | 두 손가락 이동은 한 손으로 휴대폰을 쥔 사람에게 어렵다. 안내가 스크롤할 때마다 뜨면 시끄럽다 | 두 손가락만으로 이동하면 WCAG 2.5.1(A) 위반 소지. 한 손가락 대안이 필요하다([GestureHandling 이슈 #102](https://github.com/elmarquis/Leaflet.GestureHandling/issues/102)). 오버레이는 화면 낭독기에 의미 없음 |
| B. 탭해서 켜기 / "지도 움직이기" 토글 (켜면 한 손가락 이동) | WCAG 2.5.7 이해 문서의 지도 예([Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)), NN/g의 "지도 숨기기" 링크 제안([NN/g](https://www.nngroup.com/articles/mobile-maps-locations/)) | 한 손가락 사용자를 위한 명시적 길. 상태가 눈에 보인다. Leaflet `map.dragging.enable()/disable()`로 런타임 전환이 되고, CSS `touch-action`도 같이 바뀐다 | 한 번 더 눌러야 한다. 켠 상태로 두면 다시 스크롤이 지도에 갇힌다(끄는 길을 분명히 해야 함) | 토글은 `<button aria-pressed>`로 키보드·낭독기 모두 쉬움. 44 px 확보 가능 |
| C. 항상 한 손가락 이동(greedy) | Google `gestureHandling: 'greedy'`(위 문서), Leaflet 기본값 | 지도 조작이 가장 직관적 | 40vh 지도는 375 px 화면의 40%. 지도에서 스크롤을 시작하면 페이지가 안 내려간다. NN/g가 말한 "스와이프 모호성" | 스크롤 함정은 운동 장애 사용자에게 특히 불리. 2.5.7의 끌기 대안은 여전히 필요 |
| D. 지도는 정적 미리보기, "지도 열기"로 전체 화면 / 지도·목록 전환 | Airbnb·Yelp 앱의 Map/List 전환(검색 요약 기준), [Airbnb 지도 랭킹 논문](https://arxiv.org/html/2407.00091v1), [Baymard 숙소 분할 보기](https://baymard.com/blog/accommodations-split-view) | 스크롤 충돌이 원천적으로 없다. 큰 지도에서 조작이 편하다 | 계획서 §4가 "전체 화면 지도"를 범위 밖으로 뺐다. 전환 버튼을 못 찾는 사용자, 뒤로 가기 혼란(Baymard) | 전체 화면은 포커스 가두기·닫기·Esc 처리가 필요해 구현 부담이 크다 |

요약: A만으로는 "고장" 문제는 풀지만 한 손가락 대안이 없다. B만으로는 기본 상태가 여전히 말이 없다. **A + B 조합**이 이 프로젝트의 범위(전체 화면 없음)와 접근성 기준을 함께 맞춘다.

## 레퍼런스 상세

### Google Maps JavaScript API `gestureHandling`
- 링크: <https://developers.google.com/maps/documentation/javascript/interaction>, <https://developers.google.com/maps/documentation/javascript/examples/interaction-cooperative> · 확인일 2026-11-27 · 문서 본문을 직접 읽음
- 모드는 `cooperative`, `greedy`, `none`, `auto`. cooperative는 페이지를 "scroll the page normally"하게 두고, 터치에선 두 손가락으로 이동·확대한다. `auto`는 iframe 안이면 cooperative, 아니면 greedy.
- 우리 지금 설정은 사실상 cooperative다. 다만 Google 임베드에서 흔히 보는 "두 손가락으로…" 오버레이 문구는 이번에 읽은 문서 본문에는 나오지 않았다. 오버레이 존재는 실사용 경험과 플러그인 README 기준이다.
- 2016년 발표 글: 한 손가락 터치는 지도가 무시하고, 전체 화면 버튼은 모바일에서 기본으로 켠다([블로그, 2016-11-16](https://mapsplatform.google.com/resources/blog/smart-scrolling-comes-to-mobile-web-maps/)). 즉 Google도 "협조형 + 크게 보기 출구"를 짝으로 냈다.

### NN/g, Maps and Location Finders on Mobile Devices (2014)
- 링크: <https://www.nngroup.com/articles/mobile-maps-locations/> · 확인일 2026-11-27 · 본문 요약을 읽음
- 결과 목록 위 인터랙티브 지도는 스크롤하려다 지도를 끄는 "스와이프 모호성"을 만든다. 대책으로 지도 양옆 여백(스크롤 시작할 자리)과 지도 위 "지도 숨기기" 링크를 든다.
- 모바일에서는 목록이 기본이고 지도는 전환으로 두라는 권고. 우리 구조(지도 40vh + 아래 목록)는 목록이 바로 보이므로 이 권고와 크게 어긋나지 않는다. 오래된 글이라 2026년 기기 감각과는 차이가 있을 수 있다.

### Leaflet.GestureHandling (elmarquis)
- 링크: <https://github.com/elmarquis/Leaflet.GestureHandling>, npm 레지스트리 `leaflet-gesture-handling` · 확인일 2026-11-27 · 저장소·이슈·커밋 목록·레지스트리 직접 확인
- MIT. 최신 1.2.2(2021-10-22 게시), 마지막 커밋도 2021-10-22. 지원 Leaflet 버전은 명시 없음(peerDependencies 없음). 열린 이슈 40개.
- 동작: 한 손가락 끌기·일반 휠을 무시하고 "두 손가락", "Ctrl + 스크롤" 안내를 잠깐(기본 1000 ms) 띄운다. 52개 언어 자동, `text`로 바꿀 수 있다.
- 걱정거리: iOS 17.5에서 동작 안 함(#99, 답 없음), iOS에서 마커 누르기 어려움(#98), WCAG 2.5.1 실패 지적(#102, 2025-10, 답 없음), 기본 언어 오류(#86). **사실상 유지보수 중단.** 쓰지 않는 쪽을 권한다.

### @raruto/leaflet-gesture-handling (포크)
- 링크: <https://github.com/Raruto/leaflet-gesture-handling>, npm 레지스트리 `@raruto/leaflet-gesture-handling` · 확인일 2026-11-27
- 최신 1.6.3(2026-11-14 게시), peerDependencies `leaflet ^1.9.4 || ^2.0.0-beta.3`. **유지보수 중이고 1.9.4와 맞는다.**
- 라이선스는 **GPL-3.0.** 브라우저로 보내는 번들에 섞이면 배포에 해당해 사이트 스크립트의 라이선스 의무가 생길 수 있다. 이 레포에는 아직 프로젝트 라이선스가 없다. 접근성 기능(한 손가락 대안)은 README에 없다.
- 결론: 기술적으로는 맞지만 라이선스 때문에 기본안에서 뺀다. 쓰려면 창업자 결정이 먼저다.

### WCAG 2.2 — 2.5.1 Pointer Gestures (A), 2.5.7 Dragging Movements (AA), 2.3.3 (AAA)
- 링크: <https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html>, <https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html>, <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html> · 확인일 2026-11-27 · 본문 직접 확인
- 2.5.1: 핀치 확대 지도의 대안으로 +/− 버튼을 예로 든다. 두 손가락 제스처는 다중 포인터로, 한 포인터 대안이 있어야 한다. 브라우저 자체 제스처는 제외.
- 2.5.7: 끌어서 이동하는 지도에 "up/down/left/right buttons"를 대안으로 든다.
- 2.3.3(AAA): 상호작용으로 생기는 움직임을 끌 수 있어야 한다. 의무는 아니지만 `prefers-reduced-motion` 대응 근거로 쓴다.
- 우리 상황: 확대는 +/− 버튼이 있어 2.5.1을 충족. 이동은 터치에서 두 손가락뿐이라 한 손가락 대안이 필요하다. 방향 버튼 4개보다 "한 손가락 이동 켜기" 토글이 작고 조용하다.

### Leaflet 1.9.4 소스와 CSS
- 링크: <https://unpkg.com/leaflet@1.9.4/dist/leaflet.css>, `src/map/handler/Map.TouchZoom.js`, `src/map/handler/Map.Drag.js`, <https://leafletjs.com/reference.html> · 확인일 2026-11-27 · 직접 확인
- `Drag.addHooks`가 `leaflet-touch-drag`를 붙이고 `removeHooks`가 뗀다. 그래서 `map.dragging.enable()`만 하면 `touch-action`이 `none`으로 바뀌어 한 손가락 이동이 된다. 토글 구현에 플러그인이 필요 없다.
- `keyboard: true`는 지도를 포커스 가능하게 하고 화살표로 이동(`keyboardPanDelta` 80 px). +/−는 30 px(터치), 포커스 스타일 규칙은 없다.
- 애니메이션 옵션: `zoomAnimation`, `fadeAnimation`, `markerZoomAnimation`, `inertia`.

### Airbnb, Yelp, 食べログ (검색 요약 기준)
- 확인일 2026-11-27. 세 서비스 모두 로그인·JS 의존이 커서 화면을 직접 읽지 못했다. 아래는 검색 요약과 2차 자료 기준이다.
- Airbnb: 모바일에서는 목록과 지도를 동시에 조작하지 않고 전환한다(자사 논문: 모바일에서 "cannot interact with both" 동시에). 목록 아래쪽의 떠 있는 "지도" 전환 버튼 A/B 테스트 기록([GoodUI](https://www.goodui.org/leaks/airbnb-discovers-a-better-way-to-let-customers-explore-listings/)). 모바일 웹에서 맨 위 카드가 지도 아래를 가려 핀을 못 누르던 문제를 고쳤다는 언급도 있다(같은 논문).
- Yelp: 앱에 Map/List 전환([Business Insider 2014](https://businessinsider.in/the-latest-google-maps-update-for-iphone-takes-direct-aim-at-yelp/articleshow/38383721.cms), [TechCrunch 2022](https://techcrunch.com/2022/08/02/yelp-updates-its-android-app-with-a-redesigned-home-feed-and-map-based-search/)). 오래된 2차 자료.
- 食べログ: 앱 소개문이 현재 위치 중심의 큰 지도 검색을 내세운다([App Store](https://apps.apple.com/jp/app/id763377066)). 목록·지도 전환 버튼 위치는 확인하지 못했다.
- 공통점: 큰 서비스는 "작은 지도를 목록 위에 두고 제스처를 나누기"보다 "전환"을 고른다. 우리는 계획상 전환·전체 화면이 범위 밖이라, 작은 지도에서 제스처를 잘 알리는 쪽이 현실적이다.

### 못 읽은 것
- Mobbin, Baymard 스토어 로케이터 가이드라인 본문(유료·로그인), Airbnb·Yelp·食べログ 실제 화면. 위 판단에 이것들의 직접 근거는 없다.

## 이 프로젝트에 적용

### 추천: A + B — 지금의 협조형 제스처는 유지하고, (1) 제스처가 지도에 안 먹을 때만 뜨는 짧은 안내와 (2) 지도 오른쪽 위 "지도 움직이기" 토글을 더한다. 플러그인은 쓰지 않는다.

이유
- 페이지 스크롤은 지금처럼 절대 막히지 않는다(계획서 Done-when "한 손가락은 페이지 스크롤" 유지).
- "고장" 문제의 원인은 피드백이 없다는 것이다. 실패한 그 순간에 이유와 방법을 알려 주는 것이 가장 직접적인 해결이다.
- 토글은 한 손가락만 쓸 수 있는 사람의 길(WCAG 2.5.1/2.5.7)이면서, 눈에 보이는 "이 지도는 움직일 수 있다"는 신호다.
- 필요한 Leaflet 기능(`dragging.enable/disable`, `wheel` 이벤트, `setZoomAround`)은 1.9.4에 다 있다. 유지보수가 멈춘 MIT 플러그인(iOS 이슈)이나 GPL 포크를 들일 이유가 없다. 결정 로직은 `src/lib/map.ts`에 순수 함수로 두면 단위 테스트가 된다(계획서 §5-2 원칙과 같음).
- 전체 화면(D)은 계획서 §4의 범위 밖이라 열린 질문으로 남긴다.

동작 제안
- **터치, 기본 상태:** 지도 위에서 한 손가락이 움직이면 페이지는 그대로 스크롤되고, 지도 가운데에 안내가 뜬다. `pointer-events: none`이라 스크롤을 막지 않는다. 손을 뗀 뒤 약 2초 후 사라진다. 매 스크롤마다 뜨는 소음을 줄이려면 가로 성분이 큰 움직임(|dx| > |dy|)일 때와, 페이지에서 처음 한 번만 뜨게 하는 안을 브라우저에서 비교한다.
- **터치, 토글 켬:** `map.dragging.enable()`. 한 손가락으로 지도가 움직이고 안내는 뜨지 않는다. 버튼은 눌린 상태로 보인다. 다시 누르면 꺼진다. 팝업 링크로 이동하거나 페이지를 떠나면 초기 상태로 돌아간다.
- **데스크톱:** 끌기 이동은 그대로. 지도 위 휠: 수정키 없으면 페이지 스크롤 + 안내, `Ctrl`(Mac은 `⌘`)과 함께면 `preventDefault` 후 확대·축소. 트랙패드 핀치는 많은 브라우저에서 `ctrlKey`가 붙은 wheel로 오므로 같은 경로로 처리된다(브라우저별 확인 필요). 데스크톱에서는 끌기가 이미 되므로 토글을 숨긴다.
- **키보드:** 지도 컨테이너에 포커스가 가면 화살표로 이동, `+`/`−`로 확대(이미 Leaflet 기본). 포커스 링을 `--accent`로 보이게 하고, 짧은 설명을 `aria-describedby`로 연결한다.
- **화면 낭독기:** 안내 오버레이는 `aria-hidden="true"`(제스처를 쓰지 않는 사용자에게 의미 없음). 대신 컨테이너 설명에 키보드 조작을 적는다. 토글은 `<button type="button" aria-pressed>`.
- **모션 줄이기:** `prefers-reduced-motion: reduce`이면 `zoomAnimation`, `fadeAnimation`, `markerZoomAnimation`, `inertia`를 `false`로. 안내의 페이드는 `base.css`의 전역 규칙이 이미 끈다.

### 문구 후보 (EN / JA)

직접 쓴 문구다. Google 임베드 문구를 그대로 옮기지 않았다.

| 키(제안) | EN | JA |
|---|---|---|
| `mapHintTouch` | Use two fingers to move the map | 地図は2本指で動かせます |
| `mapHintWheel` | Hold Ctrl and scroll to zoom | Ctrlを押しながらスクロールで拡大・縮小 |
| `mapHintWheelMac` | Hold ⌘ and scroll to zoom | ⌘を押しながらスクロールで拡大・縮小 |
| `mapMoveToggle` | Move map | 地図を動かす |
| `mapKeysHelp`(숨은 설명) | Arrow keys move the map. Plus and minus zoom. | 矢印キーで移動、＋と−で拡大・縮小します。 |

- 일본어 안내는 `:lang(ja)`로 `--font-ja`, 행간 1.7을 따른다. 일본어가 더 길어도 2줄 안에 들어가게 최대 폭을 잡는다.
- 토글 라벨은 켜고 꺼도 바꾸지 않는다(상태는 `aria-pressed`와 모양으로). 라벨이 바뀌면 낭독기가 상태를 두 번 말하게 된다.

### 기존 토큰·컴포넌트로 되는 것
- 안내 상자: `--surface` 배경 + `--text` 글자(대비 16.81:1 / 14.18:1, 이미 계산됨), `--radius`, `--space-3`/`--space-4` 패딩, `--text-md`. 반투명 색을 새로 만들지 않고 불투명 카드로 지도 가운데에 띄운다.
- 토글: 기존 `.button`(pill, `--surface`, `--border`, 600) + `--tap` 44 px. 눌린 상태는 `--accent` 배경 + `--accent-text`(6.74:1 / 8.27:1).
- 포커스 링: 마커와 같은 `3px solid var(--accent)`.
- 문구: `src/i18n/strings.ts`에 키만 추가.

### 새로 필요한 것
- `src/lib/map.ts`: 안내 판단 순수 함수(예: 이벤트 요약 → `'touch' | 'wheel' | 'wheelMac' | null`), 모션 줄이기용 옵션 분기(`mapOptions(isTouch, reducedMotion)`).
- `src/client/map.ts`: 안내 요소, 토글(L.Control), wheel 처리 연결.
- `src/styles/map.css`: 안내·토글·컨테이너 포커스 규칙, Leaflet +/− 버튼을 44 px로 키우는 규칙(디자인 원칙 3번과 2.5.1 대안의 탭 영역).
- 출처 표시는 오른쪽 아래 그대로. 토글은 오른쪽 위, +/−는 왼쪽 위라 겹치지 않는다(ADR-0007 §2).
- 새 색 토큰은 필요 없다.

### 계획서 Done when 문장 후보
- When someone drags the map with one finger on a touch screen, the page should still scroll, and a hint "Use two fingers to move the map / 地図は2本指で動かせます" should appear over the map without blocking the scroll.
- When someone taps "Move map / 地図を動かす" on a touch screen, one finger should move the map until they tap it again, and the button should show `aria-pressed="true"` while it is on.
- When someone scrolls the mouse wheel over the map on desktop, the page should scroll and a "Ctrl + scroll" hint (⌘ on Mac) should appear; with Ctrl or ⌘ held, the wheel should zoom the map instead.
- When the user prefers reduced motion, the map should zoom and pan without animation or inertia.

## 열린 질문
1. 안내를 매번 띄울지, 가로 끌기일 때만 또는 첫 한 번만 띄울지. 휴대폰에서 직접 써 보고 정한다(스크롤마다 뜨면 시끄럽다는 우려).
2. 토글이 켜진 채 사용자가 지도 위에서 스크롤하려 하면 갇힌다. 지도 밖을 누르면 자동으로 끌지, 일정 시간 후 끌지.
3. 계획서 §4가 뺀 "전체 화면 지도"를 나중에 넣을지. 큰 서비스(Airbnb, Yelp, Google 임베드)는 큰 지도로 가는 출구를 둔다. 넣는다면 ADR-0007 개정 없이 계획서 범위만 바꾸면 된다.
4. NN/g가 말한 "지도 숨기기" 링크가 필요한지. M0 인터뷰에서 지도를 썼는지 물을 때 함께 확인한다.
5. 프로젝트 라이선스가 아직 없다. 나중에 GPL 플러그인(@raruto 포크)을 검토하게 되면 그 전에 정해야 한다.
6. iOS Safari에서 `touch-action: pan-x pan-y` 상태의 두 손가락 이동과 Ctrl-wheel 트랙패드 핀치가 기대대로 되는지 실기기 확인이 필요하다(이번 조사는 소스와 문서 기준).
