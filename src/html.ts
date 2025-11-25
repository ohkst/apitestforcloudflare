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
<html lang="en">
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

export const landingTemplate = () => layout('PageMaker - Create Your Site', `
  <nav class="nav">
    <a href="/">PageMaker</a>
    <a href="/admin">Dashboard</a>
  </nav>
  <div class="container" style="text-align: center; padding-top: 4rem;">
    <h1 style="font-size: 3.5rem; margin-bottom: 1.5rem; background: linear-gradient(to right, #2563eb, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
      Launch Your Business Online
    </h1>
    <p style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
      Create a professional marketing page for your small business in minutes. No coding required.
    </p>
    <a href="/admin" class="btn" style="font-size: 1.25rem; padding: 1rem 2rem;">Get Started for Free</a>
    
    <div style="margin-top: 4rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; text-align: left;">
      <div class="card">
        <h3>🚀 Fast & Simple</h3>
        <p>Just fill out a form and your site is live instantly.</p>
      </div>
      <div class="card">
        <h3>📱 Mobile Optimized</h3>
        <p>Looks great on every device, automatically.</p>
      </div>
      <div class="card">
        <h3>💌 Lead Collection</h3>
        <p>Built-in contact forms to capture customer interest.</p>
      </div>
    </div>
  </div>
`);

export const dashboardTemplate = (sites: any[]) => layout('Dashboard - PageMaker', `
  <nav class="nav">
    <a href="/">PageMaker</a>
    <span>Welcome, User</span>
  </nav>
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <h1>Your Sites</h1>
      <button onclick="document.getElementById('createModal').showModal()" class="btn">Create New Site</button>
    </div>

    ${sites.length === 0 ? `
      <div class="card" style="text-align: center; padding: 4rem;">
        <p style="color: var(--text-muted);">You haven't created any sites yet.</p>
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
              <a href="/admin/site/${site.slug}/edit" class="btn" style="background-color: white; color: var(--text); border: 1px solid var(--border);">Edit</a>
            </div>
          </div>
        `).join('')}
      </div>
    `}

    <dialog id="createModal" style="border: none; border-radius: 1rem; padding: 2rem; width: 100%; max-width: 500px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
      <h2 style="margin-top: 0;">Create New Site</h2>
      <form method="POST" action="/api/admin/sites">
        <label>Site Title</label>
        <input type="text" name="title" required placeholder="e.g. Joe's Coffee" />
        
        <label>URL Slug</label>
        <input type="text" name="slug" required placeholder="e.g. joes-coffee" pattern="[a-z0-9-]+" title="Lowercase letters, numbers, and hyphens only" />
        
        <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem;">
          <button type="button" onclick="this.closest('dialog').close()" class="btn" style="background-color: transparent; color: var(--text-muted);">Cancel</button>
          <button type="submit" class="btn">Create Site</button>
        </div>
      </form>
    </dialog>
  </div>
