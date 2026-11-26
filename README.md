# anyone-can-build-coffee

일본에서 **에스프레소 머신으로 커피를 내리는 카페**를, 반자동인지 전자동인지까지 가기 전에 확인할 수 있는 영어·일본어 카페 리스트를 기획하는 학부생 사이드 프로젝트예요. 핸드드립·사이폰 같은 다른 추출 방식도 함께 기록하고, 일본 곳곳에 있는 체인 카페의 특징도 정리해요.

A hobby project planning a bilingual (EN/JA) list of cafes in Japan that make espresso-based coffee on a machine — and which kind of machine — plus a guide to Japan's coffee chains.

## 현재 상태

- **M1 개발 시작.** 최신 기획 문서는 [PRD v0.6](docs/prd/PRD-v0.6.md), 첫 구현 계획은 [사이트 뼈대](docs/plans/01-skeleton.md)예요. 지금 사이트는 **샘플 데이터**로 돌아가요.
- **M0 조사와 M1 개발을 동시에 진행해요.** M0는 인터뷰 3명, 카페 30곳 에스프레소 불확실성 테스트, 공유 리스트 반응을 봐요. 진행 기준을 통과해야 공개 출시(M2)를 해요.
- 사이트 주소(배포 후): https://underthesun7213.github.io/anyone-can-build-coffee/

## 로컬에서 실행

Node 24 이상이 필요해요.

```bash
npm install
npm run validate   # data/의 CSV 4개 검사
npm run dev        # 개발 서버
npm run check      # 검사 → 빌드 → 테스트 (PR 검사와 같아요)
```

- 데이터: `data/`의 `cafes.csv`, `chains.csv`, `methods.csv`, `stations.csv` ([PRD §9](docs/prd/PRD-v0.6.md), [검증 규칙](docs/architecture/data-validation.md)). 데이터만 고쳐도 PR을 거쳐요.
- PR마다 `ci` 검사가 돌고, `main`에 병합하면 GitHub Pages에 배포돼요. 검사가 실패하면 배포하지 않아요.

## 문서

| 버전 | PRD | 리뷰 |
|---|---|---|
| v0.1 | [PRD-v0.1](docs/prd/PRD-v0.1.md) | [CEO](docs/reviews/v0.1/1-CEO.md) · [CPO](docs/reviews/v0.1/2-CPO.md) · [CMO](docs/reviews/v0.1/3-CMO.md) · [CFO](docs/reviews/v0.1/4-CFO.md) · [CTO](docs/reviews/v0.1/5-CTO.md) |
| v0.2 | [PRD-v0.2](docs/prd/PRD-v0.2.md) | [CEO](docs/reviews/v0.2/1-CEO.md) · [CPO](docs/reviews/v0.2/2-CPO.md) · [CMO](docs/reviews/v0.2/3-CMO.md) · [CFO](docs/reviews/v0.2/4-CFO.md) · [CTO](docs/reviews/v0.2/5-CTO.md) |
| v0.3 | [PRD-v0.3](docs/prd/PRD-v0.3.md) | [Planner (handoff readiness)](docs/reviews/v0.3/planner.md) |
| v0.4 | [PRD-v0.4](docs/prd/PRD-v0.4.md) | — |
| v0.5 | [PRD-v0.5](docs/prd/PRD-v0.5.md) | [CEO](docs/reviews/v0.5/1-CEO.md) · [CPO](docs/reviews/v0.5/2-CPO.md) · [CMO](docs/reviews/v0.5/3-CMO.md) · [CFO](docs/reviews/v0.5/4-CFO.md) · [CTO](docs/reviews/v0.5/5-CTO.md) |
| v0.6 | [PRD-v0.6](docs/prd/PRD-v0.6.md) | — |

## 조사

- [일본 카페 문화의 역사](docs/research/japan-cafe-history.md)
- [일본 커피 시장과 카페 현황](docs/research/japan-coffee-market.md)
- [체인 카페 가이드 조사](docs/research/chains.md) (상세: [A](docs/research/chains-data-a.md) · [B](docs/research/chains-data-b.md))
- [Google Ask Maps 경쟁 확인](docs/research/google-ask-maps.md)

## 기획 방식

1. PRD를 쓴다.
2. C레벨 페르소나 5명(CEO·CPO·CMO·CFO·CTO)이 **서로 맥락 없이 PRD만 보고** 적대적으로 리뷰한다.
3. 창업자가 지적마다 동의 · 일부 · 반대로 판정하고 메모를 남긴다([review-docket.html](docs/review-docket.html)). 판정 데이터 자체는 이 레포에 없어요.
4. 판정을 반영해 다음 버전을 쓴다. 반대한 지적은 PRD에 이유와 함께 남긴다.
5. 전략이 안정되면 planner가 "바로 만들 수 있나"를 점검한다.
