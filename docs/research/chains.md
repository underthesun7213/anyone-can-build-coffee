# 체인 카페 가이드 조사

Status: 1차 조사 완료 (초안, 2026-11-27) · 기록일: 2026-11-20 · 관련: [PRD v0.6 §8 F9](../prd/PRD-v0.6.md) · 상세: [chains-data-a.md](chains-data-a.md), [chains-data-b.md](chains-data-b.md)

## 왜 하나

- 개인 카페냐 체인이냐는 큰 구분 기준이 아니다. 그래도 일본 곳곳에 있는 체인은 **체인마다 특징**이 있어서, 한 번 정리해 두면 어느 매장에 가든 무엇을 기대할지 알 수 있다.
- 체인 정보 하나로 **여러 매장을 한꺼번에** 설명할 수 있다. 카페를 한 곳씩 조사하는 것보다 시간이 적게 든다(주 8시간 예산에 유리).
- "일본 체인 중 에스프레소 머신으로 내리는 곳은?" 같은 글은 여행자에게 쓸모가 있고 공유하기 쉽다.

## 조사 후보

아래는 **조사할 후보 목록일 뿐**이다. 매장 수(5곳 이상인지), 출시 지역(시부야·오모테산도·메이지진구마에)에 매장이 있는지, 추출 방식은 모두 아직 확인하지 않았다.

| 체인 | 일본어 |
|---|---|
| Starbucks | スターバックス |
| Doutor Coffee Shop | ドトールコーヒーショップ |
| Excelsior Caffé | エクセルシオール カフェ |
| Tully's Coffee | タリーズコーヒー |
| Komeda's Coffee | コメダ珈琲店 |
| Caffè Veloce | カフェ・ベローチェ |
| Pronto | プロント |
| Saint Marc Café | サンマルクカフェ |
| Café de Crié | カフェ・ド・クリエ |
| Hoshino Coffee | 星乃珈琲店 |
| Ueshima Coffee Shop | 上島珈琲店 |
| Kissa Renoir | 喫茶室ルノアール |
| Blue Bottle Coffee | ブルーボトルコーヒー |
| % Arabica | % Arabica |

출시 지역을 걸으면서 보이는 다른 체인도 추가한다.

## 체인마다 기록할 것

PRD v0.5 §9 `chains` 시트와 `methods` 시트에 맞춘다.

- 이름(영어 / 일본어), 공식 사이트
- **에스프레소 상태:** 에스프레소 음료를 머신으로 만드는지, 머신 종류(반자동 / 전자동)
- 그 밖의 대표 추출 방식(드립, 사이폰 등)
- 체인의 특징 한 줄(예: 드립 중심, 식사 중심)
- 사실마다 출처 종류, 링크, 확인 날짜
- 출시 지역 안의 매장 목록
- **매장마다 다를 수 있는 점**(예: 일부 매장만 다른 머신)

## 출처 찾는 순서

1. 체인 공식 사이트(메뉴, 매장 소개, 채용·회사 소개 페이지)
2. 체인의 공식 SNS 게시물
3. 출시 지역 매장 직접 방문
4. 기사나 블로그(가장 낮은 우선순위, 링크만)

## 결과 (1차, 2026-11-27)

조사 에이전트 두 개가 웹 검색으로 모은 결과다. 근거 링크와 확신 정도의 이유는 상세 파일에 있다. 매장 위치는 대부분 음식점 사이트·기사 기준이고, 공식 매장 검색으로 다시 확인해야 한다.

