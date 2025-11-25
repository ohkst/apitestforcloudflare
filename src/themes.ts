// Theme-specific CSS styles for different templates
export const getThemeStyles = (templateId: string = 'default') => {
    const baseStyles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
    }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
    .section { padding: 4rem 0; }
    img { max-width: 100%; height: auto; display: block; }
  `;

    const themes: Record<string, string> = {
        default: `
      ${baseStyles}
      body { color: #1f2937; background: #ffffff; }
      .hero { 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 6rem 2rem; 
        text-align: center; 
        color: white;
      }
      .hero h1 { font-size: clamp(2.5rem, 6vw, 4rem); margin-bottom: 1rem; font-weight: 800; }
      .hero p { font-size: 1.5rem; max-width: 600px; margin: 0 auto; }
      .section h2 { font-size: 2rem; margin-bottom: 2rem; text-align: center; }
      .card { 
        background: white; 
        border: 1px solid #e5e7eb; 
        border-radius: 0.5rem; 
        padding: 1.5rem;
        margin-bottom: 1.5rem;
      }
      @media (max-width: 768px) {
        .hero { padding: 4rem 1.5rem; }
        .section { padding: 3rem 0; }
      }
    `,

        modern: `
      ${baseStyles}
      body { color: #1f2937; background: #f8fafc; }
      .hero {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 8rem 2rem;
        text-align: center;
        color: white;
        position: relative;
      }
      .hero-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
      }
      .hero-content { position: relative; z-index: 1; }
      .hero h1 { font-size: clamp(3rem, 7vw, 5rem); margin-bottom: 1.5rem; font-weight: 900; }
      .hero p { font-size: 1.75rem; max-width: 700px; margin: 0 auto; }
      .section { padding: 5rem 0; }
      .section h2 { 
        font-size: 2.5rem; 
        text-align: center; 
        margin-bottom: 3rem;
        font-weight: 700;
        color: #667eea;
      }
      .section-image {
        width: 100%;
        max-width: 800px;
        margin: 2rem auto;
        border-radius: 1rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      }
      .card {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        transition: transform 0.2s;
      }
      .card:hover { transform: translateY(-4px); }
      @media (max-width: 768px) {
        .hero { padding: 5rem 1.5rem; }
        .section { padding: 3rem 0; }
      }
    `,

        bold: `
      ${baseStyles}
      body { color: #0f172a; background: #fafafa; }
      .hero {
        background: linear-gradient(to right, #dc2626, #f59e0b);
        padding: 10rem 2rem;
        text-align: center;
        color: white;
        position: relative;
      }
      .hero-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.2;
      }
      .hero-content { position: relative; z-index: 1; }
      .hero h1 {
        font-size: clamp(3.5rem, 9vw, 6rem);
        margin-bottom: 2rem;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: -3px;
      }
      .hero p { font-size: 2rem; max-width: 800px; margin: 0 auto; font-weight: 700; }
      .section { padding: 6rem 0; border-bottom: 4px solid #dc2626; }
      .section h2 {
        font-size: 3rem;
        font-weight: 900;
        text-transform: uppercase;
        color: #dc2626;
        text-align: center;
        margin-bottom: 3rem;
      }
      .section-image {
        width: 100%;
        max-width: 900px;
        margin: 2rem auto;
        border: 4px solid #dc2626;
        box-shadow: 12px 12px 0 #f59e0b;
      }
      .card {
        background: white;
        padding: 3rem;
        border: 4px solid #dc2626;
        box-shadow: 8px 8px 0 #f59e0b;
      }
      @media (max-width: 768px) {
        .hero { padding: 6rem 1.5rem; }
        .section { padding: 4rem 0; }
      }
    `,

        minimal: `
      ${baseStyles}
      body { color: #374151; background: white; font-family: 'Georgia', serif; }
      .hero {
        background: white;
        padding: 8rem 2rem 4rem;
        text-align: center;
        border-bottom: 1px solid #e5e7eb;
      }
      .hero-image {
        max-width: 600px;
        margin: 0 auto 2rem;
        border-radius: 0;
      }
      .hero h1 {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        margin-bottom: 1.5rem;
        font-weight: 300;
        color: #111827;
        letter-spacing: -1px;
      }
      .hero p { font-size: 1.3rem; max-width: 600px; margin: 0 auto; font-weight: 300; }
      .section { padding: 5rem 0; border-bottom: 1px solid #e5e7eb; }
      .section h2 {
        font-size: 2rem;
        font-weight: 400;
        margin-bottom: 2rem;
        color: #111827;
      }
      .section-image {
        max-width: 700px;
        margin: 2rem auto;
        border-radius: 0;
      }
      .card {
        background: white;
        border: 1px solid #e5e7eb;
        padding: 2rem;
        margin-bottom: 2rem;
      }
      @media (max-width: 768px) {
        .hero { padding: 5rem 1.5rem 3rem; }
        .section { padding: 3rem 0; }
      }
    `
    };

    return themes[templateId] || themes.default;
};
