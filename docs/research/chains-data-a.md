# 체인 데이터 조사 A: 대형 셀프서비스·킷사 체인 7곳

Status: 조사 완료 (초안) · 확인일: 2026-11-27

조사 대상: Starbucks, Doutor Coffee Shop, Excelsior Caffé, Tully's Coffee, Komeda's Coffee, Caffè Veloce, Pronto.
기록 항목은 체인별 **espresso status** 하나다: `espresso_semi` / `espresso_auto` / `espresso_none`. 머신 브랜드나 모델은 기록하지 않는다. 다만 판정 근거로 쓴 경우에는 본문에 적었다.

표기 규칙:
- 각 사실 옆에 출처 링크를 붙였다.
- **[추정]** 은 출처가 직접 말하지 않은 내 해석이다.
- 블로그, 지식인(知恵袋), 구인 사이트는 "2차 출처"로 따로 표시했다.

## 요약표

| chain | JA name | stores in Japan | in launch area? | espresso status | confidence | main source |
|---|---|---|---|---|---|---|
| Starbucks | スターバックス コーヒー | 2,116 (2025-03말, 라이선스 점포 포함) | 있음 (예: 東急プラザ表参道オモカド店) | `espresso_auto` (Reserve 일부 점포는 예외) | high | [공식 PR 2014 (Mastrena)](https://kyodonewsprwire.jp/release/201409173739) |
| Doutor Coffee Shop | ドトールコーヒーショップ | 1,077 (2026-10말) | 있음 (예: 原宿店) | `espresso_none` + `batch_brew` (2026-11-27 창업자 결정: 에스프레소·아메리카노 없음, 일부 매장은 라떼 등) | medium | [공식 taste/steam](https://www.doutor.co.jp/dcs/taste/steam.html), [공식 カフェ・モカ](https://www.doutor.co.jp/app/dcs/menu/detail/2118.html) + 2차 출처 |
| Excelsior Caffé | エクセルシオール カフェ | 131 (2026-10말) | 있음 (예: 渋谷 神南1-20-12) | `espresso_semi` | medium | [공식 채용 LP](https://upro.work/exc/lp), [공식 taste](https://www.doutor.co.jp/exc/taste/) |
| Tully's Coffee | タリーズコーヒー | 약 850 (2026-10 보도자료) | 있음 (예: 渋谷ファイヤー通り店) | `espresso_semi` | high | [공식 エスプレッソへのこだわり](https://www.tullys.co.jp/quality/brand/espresso/) |
| Komeda's Coffee | コメダ珈琲店 | 그룹 1,158 (2026-06말, 해외·타 브랜드 포함) | 있음 (예: 渋谷宮益坂上店) | `espresso_none` | medium | 메뉴 2차 출처, [코메다 블로그](https://komeda-sankaku.com/announcements/nmu0pvkb8ijv0tqd) |
| Caffè Veloce | カフェ・ベローチェ | 174 (2026-05말) | 있음 (예: 渋谷二丁目店) | `espresso_semi` [추정] | low | [공식 메뉴](https://c-united.co.jp/veloce/products/hotdrink/) + 2차 출처 |
| Pronto | プロント | 284 (2026-02말) | 있음 (예: 青山店, 渋谷宮下公園店) | `espresso_auto` [추정] | low | 2차 출처 ([arbeit-project 2016](https://arbeit-project.com/pronto/)) |

7개 체인 모두 일본 내 점포가 5개 이상이다.

---

## 1. Starbucks (スターバックス コーヒー)

- **공식명:** EN Starbucks Coffee / JA スターバックス コーヒー
- **운영사:** スターバックス コーヒー ジャパン株式会社 ([PR TIMES 2026-07-22](https://prtimes.jp/main/html/rd/p/000000250.000033194.html))
- **공식 사이트:** https://www.starbucks.co.jp/
- **일본 점포 수:** 2,116점, 2025년 3월말 기준, 라이선스 점포 포함, 47개 도도부현 전체 ([PR TIMES 2026-07-22](https://prtimes.jp/main/html/rd/p/000000250.000033194.html)).
  - 웹 검색 요약에는 "2026-03말 2,160점"이라는 수치도 나왔다. 하지만 원문 보도자료를 열어 보니 2,116점(2025-03말)이었다. 2026년 기준 공식 수치는 찾지 못했다.
- **런치 지역 점포:** 있음.
  - 東急プラザ表参道オモカド店 (神宮前4-30-3, 明治神宮前駅 도보 3분) ([食べログ](https://tabelog.com/tokyo/A1306/A130601/13138878/))
  - 原宿店이 2022-05-31 폐점할 때 근처 대체 점포로 WITH HARAJUKU店, 明治神宮前メトロピア店, 東急プラザ表参道原宿店이 안내됐다 ([FASHIONSNAP 2022](https://www.fashionsnap.com/article/2022-05-18/starbucks-harajuku-close/)).
  - 한 블로그는 시부야구에 42점이 있다고 썼다. 확인하지 못했다 ([coffee-labo](https://coffee-labo.co.jp/shibuya-starbucks-recommended)).
  - 공식 스토어 로케이터에서는 확인하지 않았다.
- **Espresso status: `espresso_auto`** (confidence: high)
  - 공식 근거: 2014년 라테 리뉴얼 보도자료에 매장 에스프레소 머신 "マストレーナ"를 순차 업그레이드하고 있다고 적혀 있다 ([Kyodo PR Wire 2014-09-17](https://kyodonewsprwire.jp/release/201409173739)).
  - Mastrena는 Thermoplan(스위스)이 Starbucks 전용으로 만드는 super-automatic 머신이다. 버튼을 누르면 분쇄, 도징, 추출이 자동으로 진행된다 ([Wikipedia: Thermoplan AG](https://en.wikipedia.com/wiki/Thermoplan_AG), [Business Insider](https://www.businessinsider.in/heres-the-tiny-swiss-company-behind-starbucks-espresso-machines/articleshow/39767332.cms)).
  - 일본 블로그도 "ほとんどの店舗" 가 마스트레나(전자동)를 쓴다고 했다. 2017년 글이고 2022년에 갱신됐다 ([staba-custom](https://staba-custom.com/starbucks-espresso-machine/)).
  - **예외:** 같은 블로그에 따르면 銀座蔦屋書店과 東京ミッドタウン의 Starbucks Reserve 점포에는 세미오토 머신(Black Eagle)이 들어가 있었다 (2017년 시점). Reserve 계열은 점포 단위로 `espresso_semi` 일 수 있다. 체인 기본값은 `espresso_auto`.
- **기타 추출 방식:** 이번 조사에서 공식 출처로 확인한 것은 없다. 드립(배치 브루)과 Reserve의 핸드 브루 등은 **[추정]** 이며 미확인이다.
- **알려진 점:** 일본 최대 시애틀계 체인이고, 2026년이 일본 상륙 30주년이다 ([PR TIMES](https://prtimes.jp/main/html/rd/p/000000250.000033194.html)).

## 2. Doutor Coffee Shop (ドトールコーヒーショップ)

- **공식명:** EN Doutor Coffee Shop / JA ドトールコーヒーショップ
- **운영사:** 株式会社ドトールコーヒー, 지주회사는 株式会社ドトール・日レスホールディングス ([Doutor IR](https://www.doutor.co.jp/ir/library/shop_count/))
- **공식 사이트:** https://www.doutor.co.jp/dcs/
- **일본 점포 수:** 1,077점 (직영 270, FC 807), 2026년 10월말 현재 ([Doutor IR グループ総店舗数](https://www.doutor.co.jp/ir/library/shop_count/))
- **런치 지역 점포:** 있음.
  - 原宿店 (神宮前1-13-18, 原宿駅 表参道口 바로 앞) ([Time Out](https://www.timeout.jp/tokyo/ja/レストラン/ドトールコーヒーショップ-原宿店))
  - 渋谷神南1丁目店 ([トクバイ](https://tokubai.co.jp/prefectures/13/loconavi_spots/48458/cafe))
  - 原宿竹下通り店, 渋谷センター街店, 渋谷道玄坂店 등 (검색 결과 요약, 2차 출처)
  - 공식 로케이터에서는 확인하지 않았다.
- **Espresso status: `espresso_auto`** (confidence: medium)
  - 공식 근거:
    - 도토루는 자사 사양으로 에스프레소 머신을 개발했고, 노즐을 개량해 밀크 폼을 더 곱게 만들었다고 밝힌다 ([doutor.co.jp/dcs/taste/steam.html](https://www.doutor.co.jp/dcs/taste/steam.html)).
    - 같은 페이지에 블렌드 커피 쪽은 "蒸らし" 공정을 머신 제조사와 약 1년간 공동 개발해 **자동화**했다는 설명이 있다.
    - 다만 에스프레소 머신이 전자동인지 세미오토인지는 공식 페이지에 쓰여 있지 않다.
  - 2차 근거:
    - 아르바이트 기사에 카페라테 계열은 머신이 "自動で作ってくれたり" 해서 쉽다는 서술이 있다 ([baitozine](https://baitozine.com/knowhow/7133/)).
    - 카페 개업 블로그는 スタバ·ドトール·コメダ 등 대형 체인 다수가 전자동을 쓴다고 했다 ([cafe note 2025-11-24](https://note.com/cafenotes/n/ncc72e05d831d)).
  - 판단: 공식 자료가 기종을 말하지 않는다. 2차 출처는 일관되게 자동을 가리키므로 medium.
  - **추가 확인 (2026-11-27): 일부 매장에는 에스프레소가 없다(공식).**
    - 메뉴에는 에스프레소 음료가 있다. 공식 메뉴에 カフェ・ラテ, アイスカフェ・ラテ, カフェ・モカ가 있고, 2014년 공식 가격표에는 エスプレッソ, アメリカン, カプチーノ도 있다 ([カフェ・ラテ](https://www.doutor.co.jp/dcs/menu/detail/20110907154342.html), [2014 가격표 PDF](https://www.doutor.co.jp/about_us/ir/report/monthly/pdf/20140301230942.pdf)).
    - カフェ・モカ와 アイスカフェ・モカ 공식 페이지에 "일부 매장은 에스프레소가 아니라 농도가 높은 커피를 사용한다"는 주석이 있다 ([カフェ・モカ](https://www.doutor.co.jp/app/dcs/menu/detail/2118.html), [アイスカフェ・モカ](https://www.doutor.co.jp/dcs/menu/detail/2078.html)).
    - 같은 주석이 2024년 소금캐러멜 라떼, 2025년 벚꽃 라떼 보도자료에도 있다 ([2024](https://www.doutor.co.jp/news/newsrelease/detail/20240919092821.html), [2025](https://www.doutor.co.jp/news/newsrelease/detail/20250205160921.html)).
    - カフェ・ラテ·アイスカフェ・ラテ 공식 페이지에는 "일부 매장은 카페오레(드립 커피 + 우유)를 판매한다"는 주석이 있다 ([アイスカフェ・ラテ](https://www.doutor.co.jp/dcs/menu/detail/20110912122326.html)).
    - 해석: 에스프레소 머신이 없는 매장이 있다. 체인 대표 커피는 머신 드립이고, 에스프레소는 매장에 따라 있다. PRD v0.6 §4는 매장별 예외를 다루지 않으므로 체인 단위로는 `espresso_auto`(보통) + `batch_brew`로 기록하고, 체인 페이지 메모에 "일부 매장은 에스프레소 대신 진한 드립"을 적는다.
  - **아이스커피:** 매장 밀로 주문 직전에 갈아 저온 추출한 뒤 냉각한다(공식). 에스프레소에 물을 붓는 아메리카노 방식이 아니다 ([アイスコーヒーのこだわり](https://www.doutor.co.jp/dcs/taste/icedcoffee.html)).
- **기타 추출 방식:** 블렌드는 머신 드립이고, 蒸らし 공정까지 자동화했다 ([steam.html](https://www.doutor.co.jp/dcs/taste/steam.html)). 추출한 커피를 잠시 담아 두는 保温タンク가 있다 ([water.html](https://www.doutor.co.jp/dcs/taste/water.html)).
- **알려진 점:** 저가 셀프서비스 블렌드 커피 중심의 일본 최대 토종 커피숍 체인이다. 원두는 자사 직화 배전이다.

## 3. Excelsior Caffé (エクセルシオール カフェ)

- **공식명:** EN EXCELSIOR CAFFÉ / JA エクセルシオール カフェ
- **운영사:** 株式会社ドトールコーヒー (ドトール・日レスHD). 1999년 도토루가 만들었다 ([Wikipedia](https://en.wikipedia.org/wiki/Excelsior_Caff%C3%A9)).
- **공식 사이트:** https://www.doutor.co.jp/exc/
- **일본 점포 수:** 131점 (직영 115, FC 16), 2026년 10월말 현재 ([Doutor IR](https://www.doutor.co.jp/ir/library/shop_count/))
- **런치 지역 점포:** 있음.
  - 시부야구 내 점포로 渋谷区神南1-20-12, 道玄坂2-6-1, 渋谷1-14-8 宮益SKビル 등이 나온다 ([ぐるなび 브랜드 페이지](https://r.gnavi.co.jp/brand/ec654ee1/)).
  - 原宿駅·明治神宮前駅 부근 점포가 있다는 지도 사이트 목록도 있다 ([MapFan](https://mapfan.com/genres/985/13/113)).
  - 오모테산도·하라주쿠의 구체적인 점포명은 확인하지 못했다.
- **Espresso status: `espresso_semi`** (confidence: medium)
  - 공식 근거:
    - 공식 아르바이트 모집 페이지에 바리스타 연수가 "エスプレッソ抽出", "ミルクのスチーミング", "注ぎ" 3단계로 나뉜다고 적혀 있다. 빠른 사람은 3~4개월이면 라테 아트를 낼 수 있다고 한다 ([upro.work/exc/lp](https://upro.work/exc/lp)).
    - 공식 "おいしさへのこだわり" 페이지에도 자체 프로그램으로 훈련받은 바리스타가 한 잔씩 만든다는 설명이 있다 ([doutor.co.jp/exc/taste/](https://www.doutor.co.jp/exc/taste/)).
  - 2차 근거: 손님 블로그(오래된 글)는 チンバリ(La Cimbali) 머신이 있는 점포에서는 라테 아트를 부탁할 수 있다고 썼다 (검색 결과 요약, [ameblo](https://ameblo.jp/radio-reporter/entry-11865104411.html)).
  - **상충 정보:** 知恵袋(오래된 글)에 요코하마 점포에서는 "マシーンで入れたのみ" 였다는 글이 있다 ([Yahoo!知恵袋](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q13183738443)). 점포에 따라 자동 머신이 섞여 있을 가능성이 있다. 그래서 high가 아니라 medium.
- **기타 추출 방식:** 공식 페이지에 드립 등의 기재는 없다.
- **알려진 점:** 도토루의 이탈리안 바르풍 상위 브랜드다. 에스프레소 음료와 파니니 등을 낸다. 점포는 간토에 집중돼 있다.

## 4. Tully's Coffee (タリーズコーヒー)

- **공식명:** EN Tully's Coffee / JA タリーズコーヒー
- **운영사:** タリーズコーヒージャパン株式会社 ([공식 회사 페이지](https://www.tullys.co.jp/company/)). 伊藤園 그룹이다 ([crex-data](https://www.crex-data.com/industry/restaurant/cafe/major-chains-comparison), 2차 출처).
- **공식 사이트:** https://www.tullys.co.jp/
- **일본 점포 수:** "全国約850店舗". 2026-10-12 개최 タリーズフェスティバル2026 보도자료에 나온 수치다 ([koubo/PR TIMES](https://koubo.jp/press-release/prtimes/c20545_r580)).
  - 공식 채용 페이지는 "700店舗以上" 라고 쓴다 ([engage 채용](https://en-gage.net/tullys_saiyo/)). 이 수치는 갱신되지 않은 것으로 보인다 **[추정]**.
- **런치 지역 점포:** 있음.
  - 渋谷ファイヤー通り店 (ハチ公에서 神宮通り를 따라 原宿 방향으로 약 5분) ([食べログ](https://tabelog.com/en/tokyo/A1303/A130301/13183781/))
  - 渋谷スクランブルスクエア店, 東急プラザ渋谷店, 渋谷道玄坂店 등 ([MapFan](https://mapfan.com/genres/988/13/113))
  - 오모테산도·하라주쿠 점포는 확인하지 못했다.
- **Espresso status: `espresso_semi`** (confidence: high)
  - 공식 근거:
    - 주문을 받은 뒤 바리스타가 "半手動式マシン" 으로 한 잔씩 추출한다. 분량, 온도, 추출 시간, 추출량에 기준이 있고, 바리스타가 탬퍼로 탬핑한다 ([tullys.co.jp/quality/brand/espresso/](https://www.tullys.co.jp/quality/brand/espresso/)).
    - 2020년 기사에서 회사 홍보 담당이 세미오토 머신으로 사람이 한 잔씩 추출한다고 설명했다 ([所沢なび](https://tokorozawanavi.com/news-maehara20201111/)).
    - 사내 바리스타 콘테스트의 오퍼레이션 심사 항목에 "エスプレッソの抽出やミルクの扱い" 가 있다 ([PR TIMES 2026](https://koubo.jp/press-release/prtimes/c20545_r580)).
- **기타 추출 방식:** 이번 조사에서 공식 출처로 확인한 것은 없다. 2026년에 점내 배전(焙煎) 점포가 생겼다는 보도는 있다 ([Impress Watch 이미지](https://www.watch.impress.co.jp/img/ipw/docs/2078/177/html/1_o.jpg.html)).
- **알려진 점:** 시애틀계 에스프레소 체인이다. 바리스타 기술과 "コーヒーアドバイザー" 자격 취득을 강조한다 ([engage](https://en-gage.net/tullys_saiyo/)).

## 5. Komeda's Coffee (コメダ珈琲店)

- **공식명:** EN Komeda's Coffee / JA 珈琲所 コメダ珈琲店
- **운영사:** 株式会社コメダ, 지주회사는 株式会社コメダホールディングス ([@Press 2026-07-15](https://www.atpress.ne.jp/news/613793))
- **공식 사이트:** https://www.komeda.co.jp/
- **일본 점포 수:** 그룹 점포 수 1,158점, 2026년 6월말 시점 ([@Press 2026-07-15](https://www.atpress.ne.jp/news/613793)).
  - 이 수치에는 해외 점포와 "おかげ庵" 등 다른 브랜드가 포함된다. 검색 요약에는 해외 81점, おかげ庵 18점으로 나왔지만 원문은 확인하지 못했다.
  - 국내 コメダ珈琲店 단독으로는 약 1,050점대 **[추정]**. 어떻게 계산해도 5점 이상이다.
- **런치 지역 점포:** 있음. コメダ珈琲店 渋谷宮益坂上店이 原宿クエスト에서 약 1.0km 거리다 ([トクバイ](https://tokubai.co.jp/prefectures/13/loconavi_spots/48458/cafe)). 오모테산도·메이지진구마에 역 근처 점포는 확인하지 못했다.
- **Espresso status: `espresso_none`** (confidence: medium)
  - 2026년 메뉴·가격 정리 기사의 커피 계열은 コメダブレンド/アメリカン, たっぷりサイズ, カフェオーレ/ミルクコーヒー, ウインナーコーヒー다. 에스프레소, 카페라테, 카푸치노는 없다 ([foopine 2026-07-27](https://foopine.com/archives/7035)). 다만 이 기사는 전체 메뉴를 다 싣지는 않는다.
  - 코메다 블로그에 따르면 커피는 전국 5개 공장(一宮, 関東, 北海道, 沖縄, 福岡)에서 추출하고 품질을 관리한다 ([komeda-sankaku.com 2023-09-08](https://komeda-sankaku.com/announcements/nmu0pvkb8ijv0tqd)). 이 사이트가 본사 공식인지 가맹점 사이트인지는 판단하지 못했다.
  - 공식 메뉴 페이지는 JS로 렌더링돼서 내용을 읽지 못했다 ([komeda.co.jp/menu](https://www.komeda.co.jp/menu/?brand=1)).
  - 위 cafe note 블로그는 コメダ를 "전자동" 그룹에 넣었다 ([note](https://note.com/cafenotes/n/ncc72e05d831d)). 하지만 에스프레소 메뉴가 확인되지 않으므로 근거가 약하다고 봤다.
- **기타 추출 방식:** 공장에서 추출한 커피를 점포에서 제공한다(위 블로그). 2016년부터 일부 점포에서 핸드드립 블랙 "コメ黒"를 냈다는 2차 출처가 있다 (검색 결과 요약, [t-bless](https://t-bless.jp/2205.html)).
- **알려진 점:** 나고야 킷사텐 스타일의 풀서비스 체인이다. 모닝 서비스, 시로노와르 같은 푸드·디저트, 넓은 좌석으로 알려져 있다. 커피 기술보다 체류형 공간이 강점이다.

## 6. Caffè Veloce (カフェ・ベローチェ)

- **공식명:** EN CAFFÈ VELOCE / JA カフェ・ベローチェ
- **운영사:** C-United株式会社 (コロワイドグループ). 전신은 珈琲館シャノアール다 ([C-United 보도자료 2026-06-25](https://c-united.co.jp/veloce/pdf/ve260625.pdf)).
- **공식 사이트:** https://c-united.co.jp/veloce/
- **일본 점포 수:** 174점, 2026년 5월말 시점. 약 80%가 수도권에 있다 ([C-United 보도자료 2026-06-25](https://c-united.co.jp/veloce/pdf/ve260625.pdf)).
- **런치 지역 점포:** 있음. カフェ・ベローチェ 渋谷二丁目店 (渋谷2-14-18, 宮益坂上) ([食べログ](https://tabelog.com/en/tokyo/A1303/A130301/13093211/), 2023-12 리뷰). 하라주쿠·오모테산도 점포는 확인하지 못했다.
- **Espresso status: `espresso_semi` [추정]** (confidence: low)
  - 공식 메뉴에 エスプレッソ 단품이 있고, カフェラテ는 "深煎りのエスプレッソ" 에 폼드 밀크를 맞춘 음료로 소개된다 ([공식 HOT DRINK](https://c-united.co.jp/veloce/products/hotdrink/)). 에스프레소 머신이 있는 것은 확실하다. `espresso_none` 은 아니다.
  - 머신 종류는 확인하지 못했다. 공식 "こだわり" 페이지에도 기재가 없다 ([kodawari](https://c-united.co.jp/veloce/kodawari/)).
  - 2차 근거: 아르바이트 체험기에 자동으로 끝나는 것은 "ブレンドコーヒーのみ" 이고, 라테는 에스프레소를 컵에 내린 뒤 밀크를 직접 거품 낸다고 적혀 있다 ([t-news](https://www.tnews.jp/baito/ranking/places?company=640), 2016~2019년 근무 후기).
  - 판단: 수작업 스티밍은 세미오토 쪽을 시사한다. 하지만 전자동 에스프레소에 수동 스팀 완드를 같이 쓰는 경우와 구분되지 않는다. 그래서 **low**. 현장 확인이 필요하다.
- **기타 추출 방식:** 블렌드는 자동 머신 추출이다(위 t-news). 그 밖의 정보는 없다.
- **알려진 점:** 저가 셀프서비스 체인이다. 수도권 역 앞과 오피스가에 많고, 흡연석이 있는 점포가 많은 것으로 알려져 있다 **[추정, 미확인]**.

## 7. Pronto (プロント)

- **공식명:** EN PRONTO / JA プロント
- **운영사:** 株式会社プロントコーポレーション (サントリーグループ). UCC와 관계가 있다 ([マイナビ就職](https://job.mynavi.jp/27/pc/search/corp97349/outline.html)).
- **공식 사이트:** https://www.pronto.co.jp/ (WebFetch에는 403을 반환해서 직접 확인하지 못했다)
- **일본 점포 수:** プロントチェーン 284점, 2026년 2월말 정보 ([マイナビ就職](https://job.mynavi.jp/27/pc/search/corp97349/outline.html)). 2024년 시점 293점이라는 구인 사이트 수치도 있다 ([エン転職](https://employment.en-japan.com/comp-66394/)).
- **런치 지역 점포:** 있음.
  - PRONTO 青山店 (港区北青山3-12-7, 表参道駅 도보 4분) ([食べログ](https://tabelog.com/en/tokyo/A1306/A130602/13050976/))
  - 渋谷宮下公園店 ([HOT PEPPER](https://www.hotpepper.jp/strJ000694517/appearance/))
  - 하라주쿠 점포는 확인하지 못했다.
- **Espresso status: `espresso_auto` [추정]** (confidence: low)
  - 2차 근거: 2016년 아르바이트 기사에 드링크는 "ボタン一つで出来上がる" 라서 어렵지 않다고 적혀 있다 ([arbeit-project 2016-07-29](https://arbeit-project.com/pronto/)). 다른 구인 후기 요약에도 "今はほとんど機械がやってくれる" 는 서술이 있었다 (검색 결과 요약, 원문 미확인).
  - **예외:** 간사이 공항 "ESPRESSO＆BAKERY" 업태는 Schaerer 전자동 머신을 도입했다 ([PR TIMES](https://prtimes.jp/main/html/rd/p/000000014.000034490.html)). 긴자 쪽 구인에 LA MARZOCCO 머신이 언급됐다는 검색 요약도 있었는데, 원문은 확인하지 못했다. 2025-12에 연 플래그십 "PRONTO THE FIRST"(긴자)가 그 점포일 가능성이 있다 **[추정]**. 해당 점포만 `espresso_semi` 일 수 있다.
  - 판단: 공식 출처가 없고 2차 출처도 오래됐다. 그래서 low.
- **기타 추출 방식:** 확인하지 못했다.
- **알려진 점:** "昼はカフェ、夜はサカバ" 라는 이중 업태다. 푸드와 주류 비중이 크다 ([食べログ 검색 결과](https://tabelog.com/en/tokyo/A1306/A130602/13050976/)).

---

## 열린 질문

1. **Starbucks 2026년 점포 수:** 공식으로 확인한 최신치는 2,116점(2025-03말)뿐이다. 2026년 기준 공식 수치가 필요하면 회사 개요 페이지를 직접 확인해야 한다. 검색 요약에 나온 "2,160점(2026-03말)"은 원문으로 확인하지 못했다. "日本事業売却" 보도([livedoor](https://news.livedoor.com/article/detail/31898923/))도 내용을 확인하지 못했다. 운영사가 바뀌면 운영사 필드를 갱신해야 한다.
2. **Starbucks Reserve 점포 처리:** 체인 기본값은 `espresso_auto` 이다. Reserve 점포(세미오토 머신 보고 있음)를 점포 단위로 `espresso_semi` 로 덮어쓸지 정해야 한다.
3. **Doutor 에스프레소 머신 종류:** 공식 자료는 "도토루 사양 머신" 이라고만 쓴다. 현장 확인(버튼식인지, 포터필터·탬핑이 있는지)으로 medium을 high로 올릴 수 있다.
4. **Excelsior 점포별 편차:** 자동 머신만 쓰는 점포가 있다는 오래된 증언이 있다. 런치 지역 점포를 현장에서 확인해야 한다.
5. **Veloce, Pronto:** 둘 다 low다. 런치 지역 점포(渋谷二丁目店, 青山店)에서 직접 보고 확정하는 것을 권한다.
6. **Komeda:** 공식 메뉴 페이지가 JS 렌더링이라 읽지 못했다. 에스프레소 메뉴가 정말 없는지 공식 메뉴로 재확인해야 한다. komeda-sankaku.com이 공식 사이트인지도 확인하지 못했다.
7. **런치 지역 점포 수:** 모든 체인을 공식 스토어 로케이터가 아니라 서드파티 목록(食べログ, MapFan, ぐるなび, トクバイ)으로 확인했다. 정확한 점포 수와 영업 여부는 공식 로케이터로 재확인해야 한다.
8. **Tully's 점포 수:** 보도자료의 "약 850" 과 채용 페이지의 "700 이상" 이 다르다. 회사 개요나 IR에서 정확한 수치와 기준일을 확인해야 한다.
