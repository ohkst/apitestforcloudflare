import { getThemeStyles } from './themes'
import { renderSectionByTemplate } from './templates'

export const styles = `
  :root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --bg: #f8fafc;
    --text: #0f172a;
    --text-muted: #64748b;
    --border: #e2e8f0;
    --white: #ffffff;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: var(--bg);
    color: var(--text);
    margin: 0;
    line-height: 1.5;
  }
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary);
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .btn:hover {
    background-color: var(--primary-dark);
  }
  .card {
    background: var(--white);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    box-sizing: border-box;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-muted);
  }
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: var(--white);
    border-bottom: 1px solid var(--border);
  }
  .nav a {
    color: var(--text);
    text-decoration: none;
    font-weight: 600;
  }
  @media (max-width: 600px) {
    .container { padding: 1rem; }
    .nav { padding: 1rem; }
    h1 { font-size: 2rem; }
  }
`;

export const layout = (title: string, content: string) => `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${styles}</style>
</head>
<body>
  ${content}
</body>
</html>
`;

export const landingTemplate = () => layout('DLDesign - 나만의 사이트 만들기', `
  <nav class="nav">
    <a href="/">DLDesign</a>
    <a href="/admin">대시보드</a>
  </nav>
  <div class="container" style="text-align: center; padding-top: 4rem;">
    <h1 style="font-size: 3.5rem; margin-bottom: 1.5rem; background: linear-gradient(to right, #2563eb, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
      비즈니스를 온라인으로 시작하세요
    </h1>
    <p style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
      몇 분 만에 중소기업을 위한 전문적인 마케팅 페이지를 만드세요. 코딩이 필요 없습니다.
    </p>
    <a href="/admin" class="btn" style="font-size: 1.25rem; padding: 1rem 2rem;">무료로 시작하기</a>
    
    <div style="margin-top: 4rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; text-align: left;">
      <div class="card">
        <h3>🚀 빠르고 간편함</h3>
        <p>양식만 작성하면 사이트가 즉시 게시됩니다.</p>
      </div>
      <div class="card">
        <h3>📱 모바일 최적화</h3>
        <p>모든 기기에서 자동으로 멋지게 보입니다.</p>
      </div>
      <div class="card">
        <h3>💌 리드(문의) 수집</h3>
        <p>고객의 관심을 포착하기 위한 문의 양식이 내장되어 있습니다.</p>
      </div>
    </div>
  </div>
`);

export const dashboardTemplate = (sites: any[]) => layout('대시보드 - DLDesign', `
  <nav class="nav">
    <a href="/">DLDesign</a>
    <span>환영합니다, 사용자님</span>
  </nav>
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <h1>내 사이트</h1>
      <button onclick="document.getElementById('createModal').showModal()" class="btn">새 사이트 만들기</button>
    </div>

    ${sites.length === 0 ? `
      <div class="card" style="text-align: center; padding: 4rem;">
        <p style="color: var(--text-muted);">아직 생성된 사이트가 없습니다.</p>
      </div>
    ` : `
      <div style="display: grid; gap: 1.5rem;">
        ${sites.map(site => `
          <div class="card" style="margin-bottom: 0; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0 0 0.5rem 0;">${site.title}</h3>
              <a href="/site/${site.slug}" target="_blank" style="color: var(--primary);">/site/${site.slug}</a>
            </div>
            <div>
              <a href="/admin/site/${site.slug}/edit" class="btn" style="background-color: white; color: var(--text); border: 1px solid var(--border);">편집</a>
            </div>
          </div>
        `).join('')}
      </div>
    `}

    <dialog id="createModal" style="border: none; border-radius: 1rem; padding: 2rem; width: 100%; max-width: 500px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
      <h2 style="margin-top: 0;">새 사이트 생성</h2>
      <form method="POST" action="/api/admin/sites">
        <label>사이트 제목</label>
        <input type="text" name="title" required placeholder="예: 철수의 커피숍" />
        
        <label>URL 슬러그 (주소)</label>
        <input type="text" name="slug" required placeholder="예: chulsu-coffee" pattern="[a-z0-9-]+" title="영문 소문자, 숫자, 하이픈만 가능합니다" />
        
        <label>템플릿 선택</label>
        <select name="template_id" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.5rem; margin-bottom: 1rem;">
          <option value="default">기본 (Default)</option>
          <option value="modern">모던 (Modern)</option>
          <option value="bold">볼드 (Bold)</option>
          <option value="minimal">미니멀 (Minimal)</option>
        </select>
        
        <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem;">
          <button type="button" onclick="this.closest('dialog').close()" class="btn" style="background-color: transparent; color: var(--text-muted);">취소</button>
          <button type="submit" class="btn">사이트 생성</button>
        </div>
      </form>
    </dialog>
  </div>
`);