| 체인 | 일본어 | 일본 매장 수 (기준 시점) | 출시 지역 매장 | 에스프레소 상태 | 확신 | 상세 |
|---|---|---|---|---|---|---|
| Starbucks | スターバックス | 2,116 (2025-03말) | 있음 | `espresso_auto` (Reserve 매장은 반자동 보도) | 높음 | [A §1](chains-data-a.md) |
| Doutor Coffee Shop | ドトールコーヒーショップ | 1,077 (2026-10말) | 있음 (原宿店 등) | `espresso_none` + `batch_brew` (드립이 기본. 일부 매장은 라떼 등 제공, 에스프레소·아메리카노는 없음) | 보통 | [A §2](chains-data-a.md) |
| Excelsior Caffé | エクセルシオール カフェ | 131 (2026-10말) | 있음 | `espresso_semi` | 보통 | [A §3](chains-data-a.md) |
| Tully's Coffee | タリーズコーヒー | 약 850 (2026-10) | 있음 | `espresso_semi` | 높음 | [A §4](chains-data-a.md) |
| Komeda's Coffee | コメダ珈琲店 | 1,158 그룹 전체 (2026-06말) | 있음 | `espresso_none` (공장 추출) | 보통 | [A §5](chains-data-a.md) |
| Caffè Veloce | カフェ・ベローチェ | 174 (2026-05말) | 있음 | `espresso_semi` (추정) | 낮음 | [A §6](chains-data-a.md) |
| Pronto | プロント | 284 (2026-02말) | 있음 | `espresso_auto` (추정) | 낮음 | [A §7](chains-data-a.md) |
| Saint Marc Café | サンマルクカフェ | 약 290 (2026-05) | 있음 | `espresso_auto` (출처 엇갈림) | 보통 | [B](chains-data-b.md) |
| Café de Crié | カフェ・ド・クリエ | 172 (2026-07말) | 아마 있음 | `espresso_auto` (추정) | 낮음 | [B](chains-data-b.md) |
| Hoshino Coffee | 星乃珈琲店 | 277 (2024-02말) | 있음 | `espresso_none` (핸드드립) | 보통 | [B](chains-data-b.md) |
| Ueshima Coffee Shop | 上島珈琲店 | 91 (2026-09 기사) | 아마 있음 | `espresso_none` (넬드립) | 높음 | [B](chains-data-b.md) |
| Kissa Renoir | 喫茶室ルノアール | 약 103 회사 전체 (2026-06말) | 있음 | `espresso_none` | 보통 | [B](chains-data-b.md) |
| Blue Bottle Coffee | ブルーボトルコーヒー | 33 (2026-11) | 있음 | `espresso_semi` | 높음 | [B](chains-data-b.md) |
| % Arabica | % ARABICA | 7 | **없음** | `espresso_semi` | 높음 | [B](chains-data-b.md) |

### 정리할 것

- **Doutor (정리됨, 2026-11-27):** 대표 블렌드는 머신 드립이고, 에스프레소 음료(라떼·모카 등)는 있지만 공식 주석상 일부 매장은 에스프레소 대신 진한 드립이나 카페오레를 낸다. "필터"(창업자)와 `espresso_auto`(조사)가 둘 다 일부 맞았다. 체인 단위로 `espresso_auto` + `batch_brew`로 두었다가, **창업자 결정(2026-11-27)으로 `espresso_none` + `batch_brew`로 바꿨다.** 기준은 "에스프레소나 아메리카노를 내는가"이고, 도토루는 내지 않는다. 라떼 등 우유 음료는 체인 메모에 적는다(PRD v0.6 §5).
- **Excelsior:** 체인 B의 추가 후보 목록은 전자동으로 추정했지만, 체인 A의 상세 조사(공식 채용 페이지의 추출·스티밍 교육)는 반자동이다. 상세 조사를 따른다.
- **르누아르는 둘로 나눌지 정한다.** 喫茶室ルノアール는 에스프레소가 없고, 자매 브랜드 Cafe Renoir는 에스프레소·라떼가 있다.
- **% Arabica는 출시 지역에 매장이 없다.** v1 범위(출시 지역에 매장이 있는 체인)에서 빠진다.
- **추가 후보:** Sarutahiko Coffee, Streamer Coffee Company (둘 다 반자동 추정, 매장 수와 출시 지역 매장 확인 필요).
- **매장별 예외:** Starbucks Reserve, Pronto 일부 매장처럼 체인 표준과 다른 매장이 보도됐다. PRD v0.6 §4는 매장별 예외를 다루지 않으므로 체인 단위로만 기록한다.
- 확신이 낮은 Veloce, Pronto, Crié는 매장에서 한 번 확인하는 것이 가장 빠르다.
