# 체인 카페 에스프레소 상태 조사 (B 묶음)

Status: 조사 완료 (초안) · 확인일: 2026-11-27

- 대상: 7개 체인과 `추가 후보` (런치 지역: 시부야 / 오모테산도 / 메이지진구마에(하라주쿠))
- 기록 항목: 에스프레소 상태만 기록 (`espresso_semi` / `espresso_auto` / `espresso_none`). 머신 브랜드·모델은 근거로만 언급하고 데이터에는 넣지 않는다.
- 표기: **[추정]** = 직접 근거 없이 정황으로 판단한 내용. 신뢰도는 high / medium / low.
- 일부 공식 사이트(호시노 커피 공식, 銀座ルノアール 메뉴 이미지 등)는 자동 조회가 막히거나(403) 내용이 이미지라 읽지 못했다. 그 경우 2차 출처를 썼고 본문에 적었다.

## 요약 표

| chain | JA name | stores in Japan | in launch area? | espresso status | confidence | main source |
|---|---|---|---|---|---|---|
| Saint Marc Café | サンマルクカフェ | 약 290 (2026-05) | 예 (시부야 2곳 확인) | `espresso_auto` | medium | [t-news 체험담](https://www.tnews.jp/baito/ranking/places?company=342) |
| Café de Crié | カフェ・ド・クリエ | 172 (2026-07 말) | 아마 예 (시부야 道玄坂上店, 영업 미확인) | `espresso_auto` **[추정]** | low | [공식 드링크 메뉴](https://c-united.co.jp/crie/drink/) |
| Hoshino Coffee | 星乃珈琲店 | 277 (2024-02 말) | 예 (하라주쿠점, 시부야) | `espresso_none` | medium | [t-news 체험담](https://www.tnews.jp/baito/ranking/places?company=320) |
| Ueshima Coffee Shop | 上島珈琲店 | 91 (2026-09 기사) | 아마 예 (青山店, 위치 미확인) | `espresso_none` | high | [공식 커피 메뉴](https://www.ueshima-coffee-ten.jp/menu/coffee/) |
| Kissa Renoir | 喫茶室ルノアール | 약 103 (회사 전체, 2026-06 말) | 예 (시부야 미야시타공원 앞) | `espresso_none` | medium | [공식 こだわり 페이지](https://www.ginza-renoir.co.jp/renoir/particular/) |
| Blue Bottle Coffee | ブルーボトルコーヒー | 33 (2026-11) | 예 (시부야, 아오야마, 하라주쿠) | `espresso_semi` | high | [Blue Bottle 블로그](https://blog.bluebottlecoffee.com/posts/tokyo-celebrates-five-years) |
| % Arabica | % ARABICA (アラビカ) | 7 (2026-11 공식 목록) | 아니오 (도쿄는 나카메구로·아자부다이힐스) | `espresso_semi` | high | [minnano-rakuraku 기사](https://minnano-rakuraku.com/contents/?p=18074) |

---

## 1. Saint Marc Café (サンマルクカフェ)

- **이름**: EN Saint Marc Café / JA サンマルクカフェ
- **운영사**: 株式会社サンマルクカフェ (サンマルクホールディングス 100% 자회사) — [Wikipedia JA](https://ja.wikipedia.org/wiki/サンマルクカフェ)
- **공식 사이트**: https://www.saint-marc-hd.com/saintmarccafe/
- **일본 내 점포 수**: 2026년 5월 기준 290점 (최성기 407점에서 축소) — [東洋経済オンライン](https://toyokeizai.net/articles/-/945354). 2029년도까지 370점 목표 — [財経新聞 릴리스](https://www.zaikei.co.jp/releases/3327838/). 5점 이상 충족.
  - 주의: FISCO 자료의 868점은 サンマルクHD 그룹 전체 수치 — [FISCO PDF](https://www.fisco.co.jp/wordpress/wp-content/uploads/FISCO/SaintMarc20260629.pdf)
- **런치 지역 점포**: 渋谷公園通り店 — [ぐるなび](https://gurunavi.com/ja/gah3784/rev/rst), 渋谷道玄坂店 (道玄坂2-29-8) — [ぐるなび](https://gurunavi.com/en/gcpy152/rst). 오모테산도·하라주쿠 점포는 이번 검색에서 확인 못 함. 공식 점포 검색으로 재확인 필요.
- **에스프레소 상태**: `espresso_auto` (confidence: medium)
  - 전 아르바이트 인터뷰: 핫 드링크는 기본적으로 머신이 자동으로 만들고, 카페라테는 버튼만 누르면 된다고 함. 코코아 등은 스팀으로 데운다고 함 — [t-news](https://www.tnews.jp/baito/ranking/places?company=342)
  - 다른 체험담에서도 핫 계열은 버튼을 누를 뿐이라는 언급 — [みん評](https://minhyo.jp/saint-marc-baito) (검색 요약 기준, 본문 직접 조회 실패)
  - 반대 방향 정보: 한 바이트 정보 사이트는 "에스프레소 머신에 익숙해지려면 약간 연습 필요", "바리스타 기분" 이라고 씀 — [share-gochi](https://share-gochi.com/company/3296/). 다만 구체적 조작(탬핑, 스티밍) 묘사는 없음.
  - 회사 측 설명: 셀프서비스 매장 최초로 주문 후 원두를 갈아 뜸 들여 추출하는 커피 머신을 도입했다고 함 — [Keurig 브랜드 소개](https://www.keurig.jp/shop/feature/stmarccafe). 전자동 여부는 명시하지 않음.
  - 판단: "버튼으로 라테 완성" 이라는 구체 묘사를 우선해 `espresso_auto`. 매장·시기별 차이가 있을 수 있어 medium.
- **기타 추출 방식**: 한 잔씩 갈아서 추출하는 블렌드(一杯だて) — [Keurig](https://www.keurig.jp/shop/feature/stmarccafe)
- **알려진 것**: 초콜릿 크루아상 "チョコクロ" — [Wikipedia JA](https://ja.wikipedia.org/wiki/サンマルクカフェ)

## 2. Café de Crié (カフェ・ド・クリエ)

- **이름**: EN CAFÉ de CRIÉ / JA カフェ・ド・クリエ
- **운영사**: C-United株式会社 (コロワイド 그룹) — [北海道新聞 게재 릴리스](https://www.hokkaido-np.co.jp/article/1354301/), [Wikipedia JA](https://ja.wikipedia.org/wiki/カフェ・ド・クリエ)
- **공식 사이트**: https://c-united.co.jp/crie/
- **일본 내 점포 수**: 172점 (2026년 7월 말) — [ソリオ宝塚店 오픈 릴리스](https://www.hokkaido-np.co.jp/article/1354301/) (검색 요약으로 확인, 각주 "2026년 7월 말 시점"). C-United 전체는 8브랜드 569점이라 혼동 주의. 5점 이상 충족.
- **런치 지역 점포**: 道玄坂上店 (渋谷区) 페이지 존재 — [クックドア](https://www.cookdoor.jp/dtl/1060012287/imagelist/). 현재 영업 여부와 오모테산도·하라주쿠 점포는 미확인. 공식 점포 검색 페이지는 이번에 찾지 못함.
- **에스프레소 상태**: `espresso_auto` **[추정]** (confidence: low)
  - 에스프레소 기반 메뉴는 확실히 있음: 에스프레소, 카페라테, 아이스 카페라테, 카푸치노 — [공식 드링크 페이지](https://c-united.co.jp/crie/drink/)
  - 머신 종류를 알려 주는 근거는 찾지 못함. 바이트 정보에는 "드링크는 그 자리에서 처음부터 만든다", "오픈 때 커피 머신을 켠다" 정도만 있음 — [アルバイトEX-Press](https://arubaito-ex.jp/express/article/103). 드링크 만들기가 매우 쉽다는 체험담도 있음 — 검색 요약 기준 [みん評](https://minhyo.jp/cafedecrie-bait).
  - 판단: 셀프서비스 대형 체인, 신입이 바로 드링크를 맡는다는 체험담, 기계 조작 묘사 부재로 보아 전자동일 가능성이 높다고 **추정**. 근거가 약하므로 low. 매장 방문 확인 권장.
- **기타 추출 방식**: 블렌드·아메리칸 커피, 디카페인은 프렌치프레스(カフェプレス) — [공식 드링크 페이지](https://c-united.co.jp/crie/drink/)
- **알려진 것**: 오피스가·상업시설 중심의 셀프서비스 카페, 파스타·샌드위치 등 가벼운 식사 — [Wikipedia JA](https://ja.wikipedia.org/wiki/カフェ・ド・クリエ)

## 3. Hoshino Coffee (星乃珈琲店)

- **이름**: EN Hoshino Coffee / JA 星乃珈琲店
- **운영사**: ドトール・日レスホールディングス 그룹 (운영 회사는 日本レストランシステム) — [Wikipedia JA](https://ja.wikipedia.org/wiki/星乃珈琲店)
- **공식 사이트**: https://www.hoshinocoffee.com/ (자동 조회 시 403)
- **일본 내 점포 수**: 277점 (2024년 2월 말) — [Wikipedia JA](https://ja.wikipedia.org/wiki/星乃珈琲店). 2026년 단독 수치는 못 찾음. 5점 이상 충족.
- **런치 지역 점포**: 原宿店 (渋谷区神宮前1-19-11) — [スタディサプリ進路 하라주쿠역 카페 목록](https://shingakunet.com/area/tokyo/shibuyaku/harajuku-eki/cafe/) (검색 요약 기준), 시부야 109MEN'S 2층 점포 언급 — [TravelBook](https://www.travelbook.co.jp/topic/40306). 공식 점포 검색으로 재확인 필요.
- **에스프레소 상태**: `espresso_none` (confidence: medium)
  - 전 아르바이트: 핫 커피는 처음부터 핸드드립으로 만든다, 1잔 2~3분 — [t-news](https://www.tnews.jp/baito/ranking/places?company=320). 다른 사이트도 드립 머신이 아닌 핸드드립을 쓴다고 씀 — [タウンワークマガジン](https://townwork.net/magazine/job/food/cafe/128170/) (검색 요약 기준).
  - 메뉴(팬 사이트 정리)에 에스프레소·카페라테·카푸치노가 없고, 우유 계열은 カフェ・オレ (드립 + 우유) — [星乃珈琲ファン 메뉴](https://hoshino-coffee-fan.mg2life.com/menu-latest.html)
  - 판단: `espresso_none`. 공식 메뉴를 직접 읽지 못했고 매장 한정 메뉴 가능성이 있어 medium.
- **기타 추출 방식**: 핸드드립 (3종 블렌드: 星乃・彦星・織姫) — [t-news](https://www.tnews.jp/baito/ranking/places?company=320), [Wikipedia JA](https://ja.wikipedia.org/wiki/星乃珈琲店)
- **알려진 것**: 가마구이 수플레 팬케이크 — [Wikipedia JA](https://ja.wikipedia.org/wiki/星乃珈琲店)

## 4. Ueshima Coffee Shop (上島珈琲店)

- **이름**: EN Ueshima Coffee Shop / JA 上島珈琲店
- **운영사**: ユーシーシーフードサービスシステムズ (UFS, UCC 그룹) — [Wikipedia JA](https://ja.wikipedia.org/wiki/上島珈琲店), [@Press](https://www.atpress.ne.jp/news/293501)
- **공식 사이트**: https://www.ueshima-coffee-ten.jp/
- **일본 내 점포 수**: 전국 91점 (2026년 9월 기사) — [グルメ Watch](https://gourmet.watch.impress.co.jp/docs/news/2137326.html) (검색 요약 기준). 2022년 11월 공식 자료에는 "국내 146점째" — [공식 PDF](https://www.ueshima-coffee-ten.jp/fileadmin/res/ufs/news/pdf/20221104_ueshima_sakaiten.pdf). 집계 기준 차이 가능성 있음. 어느 쪽이든 5점 이상 충족.
- **런치 지역 점포**: 공식 커피 메뉴에 "青山店 한정" 드링크가 있어 아오야마점 존재는 확인 — [공식 커피 메뉴](https://www.ueshima-coffee-ten.jp/menu/coffee/). 정확한 위치(오모테산도역과의 거리)는 미확인. 공식 점포 검색: https://shop.ufs.co.jp/ufs/spot/list?category=01 (결과가 동적으로 로드되어 읽지 못함)
- **에스프레소 상태**: `espresso_none` (confidence: high)
  - 공식 커피 메뉴는 ネルドリップ와 ダブルネルドリップ 계열(밀크 커피, 비엔나 커피 등)과 디카페인뿐이고 에스프레소·라테·카푸치노가 없음 — [공식 커피 메뉴](https://www.ueshima-coffee-ten.jp/menu/coffee/)
  - 공식 톱 페이지도 더블 넬드립을 핵심으로 내세움 — [공식 사이트](https://www.ueshima-coffee-ten.jp/)
- **기타 추출 방식**: 넬드립, 더블 넬드립 (넬드립 머신을 소개하는 공식 스토리 글 있음) — [공식 사이트](https://www.ueshima-coffee-ten.jp/)
- **알려진 것**: 더블 넬드립 밀크 커피(흑설탕 옵션), 레트로 모던 킷사 — [공식 사이트](https://www.ueshima-coffee-ten.jp/)

## 5. Kissa Renoir (喫茶室ルノアール)

- **이름**: EN Kissa Renoir / JA 喫茶室ルノアール
- **운영사**: 株式会社銀座ルノアール (본사 中野区) — [Wikipedia JA](https://ja.wikipedia.org/wiki/喫茶室ルノアール)
- **공식 사이트**: https://www.ginza-renoir.co.jp/renoir/
- **일본 내 점포 수**: 회사 전체(喫茶室ルノアール, ミヤマ珈琲, Cafeルノアール 등 포함) 약 103점 (2027년 3월기 1분기 말 = 2026년 6월 말) — [モネックス 決算要約](https://scouter.monex.co.jp/news/detail/9853_20260806_act_20260806_153041_3) (AI 생성 요약으로 정확성 주의), 102점 — [kitaishihon](https://kitaishihon.com/company/9853/human-capital). 喫茶室ルノアール 단독 수치는 못 찾음 **[추정: 단독으로도 5점 이상]** — 1983년에 100점 도달 기록 — [Wikipedia JA](https://ja.wikipedia.org/wiki/喫茶室ルノアール).
- **런치 지역 점포**: 시부야역 동쪽 출구 도보 3분, 미야시타공원 앞 (渋谷1-16-14) — [食べログ](https://tabelog.com/en/tokyo/A1303/A130301/13129785/) (검색 요약 기준). 하라주쿠·오모테산도는 미확인. 공식 점포 검색: https://www.ginza-renoir.co.jp/shopsearch/
- **에스프레소 상태**: `espresso_none` (confidence: medium)
  - 공식 こだわり 페이지: 블렌드는 넬드립 장인 기술을 재현한 전용 커피 머신으로 추출한다고 설명. 에스프레소 언급 없음 — [공식](https://www.ginza-renoir.co.jp/renoir/particular/)
  - 별도 업태 "Cafeルノアール" 에는 에스프레소·카페라테가 있다고 함 — [Wikipedia JA](https://ja.wikipedia.org/wiki/喫茶室ルノアール). 喫茶室 업태와 구분 필요.
  - 공식 메뉴는 이미지라 읽지 못했고 "메뉴는 점포마다 다름" 이라는 주의 문구가 있음 — [공식 메뉴](https://www.ginza-renoir.co.jp/renoir/menu/). 그래서 medium.
- **기타 추출 방식**: 넬드립 재현 머신, 8시간 수출(水出し) 아이스 커피 — [공식](https://www.ginza-renoir.co.jp/renoir/particular/), 수출 아이스는 검색 요약 기준
- **알려진 것**: 넓은 좌석의 "로비형" 킷사, 회의실 マイ・スペース, 다시마차 — [Wikipedia JA](https://ja.wikipedia.org/wiki/喫茶室ルノアール)

## 6. Blue Bottle Coffee (ブルーボトルコーヒー)

- **이름**: EN Blue Bottle Coffee / JA ブルーボトルコーヒー
- **운영사**: Blue Bottle Coffee Japan合同会社 — [さんたつ 릴리스](https://san-tatsu.jp/pressrelease/489960/). 본사 Blue Bottle Coffee, Inc. (Nestlé 지배) — [Wikipedia JA](https://ja.wikipedia.org/wiki/ブルーボトルコーヒー)
- **공식 사이트**: https://bluebottlecoffee.jp/ (현재 https://store.bluebottlecoffee.jp/ 로 리다이렉트)
- **일본 내 점포 수**: 상설 카페 33점, 도쿄 17점 (2026년 11월) — [coffee-labo](https://coffee-labo.co.jp/recommended-blue-bottle-coffee-stores/). 참고로 2026년 8월 29점 — [coffee-labo](https://coffee-labo.co.jp/?p=116992), 2022년 1월 24점 — [Wikipedia JA](https://ja.wikipedia.org/wiki/ブルーボトルコーヒー). 개인 운영 미디어 수치라 공식과 대조 필요. 5점 이상 충족.
- **런치 지역 점포**: 渋谷カフェ, 青山カフェ, 原宿カフェ (2026년 3월 개업), HUMAN MADE Cafe by Blue Bottle Coffee (하라주쿠) — [coffee-labo](https://coffee-labo.co.jp/recommended-blue-bottle-coffee-stores/)
- **에스프레소 상태**: `espresso_semi` (confidence: high)
  - 일본 1호점 기요스미 카페에 Kees van der Westen Spirit (바리스타 조작 패들식 머신) 설치 — [Blue Bottle 블로그](https://blog.bluebottlecoffee.com/posts/tokyo-celebrates-five-years), [The Japan Times (2015)](https://www.japantimes.co.jp/life/2015/02/03/food/blue-bottle-coffee-offers-fresher-brew)
  - 바리스타가 한 잔씩 내리는 운영 — [Wikipedia JA](https://ja.wikipedia.org/wiki/ブルーボトルコーヒー)
  - 주의: 근거가 오래된 1호점 중심. HUMAN MADE Cafe 같은 소형·특수 매장은 장비가 다를 수 있음 **[추정]**.
- **기타 추출 방식**: 주문 후 분쇄한 핸드드립(푸어오버), 일본제 드리퍼·케틀 사용 — [Wikipedia JA](https://ja.wikipedia.org/wiki/ブルーボトルコーヒー)
- **알려진 것**: 서드 웨이브 대표 브랜드, 건축 디자인이 돋보이는 매장 — [Wikipedia JA](https://ja.wikipedia.org/wiki/ブルーボトルコーヒー), [Wallpaper](https://wallpaper.com/lifestyle/blue-bottle-coffee-shop-kyoto-japanese-zen-architecture)

## 7. % Arabica

- **이름**: EN % Arabica (% ΔRΔBICΔ) / JA 공식 일본어 표기 미확인 (보통 "アラビカ" 로 불림 **[추정]**)
- **운영사**: 법인명 미확인. 2013년 Kenneth Shoji 창업, 2019년부터 본사 교토 — [Wikipedia EN](https://en.wikipedia.org/wiki/%25_Arabica)
- **공식 사이트**: https://arabica.com/ (구 arabica.coffee에서 리다이렉트)
- **일본 내 점포 수**: 7점 (교토 3, 도쿄 3, 니세코 1) — [공식 Japan 목록](https://arabica.com/locations/japan), [공식 location 페이지](https://arabica.com/en/location/). 5점 이상 충족 (경계선 근처라 변동 주의).
- **런치 지역 점포**: 없음. 도쿄 점포는 中目黒, 麻布台ヒルズ 4F, 麻布台ヒルズ B1 — [공식 Tokyo 목록](https://arabica.com/locations/japan/tokyo/)
- **에스프레소 상태**: `espresso_semi` (confidence: high)
  - 모든 매장이 Slayer 에스프레소 머신을 쓰고 바리스타가 온도·물량·시간을 조절 — [minnano-rakuraku](https://minnano-rakuraku.com/contents/?p=18074) (검색 요약 기준)
  - 시애틀에서 만든 맞춤 에스프레소 머신으로 바리스타 제어가 크다고 함 — [Wikipedia EN](https://en.wikipedia.org/wiki/%25_Arabica) (홍보성 경고가 붙은 문서)
- **기타 추출 방식**: 이번 조사에서는 확인 못 함
- **알려진 것**: 교토 히가시야마 본점, 라테, 미니멀한 화이트 매장 디자인 — [LIVE JAPAN](https://livejapan.com/en/in-kansai/in-pref-kyoto/in-gion_kawaramachi_kiyomizu-dera-temple/article-a2000670/)
- 메모: 런치 지역에 점포가 없어 런치 범위에서는 우선순위 낮음.

---

## 추가 후보

위 7개 외에, 일본 5점 이상이고 런치 지역에 점포가 있을 것으로 보이는 체인. 이름과 상태 **추정**만 적었다. 깊이 조사하지 않았다.

| chain | 런치 지역 근거 (출처 1개) | 상태 추정 |
|---|---|---|
| Sarutahiko Coffee (猿田彦珈琲) | The Bridge 原宿駅店 — [Fashion Press](https://www.fashion-press.net/brands/5599) | `espresso_semi` **[추정]** |
| Streamer Coffee Company | 시부야점·하라주쿠점 — [Time Out Tokyo](https://www.timeout.com/tokyo/restaurants/streamer-coffee-company-1). 전국 점포 수 5점 이상인지 미확인 | `espresso_semi` **[추정]** |
| Starbucks Coffee (スターバックス) | 東急プラザ表参道オモカド店 — [食べログ](https://tabelog.com/tokyo/A1306/A130601/13138878/) | `espresso_auto` **[추정]** (Mastrena 계열, 미검증) |
| Tully's Coffee (タリーズコーヒー) | 공식 점포 검색 — https://www.tullys.co.jp/ (런치 지역 점포 미검증) | `espresso_semi` **[추정]** |
| Doutor Coffee Shop (ドトールコーヒーショップ) | 직영 267·가맹 806점 (2025-02 말) — [EDINET DB 중기계획](https://edinetdb.jp/company/E03518/midterm-plans/) (런치 지역 점포 미검증) | `espresso_auto` **[추정]** |
| Excelsior Caffé (エクセルシオール カフェ) | 도토루 그룹 브랜드 — [Wikipedia EN](https://en.wikipedia.org/wiki/Excelsior_Caff%C3%A9) (런치 지역 점포 미검증) | `espresso_auto` **[추정]** |
| Caffè Veloce (カフェ・ベローチェ) | C-United 브랜드 — [PR TIMES](https://prtimes.jp/main/html/rd/p/000000173.000079423.html) (런치 지역 점포 미검증) | `espresso_auto` **[추정]** |

## 열린 질문

1. **카페 드 크리에 머신 종류**: 에스프레소 메뉴는 있으나 전자동인지 반자동인지 근거가 없다(low). 시부야 매장 방문 또는 C-United 문의로 확인할 것.
2. **산마르크 카페**: "버튼으로 라테 완성"(auto)과 "에스프레소 머신 연습 필요"(semi 가능성) 서술이 섞여 있다. 매장 한 곳 실물 확인 권장.
3. **호시노 커피 공식 메뉴**: 공식 사이트가 403이라 팬 사이트 메뉴에 의존했다. 매장 한정으로 에스프레소 메뉴가 있는지 확인 필요.
4. **르누아르 업태 구분**: 喫茶室ルノアール(none)와 Cafeルノアール(에스프레소 있음)를 데이터에서 별도 체인으로 둘지 결정 필요. 시부야 점포가 어느 업태인지도 확인할 것.
5. **점포 수 최신성**: 호시노(2024-02), 르누아르(회사 전체 수치), 우에시마(2022년 146점 vs 2026년 91점)의 수치가 오래됐거나 기준이 다르다. 각 사 IR·유가증권보고서로 갱신할 것.
6. **런치 지역 공식 확인**: 대부분 점포 위치를 グルメ 사이트·기사로 확인했다. 공식 점포 검색은 동적 로딩이라 읽지 못했다. 출시 전 공식 로케이터로 재확인할 것 (특히 크리에 道玄坂上店 영업 여부, 우에시마 青山店 위치).
7. **블루보틀 매장별 차이**: 반자동 근거가 1호점 중심이다. HUMAN MADE Cafe 등 소형 매장도 같은지 확인 필요.
8. **% Arabica**: 런치 지역 점포가 없어 런치 데이터에 넣을지 결정 필요.
