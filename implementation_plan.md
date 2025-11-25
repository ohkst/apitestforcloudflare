# 구현 계획: SME 마케팅 페이지 퍼블리싱 서비스

## 목표 설명
현재 데모를 사용자가 마케팅 랜딩 페이지를 생성하고 게시할 수 있는 기능적인 SaaS 플랫폼으로 전환합니다.

## 사용자 검토 필요
> [!IMPORTANT]
> 이 계획은 전체 스키마 변경을 포함합니다. `items` 테이블의 기존 데이터는 삭제/무시됩니다.

## 제안된 변경 사항

### 데이터베이스 (D1)
#### [MODIFY] [schema.sql](file:///Users/a115221/apitestforcloudflare/schema.sql)
- `items` 테이블 삭제.
- `sites` 테이블 생성 (슬러그, 제목, 소유자).
- `site_content` 테이블 생성 (히어로, 소개, 사업, 상품, 위치).
- `posts` 테이블 생성 (게시판).
- `leads` 테이블 생성 (이름, 이메일, 메시지, 사이트 ID).

### 백엔드 (Worker)
#### [MODIFY] [src/index.ts](file:///Users/a115221/apitestforcloudflare/src/index.ts)
- **공개 라우트**:
    - `GET /`: 서비스 랜딩 페이지.
    - `GET /site/:slug`: 사용자가 게시한 사이트 렌더링 (모든 섹션 포함).
    - `GET /site/:slug/board`: 게시판 목록.
    - `POST /api/site/:slug/lead`: 문의 폼 제출 처리.
- **관리자/대시보드 라우트**:
    - `GET /admin`: 대시보드 UI.
    - `POST /api/admin/sites`: 새 사이트 생성.
    - `PUT /api/admin/sites/:slug`: 사이트 콘텐츠 업데이트 (사업, 상품, 위치 포함).
    - `POST /api/admin/sites/:slug/posts`: 게시글 작성.
    - `PUT /api/admin/sites/:slug/layout`: 섹션 순서/설정 업데이트.

### 프론트엔드
#### [MODIFY] [src/html.ts](file:///Users/a115221/apitestforcloudflare/src/html.ts)
- `userSiteTemplate` 리팩토링:
    - 섹션별 렌더링 함수 분리.
    - `layout` 설정(섹션 순서 배열)에 따라 동적으로 렌더링.
    - `landingTemplate`: 메인 서비스 페이지.
    - `dashboardTemplate`: 에디터 인터페이스.
    - `userSiteTemplate`: 게시된 사용자 사이트용 템플릿.

## 검증 계획
### 자동화된 테스트
- API를 통한 사이트 생성 테스트.
- `/site/:slug`를 통한 사이트 접속 테스트.

### 수동 검증
- 대시보드를 사용하여 "Bakery" 사이트 생성.
- `/site/bakery`로 이동하여 로드되는지 확인.
- "Bakery" 사이트에서 문의 폼을 제출하고 `leads` 테이블 확인.
