import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { landingTemplate, dashboardTemplate, editorTemplate, userSiteTemplate } from './html'

type Bindings = {
    DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', cors())

// --- Public Service Routes ---

app.get('/', (c) => {
    return c.html(landingTemplate())
})

// --- Admin / Dashboard Routes ---

app.get('/admin', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM sites WHERE user_id = ? ORDER BY created_at DESC').bind(1).all()
    return c.html(dashboardTemplate(results))
})

app.post('/api/admin/sites', async (c) => {
    const body = await c.req.parseBody()
    const title = body['title'] as string
    const slug = body['slug'] as string
    const templateId = body['template_id'] as string || 'default'

    try {
        // Default layout
        const defaultLayout = ['hero', 'about', 'business', 'product', 'board', 'location', 'contact'];

        await c.env.DB.prepare('INSERT INTO sites (user_id, slug, title, template_id, theme_config) VALUES (?, ?, ?, ?, ?)')
            .bind(1, slug, title, templateId, JSON.stringify({ order: defaultLayout }))
            .run()

        // Initialize default content
        const site = await c.env.DB.prepare('SELECT id FROM sites WHERE slug = ?').bind(slug).first()
        if (site) {
            const defaults = [
                { type: 'hero', content: { headline: title, subheadline: '새로운 웹사이트에 오신 것을 환영합니다' } },
                { type: 'about', content: { text: '우리는 새로운 비즈니스입니다.' } },
                { type: 'business', content: { title: '사업 내용', content: '우수한 서비스를 제공합니다.' } },
                { type: 'product', content: { items: [] } },
                { type: 'location', content: { address: '위치 정보를 입력해주세요.' } },
                { type: 'contact', content: { email: 'admin@example.com' } }
            ];

            const stmt = c.env.DB.prepare('INSERT INTO site_content (site_id, section_type, content) VALUES (?, ?, ?)');
            await c.env.DB.batch(defaults.map(d => stmt.bind(site.id, d.type, JSON.stringify(d.content))));
        }

        return c.redirect('/admin')
    } catch (e: any) {
        return c.text(`Error: ${e.message}`, 500)
    }
})

app.get('/admin/site/:slug/edit', async (c) => {
    const slug = c.req.param('slug')
    const site = await c.env.DB.prepare('SELECT * FROM sites WHERE slug = ?').bind(slug).first()

    if (!site) return c.text('Site not found', 404)

    const contentRows = await c.env.DB.prepare('SELECT section_type, content FROM site_content WHERE site_id = ?').bind(site.id).all()
    const posts = await c.env.DB.prepare('SELECT * FROM posts WHERE site_id = ? ORDER BY created_at DESC').bind(site.id).all()

    const content: any = {}
    contentRows.results.forEach((row: any) => {
        try {
            content[row.section_type] = JSON.parse(row.content)
        } catch (e) {
            content[row.section_type] = {}
        }
    })

    let layoutConfig: string[] = [];
    try {
        const theme = JSON.parse(site.theme_config as string || '{}');
        layoutConfig = theme.order || ['hero', 'about', 'business', 'product', 'board', 'location', 'contact'];
    } catch (e) {
        layoutConfig = ['hero', 'about', 'business', 'product', 'board', 'location', 'contact'];
    }

    return c.html(editorTemplate(site, content, posts.results, layoutConfig))
})

app.post('/api/admin/sites/:slug/layout', async (c) => {
    const slug = c.req.param('slug')
    const body = await c.req.parseBody()
    const orderStr = body['order'] as string;
    const order = orderStr.split(',').map(s => s.trim()).filter(s => s);

    const site = await c.env.DB.prepare('SELECT id, theme_config FROM sites WHERE slug = ?').bind(slug).first()
    if (!site) return c.text('Site not found', 404)

    let theme: any = {};
    try {
        theme = JSON.parse(site.theme_config as string || '{}');
    } catch (e) { }

    theme.order = order;

    await c.env.DB.prepare('UPDATE sites SET theme_config = ? WHERE id = ?')
        .bind(JSON.stringify(theme), site.id)
        .run();

    return c.redirect(`/admin/site/${slug}/edit`)
})

