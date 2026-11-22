# 개발 컨벤션

- 상태: 제안됨 · 작성일: 2026-11-20
- 근거: 이 레포의 git 이력(일반 커밋 6개, 머지 커밋 3개 — 그중 PR #2·#3은 메시지로 확인, 로컬 브랜치 reflog), [README](../../README.md), [PRD v0.6](../prd/PRD-v0.6.md), [ADR-0002](../adr/0002-four-sheet-data-model-and-csv-build.md)·[0005](../adr/0005-static-site-generator-astro.md)·[0006](../adr/0006-hosting-github-pages.md)

이 문서는 두 가지를 구분해서 적는다.
- **현행**: git 이력과 레포에서 실제로 확인한 관례
- **제안**: 코드가 생길 때 적용할 규칙

## 1. 현행 관례 (git 이력에서 추출)

### 1.1 브랜치

| 브랜치 | 용도 | 결과 |
|---|---|---|
| `main` | 기본 브랜치 | — |
| `docs/prd-v0.5-espresso-first` | PRD v0.5 | main에 머지됨 (PR 번호는 로컬 이력으로 확인 못 함, #1로 추정) |
| `docs/prd-v0.6` | v0.5 리뷰 + PRD v0.6 | PR #2로 머지 |
| `docs/m0-m1-parallel` | PRD v0.6 수정 | PR #3으로 머지 |
| `docs/architecture` | 이 설계 문서들 | 진행 중 |

- 형식은 **`<종류>/<짧은-kebab-case-주제>`** 다. 지금까지는 모두 `docs/`였다.
- 처음 두 커밋(PRD v0.1~v0.4, Ask Maps 테스트 추가)은 main에 바로 들어갔다. 그 뒤로는 모두 **브랜치 → PR → main 머지**로 진행했다.
- 머지는 GitHub의 **머지 커밋** 방식이다(`Merge pull request #N from <owner>/<branch>`). squash나 rebase 머지 흔적은 없다.
- 머지 후 로컬 main은 `git pull --ff-only origin main`으로 갱신하고, 다음 브랜치를 main에서 새로 딴다.

### 1.2 커밋 메시지

실제 메시지:
```
Add PRD v0.1–v0.4 and review rounds
Add Google Ask Maps test to M0
Add PRD v0.5: espresso first, chain guide
Add five-persona reviews of PRD v0.5
Add PRD v0.6 from decisions on the v0.5 reviews
Run M0 and M1 in parallel in PRD v0.6
```
- **영어, 명령형 동사로 시작**(Add, Run), 첫 글자 대문자, 끝에 마침표 없음.
- Conventional Commits 접두사(`feat:`, `docs:`)는 **쓰지 않는다.** 종류는 브랜치 이름에 드러난다.
- 제목 한 줄, 대략 60자 이내. 세부 내용은 콜론 뒤에 짧게 붙인다(`Add PRD v0.5: espresso first, chain guide`).
- 한 커밋에 하나의 논리 단위를 담는다. 예를 들어 리뷰 추가와 PRD 추가는 같은 브랜치 안에서 커밋을 나눴다.

### 1.3 문서 위치와 이름

| 위치 | 내용 | 이름 규칙 | 언어 |
|---|---|---|---|
| `README.md` | 프로젝트 소개, 현재 상태, 문서 목록 | — | 한국어 + 영어 한 단락 |
| `docs/prd/` | PRD | `PRD-v{major}.{minor}.md`. 새 버전은 새 파일이다. 같은 버전 안의 작은 수정은 상태 줄에 `Revised {date}: …`를 적고 파일을 고친다(v0.6 사례) | 영어 |
| `docs/reviews/v{버전}/` | PRD 버전별 리뷰 | `{순번}-{역할}.md` (예: `5-CTO.md`), 또는 `planner.md` | 영어 |
| `docs/research/` | 조사 계획·결과 | `{주제-kebab}.md` (예: `chains.md`, `google-ask-maps.md`) | 영어 |
| `docs/review-docket.html` | 리뷰 판정 도구 | — | — |

## 2. 제안: 문서

| 위치 | 내용 | 규칙 |
|---|---|---|
| `docs/architecture/` | 설계 문서(`tech-stack.md`, `data-validation.md`, 이 파일, 이후 RFC 등) | 한국어. 식별자·경로·코드는 영어. 웹 사실에는 출처와 확인일을 적는다 |
| `docs/architecture/rfc/` | 기능 단위 기술 설계(필요할 때) | `NNNN-{제목-kebab}.md` |
| `docs/adr/` | 결정 기록 | `NNNN-{제목-kebab}.md`, 4자리 번호를 이어 간다. 한 파일에 결정 하나. 새로 쓸 때 상태는 `제안됨`이고, 승인은 창업자가 상태 줄을 바꿔서 한다. **승인된 ADR 본문은 고치지 않는다.** 결정이 바뀌면 새 ADR을 쓰고, 이전 ADR은 상태 줄만 `ADR-NNNN으로 대체됨`으로 바꾼다 |
| `docs/research/` | M0 조사 결과(인터뷰, 불확실성 테스트, 리스트 테스트, Ask Maps, 체인 조사, 역 데이터 출처 비교) | 현행 규칙 유지 |

- 설계 문서는 PRD의 절·화면·기능 ID(§n, `SC-xx`, `F1`~`F9`, `G1`~`G3`)를 근거로 적는다.
- README의 "문서" 표에 architecture/ADR 링크를 추가하는 일은 README를 바꾸는 것이라 창업자가 판단한다(열린 질문 Q4).

## 3. 제안: 브랜치와 PR

현행 `<종류>/<주제>` 형식을 그대로 넓혀 쓴다.

| 접두사 | 용도 | 예 |
|---|---|---|
| `docs/` | 기획·설계·조사 문서 | `docs/research-m0-interviews` |
| `feat/` | 기능 추가 | `feat/station-picker` |
| `fix/` | 버그 수정 | `fix/sw-offline-fallback` |
| `data/` | 시트에서 받은 CSV 갱신 | `data/2026-12-03-corrections` |
| `chore/` | 의존성, CI, 설정 | `chore/pin-astro` |

- 모든 변경은 PR로 main에 들어간다. 데이터 갱신도 마찬가지다. PR에서 검증 CI가 돌기 때문이다([data-validation.md](data-validation.md)).
- 머지 방식은 현행대로 머지 커밋이다.
- PR 하나에 주제 하나. 데이터 PR(`data/`)에는 코드 변경을 섞지 않는다. 그래야 데이터 롤백(커밋 되돌리기)이 코드에 영향을 주지 않는다.
- PR 설명에는 무엇을 왜 바꿨는지와 관련 PRD ID·ADR 번호를 적는다. 데이터 PR에는 반영한 정정 폼 응답 건수를 적는다(응답 내용·연락처는 적지 않는다).
- `main`은 언제나 배포 가능한 상태로 둔다. `main`에 push하면 배포된다(ADR-0006).

## 4. 제안: 커밋 메시지

현행 규칙을 그대로 쓴다. 영어, 명령형, 대문자 시작, 마침표 없음, 약 60자 이내, 접두사 없음.

```
Add station picker page
Fix offline fallback for /ja/ routes
Update data: 3 corrections, 1 closed cafe
Pin Astro to 7.4
```

## 5. 제안: 레포 구조 (코드가 생길 때)

```
/
├─ README.md
├─ docs/
│  ├─ prd/ reviews/ research/        # 현행
│  ├─ architecture/                  # 설계 문서
│  └─ adr/                           # 결정 기록
├─ data/                             # 시트에서 받은 CSV (커밋됨, 손으로 고치지 않음)
│  ├─ cafes.csv  chains.csv  methods.csv  stations.csv
├─ scripts/
│  ├─ fetch-sheets.ts                # 게시 CSV 4개 → data/
│  ├─ validate-data.ts               # data-validation.md 4.1~4.8
│  └─ check-dist.ts                  # data-validation.md 4.9 (빌드 후)
├─ src/
│  ├─ lib/                           # 프레임워크와 무관한 순수 TS (ADR-0005)
│  │  ├─ codes.ts                    # §5 방식, §6 출처, 상태 코드
│  │  ├─ load-data.ts                # CSV 파싱·조인·station_id 계산
│  │  └─ geo.ts                      # 하버사인 거리
│  ├─ i18n/
│  │  └─ strings.ts                  # EN/JA 문자열 한 파일 (§10)
│  ├─ layouts/
│  ├─ components/
│  ├─ client/                        # 브라우저 스크립트 (위치, 필터, 공유, F6, 언어)
│  └─ pages/
│     ├─ index.astro                 # 루트: 언어 고르기
│     ├─ 404.astro
│     └─ [lang]/
│        ├─ index.astro              # SC-01
│        ├─ stations.astro           # SC-02
│        ├─ cafe/[id].astro          # SC-03
│        ├─ list.astro               # SC-04
│        ├─ about.astro              # SC-05
│        ├─ chains/index.astro       # SC-06 목록
│        ├─ chains/[id].astro        # SC-06 상세
│        └─ offline.astro            # 오프라인 화면
├─ public/
│  ├─ manifest.webmanifest
│  ├─ sw.js
│  └─ icons/
├─ .github/workflows/
│  ├─ ci.yml                         # PR: 검증·빌드
│  └─ deploy.yml                     # main push / 수동: 검증·빌드·배포
├─ astro.config.mjs
├─ package.json  package-lock.json
└─ tsconfig.json
```

원칙:
- `data/`는 `scripts/fetch-sheets`만 쓴다. 손으로 고치지 않는다(원본은 시트).
- `src/lib/`는 Astro를 import하지 않는다. 검증 스크립트와 빌드가 같은 파싱 코드를 쓴다.
- 비밀값(시트 게시 URL 포함 여부는 열린 질문 Q2)은 레포에 두지 않는다.

## 6. 제안: 코드 스타일

| 항목 | 규칙 |
|---|---|
| 언어 | TypeScript, `strict: true` |
| 포맷 | Prettier 기본 설정(+ `prettier-plugin-astro`). 설정을 따로 고치지 않는다 |
| 검사 | `astro check`(타입). 린터는 필요해지면 추가한다 |
| 파일 이름 | kebab-case (`load-data.ts`). Astro 컴포넌트는 PascalCase (`CafeCard.astro`) |
| 데이터 식별자 | CSV 열과 코드 값은 PRD §9 그대로 snake_case (`cafe_id`, `espresso_semi`). 코드 안의 타입 필드명도 같은 이름을 써서 변환하지 않는다 |
| URL·id | kebab-case slug (`about-life-shibuya`). 경로는 PRD §7 그대로 |
| 분석 이벤트 | PRD 이름 그대로: `listed-yes/{cafe_id}`, `listed-no/{cafe_id}`, `directions/{cafe_id}` (ADR-0004) |
| localStorage 키 | `acbc:` 접두사를 붙인다(예: `acbc:lang`, `acbc:listed:{cafe_id}`). 단, GoatCounter의 `skipgc`는 도구가 정한 키라 그대로 둔다 |
| UI 문자열 | 코드에 직접 쓰지 않고 `src/i18n/strings.ts`의 키로 쓴다 (§10) |
| 의존성 | 추가할 때 PR 설명에 이유를 적는다. 클라이언트 쪽 런타임 의존성은 원칙적으로 두지 않는다 |
| 주석·문서 | 코드 주석은 영어. 설계 문서는 한국어 |

## 7. 열린 질문

- **Q1.** 데이터 갱신도 PR을 거치게 할 것인가? 이 문서는 그렇게 제안한다. main 직접 push를 허용하면 PR 검증 단계가 사라지고, 배포 워크플로의 검증만 남는다.
- **Q2.** 시트 게시 CSV URL을 레포에 평문으로 둘 것인가, Actions 비밀값/로컬 `.env`에 둘 것인가? 게시 URL은 어차피 공개 링크다. 하지만 `internal_note` 분리 전에는 노출 범위를 줄이는 편이 낫다.
- **Q3.** PR 머지 방식을 현행대로 머지 커밋으로 유지할 것인가? 데이터 PR이 많아지면 이력이 길어진다.
- **Q4.** README의 "문서" 표에 `docs/architecture/`와 `docs/adr/` 링크를 추가할 것인가? 이번 작업 범위에서는 README를 고치지 않았다.
