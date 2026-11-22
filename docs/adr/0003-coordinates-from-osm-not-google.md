# ADR-0003: 좌표는 OpenStreetMap 또는 공개 주소의 지오코딩에서만 얻고, Google 지도에서는 얻지 않는다

- 상태: 제안됨
- 날짜: 2026-11-20 (웹 사실 확인일 동일)
- 근거: [PRD v0.6](../prd/PRD-v0.6.md) §7 SC-05(OSM 표기), §8 F1·F3(Directions), §9 `lat`/`lng`/`coord_source`/`osm_id`, `stations.source` / [CTO v0.2](../reviews/v0.2/5-CTO.md)·[v0.5](../reviews/v0.5/5-CTO.md) 리뷰의 OSM 라이선스 지적
- 관련: [ADR-0002](0002-four-sheet-data-model-and-csv-build.md), [data-validation.md](../architecture/data-validation.md)

## 배경

- 거리 정렬(F1)과 가장 가까운 역 계산(§9)에는 카페마다 좌표가 필요하다.
- PRD §9는 좌표를 "OSM에서, 또는 공개된 주소를 지오코딩해서 얻고, Google에서는 얻지 않는다"고 정했다. `coord_source`는 `osm` 또는 `geocoded`다.
- 리뷰가 지적한 점은 두 가지다. OSM 좌표를 시트에 복사하면 ODbL 파생 데이터베이스가 되어 share-alike가 CSV에 적용될 수 있다. 그리고 `geocoded`에 어떤 지오코더를 쓰는지 정해지지 않았다.

## 확인한 사실 (2026-11-20)