export const editorTemplate = (site: any, content: any, posts: any[], layoutConfig: string[]) => layout(`${site.title} 편집`, `
  <nav class="nav">
    <a href="/admin">← 대시보드로 돌아가기</a>
    <span>편집 중: <strong>${site.title}</strong></span>
  </nav>
  <div class="container">
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
      <div>
        <div class="card" style="background: #f0f9ff; border: 1px solid #bae6fd;">
          <h2>레이아웃 설정</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">아래 목록을 편집하여 섹션 순서를 변경하세요. 쉼표로 구분합니다.</p>
          <form action="/api/admin/sites/${site.slug}/layout" method="POST">
             <label>섹션 순서</label>
             <input type="text" name="order" value="${layoutConfig.join(',')}" placeholder="hero,about,business,product,location,board,contact" />
             <button type="submit" class="btn" style="padding: 0.5rem 1rem; font-size: 0.9rem;">레이아웃 업데이트</button>
          </form>
        </div>

        <form action="/api/admin/sites/${site.slug}/content" method="POST">
          <div class="card">
            <h2>히어로 섹션 (메인)</h2>
            <label>헤드라인</label>
            <input type="text" name="hero_headline" value="${content.hero?.headline || ''}" placeholder="비즈니스를 나타내는 멋진 문구" />
            <label>서브 헤드라인</label>
            <input type="text" name="hero_subheadline" value="${content.hero?.subheadline || ''}" placeholder="무엇을 하는 곳인지 짧게 설명" />
            <label>배경 이미지 URL (선택사항)</label>
            <input type="text" name="hero_image" value="${content.hero?.image || ''}" placeholder="https://example.com/image.jpg" />
          </div>

          <div class="card">
            <h2>회사 소개</h2>
            <label>소개글</label>
            <textarea name="about_text" rows="4" placeholder="회사의 이야기를 들려주세요...">${content.about?.text || ''}</textarea>
            <label>대표 이미지 URL (선택사항)</label>
            <input type="text" name="about_image" value="${content.about?.image || ''}" placeholder="https://example.com/image.jpg" />
          </div>

          <div class="card">
            <h2>사업 내용</h2>
            <label>제목</label>
            <input type="text" name="business_title" value="${content.business?.title || ''}" />
            <label>내용</label>
            <textarea name="business_content" rows="4">${content.business?.content || ''}</textarea>
            <label>관련 이미지 URL (선택사항)</label>
            <input type="text" name="business_image" value="${content.business?.image || ''}" placeholder="https://example.com/image.jpg" />
          </div>

          <div class="card">
            <h2>상품 소개</h2>
            <label>상품 목록 (형식: 이름|가격, 줄바꿈으로 구분)</label>
            <textarea name="product_items" rows="5" placeholder="아메리카노|3,500원\n카페라떼|4,000원">${(content.product?.items || []).map((i: any) => `${i.name}|${i.price}`).join('\n')}</textarea>
          </div>

          <div class="card">
            <h2>위치 정보</h2>
            <label>주소</label>
            <input type="text" name="location_address" value="${content.location?.address || ''}" />
          </div>

          <div class="card">
            <h2>연락처 설정</h2>
            <label>문의 받을 이메일</label>
            <input type="email" name="contact_email" value="${content.contact?.email || ''}" />
          </div>

          <button type="submit" class="btn" style="width: 100%;">모든 변경사항 저장</button>
        </form>
      </div>

      <div>
        <div class="card">
          <h2>공지사항 / 게시판</h2>
          <form action="/api/admin/sites/${site.slug}/posts" method="POST" style="margin-bottom: 2rem;">
            <label>제목</label>
            <input type="text" name="title" required />
            <label>내용</label>
            <textarea name="content" rows="3" required></textarea>
            <button type="submit" class="btn" style="width: 100%;">게시글 작성</button>
          </form>

          <h3>최근 게시글</h3>
          ${posts.length === 0 ? '<p style="color: var(--text-muted);">아직 게시글이 없습니다.</p>' : `
            <ul style="list-style: none; padding: 0;">
              ${posts.map(post => `
                <li style="border-bottom: 1px solid var(--border); padding: 0.5rem 0;">
                  <strong>${post.title}</strong>
                  <p style="margin: 0.25rem 0; font-size: 0.9rem; color: var(--text-muted);">${post.content}</p>
                </li>
              `).join('')}
            </ul>
          `}
        </div>
      </div>
    </div>
  </div>
`);

