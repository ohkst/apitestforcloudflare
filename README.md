# Cloudflare D1 마케팅 페이지 서비스 실행 가이드

이 프로젝트는 Hono와 D1을 사용하여 마케팅 페이지를 생성하고 게시하는 Cloudflare Worker 애플리케이션입니다.

## 사전 요구 사항
- Cloudflare 계정 (Free Plan 가능)
- `npm` 설치됨
- `wrangler` 인증됨 (`npx wrangler login`)

> [!NOTE]
> 이 프로젝트는 Cloudflare Free Plan의 무료 할당량(Workers 10만 요청/일, D1 5GB 스토리지) 내에서 충분히 운영 가능합니다.

## 설정 방법

### 1. D1 데이터베이스 생성 (완료됨)
AI Agent가 이미 데이터베이스를 생성하고 `wrangler.toml`을 업데이트했습니다.

### 2. 설정 업데이트 (완료됨)
`wrangler.toml` 파일이 이미 업데이트되었습니다.

### 3. 데이터베이스 초기화 (완료됨)
AI Agent가 스키마를 로컬 및 원격 데이터베이스에 적용했습니다.

### 4. 로컬 실행
개발 서버를 시작하여 확인해 볼 수 있습니다:
```bash
npx wrangler dev
```

### 5. 배포 (완료됨)
AI Agent가 Cloudflare Workers에 배포를 완료했습니다.
**배포된 URL**: [https://cloudflare-d1-demo.ohkst2.workers.dev](https://cloudflare-d1-demo.ohkst2.workers.dev)

또한 GitHub Actions가 설정되어 있어, 향후 `main` 브랜치에 푸시하면 자동으로 배포됩니다.
1.  GitHub 저장소의 **Settings > Secrets and variables > Actions**로 이동합니다.
2.  다음 두 가지 Repository Secret을 추가합니다:
    - `CLOUDFLARE_API_TOKEN`:
        1. [Cloudflare 대시보드 > 내 프로필 > API 토큰](https://dash.cloudflare.com/profile/api-tokens)으로 이동합니다.
        2. **Create Token** 버튼을 클릭합니다.
        3. **API token templates** 목록에서 **Edit Cloudflare Workers** 템플릿의 **Use template** 버튼을 클릭합니다.
        4. **Account Resources**와 **Zone Resources**가 올바르게 선택되었는지 확인하고(기본값 유지 가능), 맨 아래 **Continue to summary**를 클릭합니다.
        5. **Create Token**을 클릭하고 생성된 토큰을 복사합니다. (이때만 볼 수 있습니다!)
    - `CLOUDFLARE_ACCOUNT_ID`: `6716e0cef85636bfd8b20833e829c8bd` (사용자의 계정 ID)
3.  이제 `main` 브랜치에 코드를 푸시하거나, GitHub Actions 탭에서 실패한 워크플로우를 **Re-run** 하면 배포가 성공할 것입니다.

## 기능 사용법
1.  **관리자 대시보드**: `/admin`으로 이동하여 새 사이트를 생성합니다.
2.  **사이트 편집**: 생성된 사이트의 "Edit" 버튼을 눌러 콘텐츠(히어로, 소개 등)를 수정합니다.
3.  **공개 사이트 확인**: `/site/[slug]` 주소로 접속하여 게시된 사이트를 확인합니다.
5.  **기능 확장**:
    - **게시판**: 대시보드에서 공지사항을 작성하고 공개 사이트에서 확인할 수 있습니다.
    - **레이아웃 관리**: 대시보드에서 섹션 순서를 변경(예: `hero,about,board,contact`)하여 사이트 구성을 바꿀 수 있습니다.
    - **상품/위치**: 상품 목록과 위치 정보를 추가할 수 있습니다.