**Google 지도 약관** — Google Maps/Google Earth Additional Terms of Service §2 금지 행위 (https://www.google.com/help/terms_maps/)
- 허용 범위 밖에서 콘텐츠를 복사하는 것을 금지한다.
- 콘텐츠를 대량으로 내려받거나 bulk feed를 만드는 것을 금지한다.
- 비슷한 서비스에 쓰려고 Google 지도로 "지도 관련 데이터셋"이나 "업체 목록 데이터베이스"를 만들거나 보강하는 것을 금지한다.
- 따라서 Google 지도에서 좌표나 주소를 옮겨 적는 것은 이 프로젝트에서 쓸 수 없다. 길찾기 링크(`https://www.google.com/maps/dir/?api=1&destination={lat},{lng}`, F3)는 사용자를 Google 지도로 보내는 것이라 데이터를 가져오는 것이 아니다.

**OSM 저작권·라이선스** — https://www.openstreetmap.org/copyright
- OSM의 귀속 표시(attribution notice)를 보여야 한다.
- 데이터가 ODbL로 제공된다는 것을 밝혀야 하며, 저작권 페이지 링크로 이를 충족할 수 있다.
- OSM 데이터를 바꾸거나 그 위에 쌓은 결과는 같은 라이선스로만 배포할 수 있다(share-alike).

**OSMF 커뮤니티 가이드라인**
- Substantial 가이드라인: "100개 미만의 feature"는 상당한(substantial) 추출이 아니다. 100개를 넘더라도 자기 기준에 따른 비체계적 일회성 추출이면 예외가 될 수 있다. 다만 반복된 작은 추출은 "하나의 큰 추출"로 본다. (https://osmfoundation.org/wiki/Licence/Community_Guidelines/Substantial_-_Guideline)
- Geocoding 가이드라인: 개별 지오코딩 결과는 상당하지 않은 추출이다. 다음 조건을 지키면 다른 데이터와 함께 저장해도 share-alike 영향이 없다. 결과에 이름·주소·위경도만 들어 있을 것, 도시 규모 이상에서 한 종류의 feature를 체계적으로 모은 것이 아닐 것, 범용 지리 DB로 쓰지 않을 것. OSM을 쓰는 지오코더와 그것을 쓰는 앱은 OSM을 표기해야 한다. (https://osmfoundation.org/wiki/Licence/Community_Guidelines/Geocoding_-_Guideline)

**Nominatim(OSM 공식 지오코더) 이용 정책** — https://operations.osmfoundation.org/policies/nominatim/
- 초당 최대 1건이다. 앱을 식별하는 User-Agent나 Referer를 보내야 한다. 결과는 캐시해야 한다. 대량 지오코딩은 권장하지 않으며, 작은 일회성 작업은 한 머신의 단일 스레드로 해야 한다. 표기 의무가 있다.

## 결정

1. **좌표 출처는 둘뿐이다.**
   - `osm`: OSM에 있는 카페 노드/웨이의 좌표. `osm_id`(예: `node/123456`)를 함께 적는다.
   - `geocoded`: 카페 공식 사이트·SNS 같은 **공개된 주소**를 지오코딩한 좌표.
2. **Google 지도·Google 검색 결과에서 좌표나 주소를 옮기지 않는다.** 주소 텍스트(`address_en`/`address_ja`)도 카페 자신의 공개 자료에서 가져온다.
3. **지오코딩은 수작업 + 일회성으로 한다.** Nominatim을 쓴다면 정책(초당 1건, 식별 가능한 User-Agent, 결과 캐시)을 지킨다. 결과는 시트에 저장하고, 같은 주소를 다시 조회하지 않는다. 어떤 지오코더를 쓸지는 열린 질문으로 남긴다.
4. **표기:** SC-05와 사이트 푸터에서 OSM 귀속 표시와 ODbL 안내를 하고, https://www.openstreetmap.org/copyright 로 링크한다. 지오코더가 따로 요구하는 표기가 있으면 함께 적는다.
5. **share-alike 판단 (현행 범위):** 런치 범위는 독립 카페 25~30곳과 체인 매장 몇십 곳이다. 창업자가 고른 비체계적 목록이고, 저장하는 것은 이름·주소·좌표뿐이다. 위 가이드라인 기준으로 **상당한 추출이 아니라고 판단**하여, `data/*.csv` 전체를 ODbL로 배포하지는 않는다. 이 판단은 법률 자문이 아니다.
6. **재검토 조건:** 다음 중 하나가 되면 이 ADR을 대체하는 새 ADR을 쓴다.
   - `coord_source = osm`인 행이 100개를 넘을 때
   - 지역을 넓히면서 "지역의 모든 카페"를 체계적으로 OSM에서 뽑을 때
   - 데이터를 범용 데이터셋으로 내보낼 때
   그 경우의 선택지는 OSM에서 온 좌표 열을 ODbL로 따로 배포하거나 전체 CSV를 ODbL로 배포하는 것이다. `coord_source`와 `osm_id`를 행마다 남기는 것은 이때 OSM 유래 행을 분리할 수 있게 하려는 것이다.
7. **역 좌표**(`stations`)는 PRD §9대로 M1에서 OSM, 국토수치정보, ekidata.jp 가운데 이용 조건을 확인한 뒤 고른다. 고른 출처는 `stations.source`에 적는다.

## 고려한 대안

| 대안 | 기각 이유 |
|---|---|
| Google 지도에서 좌표 복사 | 약관 위반(위 사실). OSM 데이터와 섞이면 정리하기도 어렵다 |
| Google Geocoding API | 결과 저장·표시에 Google 쪽 조건이 따르고 API 키·과금 계정이 필요하다(자세한 약관은 이 문서에서 확인하지 않음). PRD가 이미 Google을 배제했다 |
| 전체 데이터를 처음부터 ODbL로 공개 | 가능하고 수익화 계획도 없으므로 손해는 작다. 하지만 현재 규모에서는 필요 없다고 판단했다. 재검토 조건에 해당하면 우선 선택지가 된다 |
| 좌표 없이 역만 저장 | "Near me" 정렬(F1)을 할 수 없다 |

## 결과

**좋은 점**
- 약관 위반 위험이 없다. 좌표마다 출처가 추적된다.
- 규모가 커질 때 라이선스 판단을 다시 할 기준이 분명하다.

**나쁜 점 / 감수할 것**
- OSM에 없는 카페는 지오코딩해야 한다. 일본 주소 지오코딩은 건물 단위까지 정확하지 않을 수 있다. 그래서 검증 스크립트가 좌표 범위와 역에서 떨어진 거리를 경고로 확인한다.
- share-alike 판단은 커뮤니티 가이드라인에 기댄 해석이다. 법적 확정이 아니다.
