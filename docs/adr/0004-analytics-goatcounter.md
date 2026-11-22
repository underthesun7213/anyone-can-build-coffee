# ADR-0004: 쿠키 없는 분석 도구로 GoatCounter를 쓴다

- 상태: 제안됨
- 날짜: 2026-11-20 (웹 사실 확인일 동일)
- 근거: [PRD v0.6](../prd/PRD-v0.6.md) §8 F6, §11(Analytics, Privacy), §12, §14 "[verify in M1]"
- 관련: [ADR-0001](0001-static-site-and-light-pwa.md)

## 배경

- PRD §11은 GoatCounter를 쓰기로 했다. 쿠키가 없고 커스텀 이벤트를 기록할 수 있다는 이유였다. 다만 다음 항목은 "[verify in M1]"로 남겨 두었다.
  - F6 "Was it as listed?" → 이벤트 `listed-yes/{cafe_id}`, `listed-no/{cafe_id}`
  - Directions 클릭 → 이벤트 `directions/{cafe_id}`
  - 창업자 본인 방문 제외(opt-out)
- §12 지표(주간 방문, 직접 방문, 방문당 Directions 클릭, listed-yes 비율)는 모두 GoatCounter에서 읽는다.

## 확인 결과 (2026-11-20, 공식 문서와 스크립트 소스)

### 1. 커스텀 이벤트: **지원함 — 확인됨**

