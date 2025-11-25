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
`;

export const layout = (title: string, content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\${title}</title>
  <style>\${styles}</style>
</head>
<body>
  \${content}
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

    \${sites.length === 0 ? `
  < div class= "card" style = "text-align: center; padding: 4rem;" >
  <p style="color: var(--text-muted);" > You haven't created any sites yet.</p>
  </div>
    ` : `
< div style = "display: grid; gap: 1.5rem;" >
\${
  sites.map(site => `
          <div class="card" style="margin-bottom: 0; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0 0 0.5rem 0;">\${site.title}</h3>
              <a href="/site/\${site.slug}" target="_blank" style="color: var(--primary);">/site/\${site.slug}</a>
            </div>
            <div>
              <a href="/admin/site/\${site.slug}/edit" class="btn" style="background-color: white; color: var(--text); border: 1px solid var(--border);">Edit</a>
            </div>
          </div>
        `).join('')
}
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

export const editorTemplate = (site: any, content: any) => layout(`Edit ${site.title}`, `
  <nav class="nav">
    <a href="/admin">← Back to Dashboard</a>
    <span>Editing: <strong>${site.title}</strong></span>
  </nav>
  <div class="container">
    <form action="/api/admin/sites/${site.slug}/content" method="POST">
      <div class="card">
        <h2>Hero Section</h2>
        <label>Headline</label>
        <input type="text" name="hero_headline" value="${content.hero?.headline || ''}" placeholder="Catchy title for your business" />
        
        <label>Subheadline</label>
        <input type="text" name="hero_subheadline" value="${content.hero?.subheadline || ''}" placeholder="Short description of what you do" />
      </div>

      <div class="card">
        <h2>About Section</h2>
        <label>About Text</label>
        <textarea name="about_text" rows="5" placeholder="Tell your story...">${content.about?.text || ''}</textarea>
      </div>

      <div class="card">
        <h2>Contact Settings</h2>
        <label>Contact Email (where leads are sent)</label>
        <input type="email" name="contact_email" value="${content.contact?.email || ''}" placeholder="you@example.com" />
      </div>

      <div style="position: sticky; bottom: 2rem; display: flex; justify-content: flex-end;">
        <button type="submit" class="btn" style="box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">Save Changes</button>
      </div>
    </form>
  </div>
`);

export const userSiteTemplate = (site: any, content: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${site.title}</title>
  <style>
    body { font-family: sans-serif; margin: 0; line-height: 1.6; color: #333; }
    .hero { background: #f3f4f6; padding: 4rem 2rem; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; color: #111; }
    .hero p { font-size: 1.5rem; color: #555; max-width: 800px; margin: 0 auto; }
    .container { max-width: 900px; margin: 0 auto; padding: 4rem 2rem; }
    .section { margin-bottom: 4rem; }
    .contact-form { background: #fff; padding: 2rem; border: 1px solid #eee; border-radius: 8px; }
    input, textarea { width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
    button { background: #2563eb; color: white; border: none; padding: 1rem 2rem; font-size: 1.1rem; border-radius: 4px; cursor: pointer; width: 100%; }
    button:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>${content.hero?.headline || site.title}</h1>
    <p>${content.hero?.subheadline || 'Welcome to our website'}</p>
  </div>

  <div class="container">
    <div class="section">
      <h2>About Us</h2>
      <p>${content.about?.text || 'Add your about text in the editor.'}</p>
    </div>

    <div class="section">
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
  </div>
  
  <footer style="text-align: center; padding: 2rem; background: #111; color: #666; font-size: 0.9rem;">
    Powered by <a href="/" style="color: #888;">PageMaker</a>
  </footer>
</body>
</html>
`;