const renderSection = (type: string, content: any, site: any, posts: any[]) => {
  switch (type) {
    case 'hero':
      return `
        <div class="hero">
          <h1>${content.hero?.headline || site.title}</h1>
          <p>${content.hero?.subheadline || '저희 웹사이트에 오신 것을 환영합니다'}</p>
        </div>
      `;
    case 'about':
      return `
        <div class="section">
          <h2>회사 소개</h2>
          <div style="max-width: 700px; margin: 0 auto; text-align: center;">
            <p>${content.about?.text || '에디터에서 회사 소개를 작성해주세요.'}</p>
          </div>
        </div>
      `;
    case 'business':
      return `
        <div class="section">
          <h2>${content.business?.title || '사업 내용'}</h2>
          <div style="max-width: 700px; margin: 0 auto; text-align: center;">
            <p>${content.business?.content || '사업에 대한 설명을 작성해주세요.'}</p>
          </div>
        </div>
      `;
    case 'product':
      return `
        <div class="section">
          <h2>상품 소개</h2>
          <div class="grid">
            ${(content.product?.items || []).length > 0 ?
          content.product.items.map((item: any) => `
                <div class="card" style="text-align: center;">
                  <h3>${item.name}</h3>
                  <p style="font-size: 1.25rem; font-weight: bold; color: var(--primary);">${item.price}</p>
                </div>
              `).join('') :
          '<p style="text-align: center; width: 100%;">등록된 상품이 없습니다.</p>'
        }
          </div>
        </div>
      `;
    case 'location':
      const address = content.location?.address || '주소를 입력해주세요';
      const encodedAddress = encodeURIComponent(address);
      return `
        <div class="section">
          <h2>오시는 길</h2>
          <div style="max-width: 800px; margin: 0 auto;">
            <p style="font-size: 1.2rem; text-align: center; margin-bottom: 2rem;">📍 ${address}</p>
            ${address !== '주소를 입력해주세요' ? `
              <div style="width: 100%; height: 400px; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameborder="0" 
                  style="border:0"
                  src="https://www.google.com/maps?q=${encodedAddress}&output=embed"
                  allowfullscreen>
                </iframe>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    case 'board':
      return `
        <div class="section">
          <h2>공지사항</h2>
          <div class="grid">
            ${posts.length > 0 ?
          posts.map(post => `
                <div class="card">
                  <h3>${post.title}</h3>
                  <p style="color: #666; font-size: 0.9rem;">${new Date(post.created_at).toLocaleDateString()}</p>
                  <p>${post.content}</p>
                </div>
              `).join('') :
          '<p style="text-align: center; width: 100%;">게시글이 없습니다.</p>'
        }
          </div>
        </div>
      `;
    case 'contact':
      return `
        <div class="section" style="border-bottom: none;">
          <h2>문의하기</h2>
          <div class="contact-form">
            <form action="/api/site/${site.slug}/lead" method="POST">
              <label>이름</label>
              <input type="text" name="name" required />
              
              <label>이메일</label>
              <input type="email" name="email" required />
              
              <label>메시지</label>
              <textarea name="message" rows="4" required></textarea>
              
              <button type="submit">메시지 보내기</button>
            </form>
          </div>
        </div>
      `;
    default:
      return '';
  }
};

export const userSiteTemplate = (site: any, content: any, posts: any[], layoutConfig: string[]) => `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${site.title}</title>
  <style>
    ${getThemeStyles(site.template_id || 'default')}
  </style>
</head>
<body>
  ${layoutConfig.map(type => renderSectionByTemplate(site.template_id || 'default', type.trim(), content, site, posts)).join('')}
  
  <footer style="text-align: center; padding: 2rem; background: #1f2937; color: #9ca3af; font-size: 0.9rem;">
    <p>&copy; ${new Date().getFullYear()} ${site.title}. Powered by <a href="/" style="color: #d1d5db;">DLDesign</a></p>
  </footer>
</body>
</html>
`;