출처: https://www.goatcounter.com/help/events
- JS로 `goatcounter.count({ path: '<이벤트 이름>', event: true })`를 호출하면 이벤트가 기록된다. 이때 `path`가 이벤트 이름이다.
- 선언형: 요소에 `data-goatcounter-click="<이벤트 이름>"`을 붙이면 클릭 핸들러가 자동으로 붙는다. `data-goatcounter-title`로 제목도 줄 수 있다.
- 제약 1: 이벤트 이름은 `/`로 시작할 수 없다. PRD의 `listed-yes/{id}`, `directions/{id}`는 `/`로 시작하지 않으므로 그대로 쓸 수 있다.
- 제약 2: 이벤트에 페이지 경로를 따로 붙일 수 없다. 페이지 정보가 필요하면 이벤트 이름에 넣어야 한다. PRD 이름에 이미 `cafe_id`가 들어 있어 충분하다.
- 제약 3: 문서는 `data-goatcounter-no-session="1"`을 쓰면 빠르게 반복 클릭해도 항상 센다고 설명한다. 이는 기본 동작에서는 같은 세션의 반복 클릭이 합쳐질 수 있다는 뜻으로 읽힌다(해석). F6의 기기당 1회 제한은 PRD대로 localStorage가 맡는다.
- 스크립트 소스(https://gc.zgo.at/count.js)에서도 `event: true`가 전송 파라미터 `e`로 바뀌는 것을 확인했다.

### 2. 본인 방문 제외: **지원함 — 확인됨 (방법 세 가지)**

출처: https://www.goatcounter.com/help/skip-dev, 스크립트 소스 https://gc.zgo.at/count.js
- **`#toggle-goatcounter`**: 사이트 URL 끝에 `#toggle-goatcounter`를 붙여 열면, 그 브라우저의 localStorage에 `skipgc = 't'`가 저장된다. 이후 `count()`는 아무것도 보내지 않는다. 같은 URL을 다시 열면 해제된다. PRD의 "GoatCounter's opt-out"이 이 기능이다.
  - 주의: localStorage는 **출처(도메인)별, 브라우저별**이다. 운영 서브도메인에서 기기마다 한 번씩 해야 하고, 사이트 데이터를 지우면 다시 해야 한다.
  - 페이지뷰뿐 아니라 이벤트도 같은 `count()`를 거치므로 함께 제외된다(소스 확인).
- **Ignore IPs 설정**: 사이트 설정(Settings → Tracking)에 IP를 넣으면 그 IP의 요청을 무시한다. 휴대폰·가정 회선처럼 IP가 바뀌는 환경에는 맞지 않아 보조 수단으로만 쓴다.
- `localhost`와 사설 네트워크 요청은 기본으로 무시된다. 개발 서버 방문은 저절로 빠진다. 스테이징 호스트는 `no_onload`로 막을 수 있다.

### 3. 기타 확인 사항
- 요금: GoatCounter.com은 "합리적인 공개 사용"에 무료다. 개인 사이트는 괜찮고, 하루 수백만 페이지뷰는 안 된다. 구체적인 한도 숫자는 문서에 없다. 쿠키나 개인 데이터를 지속 저장하지 않고 고유 방문을 식별한다고 설명한다. (https://www.goatcounter.com/)
- 지표 계산용 내보내기: CSV 내보내기가 있고 `Event` 열(`true`/`false`)이 포함된다. 단, 사이트 설정의 **"Individual pageviews"가 켜져 있어야 하며 기본값은 꺼짐**이다. JSON API도 있다. (https://www.goatcounter.com/help/export)

### 4. 아직 M1에서 직접 볼 것
- 대시보드에서 `listed-yes/*`, `directions/*`를 접두사로 묶어 합계를 볼 수 있는지 (문서에 대시보드 표시 방식 설명이 없음). 안 되면 CSV/JSON 내보내기로 계산한다.
- "Individual pageviews"를 켰을 때 저장되는 항목을 개인정보 고지(SC-05)에 반영할지.

## 결정

1. 분석 도구는 **GoatCounter(호스팅 버전, goatcounter.com)** 를 쓴다.
2. 이벤트는 다음처럼 보낸다.
   - Directions 링크: `<a … data-goatcounter-click="directions/{cafe_id}">`
   - F6 버튼: 클릭할 때 localStorage를 확인하고, 처음 누른 경우에만 `goatcounter.count({ path: 'listed-yes/{cafe_id}', event: true })`(또는 `listed-no`)를 호출한다.
3. 창업자 제외는 `#toggle-goatcounter`로 하고, 사용하는 기기·브라우저마다 설정한다. 이 절차를 런북이 생기면 거기에 적는다. 그 전까지는 이 ADR이 기준이다.
4. 개발·미리보기 호스트에서는 스크립트가 전송하지 않게 한다(`localhost`는 기본으로 제외, 그 밖의 호스트는 `no_onload`).
5. §12 지표 계산이 대시보드로 안 되면 "Individual pageviews"를 켜고 CSV로 계산한다. 켤 때는 SC-05 고지를 함께 고친다.

## 고려한 대안

| 대안 | 기각/보류 이유 |
|---|---|
| Cloudflare Web Analytics | 커스텀 이벤트 지원이 확인되지 않았다(v0.3 planner 리뷰에서도 미확인). 이 문서에서도 조사하지 않았다 |
| Plausible 등 유료 도구 | 커스텀 이벤트는 되지만 비용이 생긴다(CFO v0.5 리뷰 추정 월 약 ¥1,400, 미확인). 수익이 없는 단계에서는 맞지 않다 |
| F6를 Google Form으로 받기 | 버튼 한 번으로 끝나지 않아 응답률이 더 떨어진다 |
| 자체 수집 엔드포인트 | 백엔드가 생긴다(ADR-0001과 충돌) |

## 결과

**좋은 점**
- PRD의 "[verify in M1]" 핵심 두 항목(커스텀 이벤트, 본인 제외)은 문서와 소스로 확인됐다. 대체 도구나 비용이 필요 없다.
- 쿠키 배너가 필요 없는 구조를 유지한다(최종 법적 판단은 개인정보 고지 작성 때 따로 한다).

**나쁜 점 / 감수할 것**
- 본인 제외는 기기·브라우저마다 해야 하고, 지인 방문은 뺄 수 없다(§12에서 이미 받아들임).
- 이벤트는 사용자 단위로 중복 제거되지 않는다. F6의 1회 제한은 기기 localStorage에만 의존하므로 조작에 약하다(CTO v0.5 리뷰). 주 1~3건 수준의 표본으로 80% 목표를 판단하려면 몇 달이 걸린다.
- 무료 사용 조건이 "합리적인 공개 사용"이라는 정성적 표현이다. 이 규모에서는 문제가 없을 것으로 추정한다.