app.post('/api/admin/sites/:slug/content', async (c) => {
    const slug = c.req.param('slug')
    const body = await c.req.parseBody()

    const site = await c.env.DB.prepare('SELECT id FROM sites WHERE slug = ?').bind(slug).first()
    if (!site) return c.text('Site not found', 404)

    // Helper to update section
    const updateSection = async (type: string, data: any) => {
        const json = JSON.stringify(data);
        const exists = await c.env.DB.prepare('SELECT 1 FROM site_content WHERE site_id = ? AND section_type = ?').bind(site.id, type).first();
        if (exists) {
            await c.env.DB.prepare('UPDATE site_content SET content = ? WHERE site_id = ? AND section_type = ?').bind(json, site.id, type).run();
        } else {
            await c.env.DB.prepare('INSERT INTO site_content (site_id, section_type, content) VALUES (?, ?, ?)').bind(site.id, type, json).run();
        }
    }

    await updateSection('hero', {
        headline: body['hero_headline'],
        subheadline: body['hero_subheadline'],
        image: body['hero_image']
    });
    await updateSection('about', {
        text: body['about_text'],
        image: body['about_image']
    });
    await updateSection('business', {
        title: body['business_title'],
        content: body['business_content'],
        image: body['business_image']
    });
    await updateSection('location', { address: body['location_address'] });
    await updateSection('contact', { email: body['contact_email'] });

    // Product items
    const productText = body['product_items'] as string || '';
    const productItems = productText.split('\n').map(line => {
        const [name, price] = line.split('|');
        return { name: name?.trim(), price: price?.trim() };
    }).filter(item => item.name);
    await updateSection('product', { items: productItems });

    return c.redirect(`/admin/site/${slug}/edit`)
})

app.post('/api/admin/sites/:slug/posts', async (c) => {
    const slug = c.req.param('slug')
    const body = await c.req.parseBody()
    const site = await c.env.DB.prepare('SELECT id FROM sites WHERE slug = ?').bind(slug).first()
    if (!site) return c.text('Site not found', 404)

    await c.env.DB.prepare('INSERT INTO posts (site_id, title, content) VALUES (?, ?, ?)')
        .bind(site.id, body['title'], body['content'])
        .run()

    return c.redirect(`/admin/site/${slug}/edit`)
})

// --- User Published Site Routes ---

app.get('/site/:slug', async (c) => {
    const slug = c.req.param('slug')
    const site = await c.env.DB.prepare('SELECT * FROM sites WHERE slug = ?').bind(slug).first()

    if (!site) return c.text('Site not found', 404)

    const contentRows = await c.env.DB.prepare('SELECT section_type, content FROM site_content WHERE site_id = ?').bind(site.id).all()
    const posts = await c.env.DB.prepare('SELECT * FROM posts WHERE site_id = ? ORDER BY created_at DESC LIMIT 5').bind(site.id).all()

    const content: any = {}
    contentRows.results.forEach((row: any) => {
        try {
            content[row.section_type] = JSON.parse(row.content)
        } catch (e) {
            content[row.section_type] = {}
        }
    })

    let layoutConfig: string[] = [];
    try {
        const theme = JSON.parse(site.theme_config as string || '{}');
        layoutConfig = theme.order || ['hero', 'about', 'business', 'product', 'board', 'location', 'contact'];
    } catch (e) {
        layoutConfig = ['hero', 'about', 'business', 'product', 'board', 'location', 'contact'];
    }

    return c.html(userSiteTemplate(site, content, posts.results, layoutConfig))
})

app.post('/api/site/:slug/lead', async (c) => {
    const slug = c.req.param('slug')
    const body = await c.req.parseBody()

    const site = await c.env.DB.prepare('SELECT id FROM sites WHERE slug = ?').bind(slug).first()
    if (!site) return c.text('Site not found', 404)

    await c.env.DB.prepare('INSERT INTO leads (site_id, customer_name, customer_email, message) VALUES (?, ?, ?, ?)')
        .bind(site.id, body['name'], body['email'], body['message'])
        .run()

    return c.html(`
    <div style="font-family: sans-serif; text-align: center; padding: 4rem;">
        <h1>메시지가 전송되었습니다!</h1>
        <p>문의해주셔서 감사합니다.</p>
        <a href="/site/${slug}">사이트로 돌아가기</a>
    </div>
  `)
})

export default app
