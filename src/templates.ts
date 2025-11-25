// Template-specific section renderers
export const renderSectionByTemplate = (
  templateId: string,
  type: string,
  content: any,
  site: any,
  posts: any[]
): string => {
  const renderers: Record<string, Function> = {
    default: renderDefaultSection,
    modern: renderModernSection,
    bold: renderBoldSection,
    minimal: renderMinimalSection
  };

  const renderer = renderers[templateId] || renderers.default;
  return renderer(type, content, site, posts);
};

// Default template (기존 디자인 유지)
function renderDefaultSection(type: string, content: any, site: any, posts: any[]): string {
  switch (type) {
    case 'hero':
      const heroStyle = content.hero?.image
        ? `background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${content.hero.image}') center/cover;`
        : 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);';
      return `
        <div class="hero" style="${heroStyle}">
          <div class="container">
            <h1>${content.hero?.headline || site.title}</h1>
            <p>${content.hero?.subheadline || '저희 웹사이트에 오신 것을 환영합니다'}</p>
          </div>
        </div>
      `;
    case 'about':
      return `
        <div class="section">
          <div class="container">
            <h2>회사 소개</h2>
            ${content.about?.image ? `<img src="${content.about.image}" alt="회사 소개" class="section-image" />` : ''}
            <p style="text-align: center; max-width: 700px; margin: 0 auto;">${content.about?.text || '에디터에서 회사 소개를 작성해주세요.'}</p>
          </div>
        </div>
      `;
    case 'business':
      return `
        <div class="section" style="background: #f8fafc;">
          <div class="container">
            <h2>${content.business?.title || '사업 내용'}</h2>
            ${content.business?.image ? `<img src="${content.business.image}" alt="사업 내용" class="section-image" />` : ''}
            <p style="text-align: center; max-width: 700px; margin: 0 auto;">${content.business?.content || '사업에 대한 설명을 작성해주세요.'}</p>
          </div>
        </div>
      `;
    case 'product':
      return `
        <div class="section">
          <div class="container">
            <h2>상품 소개</h2>
            ${(content.product?.items || []).map((item: any) => `
              <div class="card">
                <h3>${item.name}</h3>
                <p style="font-size: 1.25rem; font-weight: bold; color: #2563eb;">${item.price}</p>
              </div>
            `).join('')}
            ${(content.product?.items || []).length === 0 ? '<p style="text-align: center;">등록된 상품이 없습니다.</p>' : ''}
          </div>
        </div>
      `;
    case 'location':
      const address = content.location?.address || '주소를 입력해주세요';
      const encodedAddress = encodeURIComponent(address);
      return `
        <div class="section" style="background: #f8fafc;">
          <div class="container">
            <h2>오시는 길</h2>
            <p style="text-align: center; font-size: 1.2rem; margin-bottom: 2rem;">📍 ${address}</p>
            ${address !== '주소를 입력해주세요' ? `
              <div style="max-width: 800px; margin: 0 auto;">
                <iframe width="100%" height="400" frameborder="0" style="border:0; border-radius: 0.5rem;"
                  src="https://www.google.com/maps?q=${encodedAddress}&output=embed" allowfullscreen>
                </iframe>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    case 'board':
      return `
        <div class="section">
          <div class="container">
            <h2>공지사항</h2>
            ${posts.map(post => `
              <div class="card">
                <h3>${post.title}</h3>
                <p style="color: #666; font-size: 0.9rem;">${new Date(post.created_at).toLocaleDateString()}</p>
                <p>${post.content}</p>
              </div>
            `).join('')}
            ${posts.length === 0 ? '<p style="text-align: center;">게시글이 없습니다.</p>' : ''}
          </div>
        </div>
      `;
    case 'contact':
      return `
        <div class="section" style="background: #f8fafc;">
          <div class="container">
            <h2>문의하기</h2>
            <form action="/api/site/${site.slug}/lead" method="POST" style="max-width: 500px; margin: 0 auto;">
              <input type="text" name="name" placeholder="이름" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" />
              <input type="email" name="email" placeholder="이메일" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" />
              <textarea name="message" rows="4" placeholder="메시지" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem;"></textarea>
              <button type="submit" style="width: 100%; padding: 1rem; background: #2563eb; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">메시지 보내기</button>
            </form>
          </div>
        </div>
      `;
    default:
      return '';
  }
}

// Modern, Bold, Minimal 템플릿은 동일한 구조에 CSS만 다름
const renderModernSection = renderDefaultSection;
const renderBoldSection = renderDefaultSection;
const renderMinimalSection = renderDefaultSection;
