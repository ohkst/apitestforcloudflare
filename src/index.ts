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
    // In a real app, we would check auth here. For demo, we assume user_id = 1.
    const { results } = await c.env.DB.prepare('SELECT * FROM sites WHERE user_id = ? ORDER BY created_at DESC').bind(1).all()
    return c.html(dashboardTemplate(results))
})

app.post('/api/admin/sites', async (c) => {
    const body = await c.req.parseBody()
    const title = body['title'] as string
    const slug = body['slug'] as string

    try {
        await c.env.DB.prepare('INSERT INTO sites (user_id, slug, title) VALUES (?, ?, ?)')
            .bind(1, slug, title)
            .run()

        // Initialize default content
        const site = await c.env.DB.prepare('SELECT id FROM sites WHERE slug = ?').bind(slug).first()
        if (site) {
            await c.env.DB.prepare('INSERT INTO site_content (site_id, section_type, content) VALUES (?, ?, ?)')
                .bind(site.id, 'hero', JSON.stringify({ headline: title, subheadline: 'Welcome to our new site' }))
                .run()
            await c.env.DB.prepare('INSERT INTO site_content (site_id, section_type, content) VALUES (?, ?, ?)')
                .bind(site.id, 'about', JSON.stringify({ text: 'We are a new business.' }))
                .run()
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

    const content: any = {}
    contentRows.results.forEach((row: any) => {
        try {
            content[row.section_type] = JSON.parse(row.content)
        } catch (e) {
            content[row.section_type] = {}
        }
    })

    return c.html(editorTemplate(site, content))
})

app.post('/api/admin/sites/:slug/content', async (c) => {
    const slug = c.req.param('slug')
    const body = await c.req.parseBody()

    const site = await c.env.DB.prepare('SELECT id FROM sites WHERE slug = ?').bind(slug).first()
    if (!site) return c.text('Site not found', 404)

    // Update Hero
    const heroContent = JSON.stringify({
        headline: body['hero_headline'],
        subheadline: body['hero_subheadline']
    })

    // Update About
    const aboutContent = JSON.stringify({
        text: body['about_text']
    })

    // Update Contact
    const contactContent = JSON.stringify({
        email: body['contact_email']
    })

    // Upsert logic (simplified: delete and insert, or update)
    // Ideally we use UPSERT or check existence. For demo, let's just update if exists or insert.
    // Actually, let's just delete old content for these sections and re-insert to be lazy/safe
    // BUT that changes IDs. Better to UPDATE.

    await c.env.DB.prepare(`
    UPDATE site_content SET content = ? WHERE site_id = ? AND section_type = 'hero'
  `).bind(heroContent, site.id).run()

    await c.env.DB.prepare(`
    UPDATE site_content SET content = ? WHERE site_id = ? AND section_type = 'about'
  `).bind(aboutContent, site.id).run()

    // Check if contact section exists, if not insert
    const contactExists = await c.env.DB.prepare("SELECT 1 FROM site_content WHERE site_id = ? AND section_type = 'contact'").bind(site.id).first()
    if (contactExists) {
        await c.env.DB.prepare(`UPDATE site_content SET content = ? WHERE site_id = ? AND section_type = 'contact'`).bind(contactContent, site.id).run()
    } else {
        await c.env.DB.prepare(`INSERT INTO site_content (site_id, section_type, content) VALUES (?, 'contact', ?)`).bind(site.id, contactContent).run()
    }

    return c.redirect(`/admin/site/${slug}/edit`)
})

// --- User Published Site Routes ---

app.get('/site/:slug', async (c) => {
    const slug = c.req.param('slug')
    const site = await c.env.DB.prepare('SELECT * FROM sites WHERE slug = ?').bind(slug).first()

    if (!site) return c.text('Site not found', 404)

    const contentRows = await c.env.DB.prepare('SELECT section_type, content FROM site_content WHERE site_id = ?').bind(site.id).all()

    const content: any = {}
    contentRows.results.forEach((row: any) => {
        try {
            content[row.section_type] = JSON.parse(row.content)
        } catch (e) {
            content[row.section_type] = {}
        }
    })

    return c.html(userSiteTemplate(site, content))
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
    <h1>Message Sent!</h1>
    <p>Thank you for contacting us.</p>
    <a href="/site/${slug}">Back to site</a>
  `)
})

export default app
