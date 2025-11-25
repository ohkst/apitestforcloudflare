DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS sites;
DROP TABLE IF EXISTS site_content;
DROP TABLE IF EXISTS leads;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  theme_config TEXT DEFAULT '{}', -- JSON string
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE site_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site_id INTEGER NOT NULL,
  section_type TEXT NOT NULL, -- 'hero', 'about', 'features', 'contact'
  content TEXT DEFAULT '{}', -- JSON string
  FOREIGN KEY (site_id) REFERENCES sites(id)
);

CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site_id INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (site_id) REFERENCES sites(id)
);

-- Seed data for testing
INSERT INTO users (email, password_hash) VALUES ('demo@example.com', 'hashed_secret');
INSERT INTO sites (user_id, slug, title) VALUES (1, 'bakery', 'My Awesome Bakery');
INSERT INTO site_content (site_id, section_type, content) VALUES 
(1, 'hero', '{"headline": "Fresh Bread Daily", "subheadline": "Baked with love"}'),
(1, 'about', '{"text": "We are a family owned bakery."}');