`);

export const editorTemplate = (site: any, content: any, posts: any[], layoutConfig: string[]) => layout(`Edit ${site.title}`, `
  <nav class="nav">
    <a href="/admin">← Back to Dashboard</a>
    <span>Editing: <strong>${site.title}</strong></span>
  </nav>
  <div class="container">
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
      <div>
        <div class="card" style="background: #f0f9ff; border: 1px solid #bae6fd;">
          <h2>Layout Settings</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Reorder sections by dragging (not implemented) or editing the list below. Separate by comma.</p>
          <form action="/api/admin/sites/${site.slug}/layout" method="POST">
             <label>Section Order</label>
             <input type="text" name="order" value="${layoutConfig.join(',')}" placeholder="hero,about,business,product,location,board,contact" />
             <button type="submit" class="btn" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Update Layout</button>
          </form>
        </div>

        <form action="/api/admin/sites/${site.slug}/content" method="POST">
          <div class="card">
            <h2>Hero Section</h2>
            <label>Headline</label>
            <input type="text" name="hero_headline" value="${content.hero?.headline || ''}" />
            <label>Subheadline</label>
            <input type="text" name="hero_subheadline" value="${content.hero?.subheadline || ''}" />
          </div>

          <div class="card">
            <h2>About Section</h2>
            <label>About Text</label>
            <textarea name="about_text" rows="4">${content.about?.text || ''}</textarea>
          </div>

          <div class="card">
            <h2>Business Content</h2>
            <label>Title</label>
            <input type="text" name="business_title" value="${content.business?.title || ''}" />
            <label>Content</label>
            <textarea name="business_content" rows="4">${content.business?.content || ''}</textarea>
          </div>

          <div class="card">
            <h2>Products</h2>
            <label>Items (Format: Name|Price, one per line)</label>
            <textarea name="product_items" rows="5" placeholder="Coffee|3.50\nBagel|2.00">${(content.product?.items || []).map((i: any) => `${i.name}|${i.price}`).join('\n')}</textarea>
          </div>

          <div class="card">
            <h2>Location</h2>
            <label>Address</label>
            <input type="text" name="location_address" value="${content.location?.address || ''}" />
          </div>

          <div class="card">
            <h2>Contact Settings</h2>
            <label>Contact Email</label>
            <input type="email" name="contact_email" value="${content.contact?.email || ''}" />
          </div>

          <button type="submit" class="btn" style="width: 100%;">Save All Changes</button>
        </form>
      </div>

      <div>
        <div class="card">
          <h2>News / Board</h2>
          <form action="/api/admin/sites/${site.slug}/posts" method="POST" style="margin-bottom: 2rem;">
            <label>Title</label>
            <input type="text" name="title" required />
            <label>Content</label>
            <textarea name="content" rows="3" required></textarea>
            <button type="submit" class="btn" style="width: 100%;">Post News</button>
          </form>

          <h3>Recent Posts</h3>
          ${posts.length === 0 ? '<p style="color: var(--text-muted);">No posts yet.</p>' : `
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
          <p>${content.hero?.subheadline || 'Welcome to our website'}</p>
        </div>
      `;
    case 'about':
      return `
        <div class="section">
          <h2>About Us</h2>
          <div style="max-width: 700px; margin: 0 auto; text-align: center;">
            <p>${content.about?.text || 'Add your about text in the editor.'}</p>
          </div>
        </div>
      `;
    case 'business':
      return `
        <div class="section">
          <h2>${content.business?.title || 'Our Business'}</h2>
          <div style="max-width: 700px; margin: 0 auto; text-align: center;">
            <p>${content.business?.content || 'Information about our business.'}</p>
          </div>
        </div>
      `;
    case 'product':
      return `
        <div class="section">
          <h2>Our Products</h2>
          <div class="grid">
            ${(content.product?.items || []).length > 0 ?
          content.product.items.map((item: any) => `
                <div class="card" style="text-align: center;">
                  <h3>${item.name}</h3>
                  <p style="font-size: 1.25rem; font-weight: bold; color: var(--primary);">${item.price}</p>
                </div>
              `).join('') :
          '<p style="text-align: center; width: 100%;">No products listed yet.</p>'
        }
          </div>
        </div>
      `;
    case 'location':
      return `
        <div class="section">
          <h2>Location</h2>
          <div style="text-align: center;">
            <p style="font-size: 1.2rem;">📍 ${content.location?.address || 'Contact us for location'}</p>
          </div>
        </div>
      `;
    case 'board':
      return `
        <div class="section">
          <h2>Latest News</h2>
          <div class="grid">
            ${posts.length > 0 ?
          posts.map(post => `
                <div class="card">
                  <h3>${post.title}</h3>
                  <p style="color: #666; font-size: 0.9rem;">${new Date(post.created_at).toLocaleDateString()}</p>
                  <p>${post.content}</p>
                </div>
              `).join('') :
          '<p style="text-align: center; width: 100%;">No news yet.</p>'
        }
          </div>
        </div>
      `;
    case 'contact':
      return `
        <div class="section" style="border-bottom: none;">
          <h2>Contact Us</h2>
          <div class="contact-form">
            <form action="/api/site/${site.slug}/lead" method="POST">
              <label>Name</label>
              <input type="text" name="name" required />
              
              <label>Email</label>
              <input type="email" name="email" required />
              
              <label>Message</label>
              <textarea name="message" rows="4" required></textarea>
              
              <button type="submit">Send Message</button>
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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${site.title}</title>
  <style>
    :root {
      --primary: #2563eb;
      --text: #1f2937;
      --bg: #ffffff;
      --bg-alt: #f3f4f6;
    }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; line-height: 1.6; color: var(--text); }
    
    /* Responsive Layout */
    .container { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; }
    
    /* Hero */
    .hero { background: var(--bg-alt); padding: 5rem 1.5rem; text-align: center; }
    .hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); margin: 0 0 1rem 0; color: #111; }
    .hero p { font-size: 1.25rem; color: #4b5563; max-width: 600px; margin: 0 auto; }
    
    /* Sections */
    .section { padding: 4rem 0; border-bottom: 1px solid #e5e7eb; }
    .section h2 { font-size: 2rem; text-align: center; margin-bottom: 3rem; color: #111; }
    
    /* Grid for Products/News */
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    
    /* Cards */
    .card { background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; }
    .card h3 { margin-top: 0; }
    
    /* Contact Form */
    .contact-form { max-width: 500px; margin: 0 auto; }
    input, textarea { width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem; box-sizing: border-box; }
    button { background: var(--primary); color: white; border: none; padding: 1rem 2rem; font-size: 1.1rem; border-radius: 0.375rem; cursor: pointer; width: 100%; }
    button:hover { opacity: 0.9; }

    /* Mobile Tweaks */
    @media (max-width: 600px) {
      .section { padding: 3rem 0; }
      .hero { padding: 3rem 1rem; }
    }
  </style>
</head>
<body>
  ${layoutConfig.map(type => renderSection(type.trim(), content, site, posts)).join('')}
  
  <footer style="text-align: center; padding: 2rem; background: #1f2937; color: #9ca3af; font-size: 0.9rem;">
    <p>&copy; ${new Date().getFullYear()} ${site.title}. Powered by <a href="/" style="color: #d1d5db;">PageMaker</a></p>
  </footer>
</body>
</html>
`;
