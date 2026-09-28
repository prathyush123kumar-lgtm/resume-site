/**
 * server.js — Express Backend API
 * E. Prathyush Kumar Resume Website
 *
 * Routes:
 *   GET  /api/health         → Server health check
 *   GET  /api/projects       → List all projects (filterable)
 *   GET  /api/projects/:slug → Single project by slug
 *   POST /api/contact        → Submit contact message (rate-limited + validated)
 *   GET  /api/resume/raw     → Easter-egg: raw JSON resume
 *   GET  /api/docs           → List documentation markdown files
 *   GET  /api/docs/:slug     → Render a markdown doc as HTML
 *   GET  /api/stats          → Site statistics for stat counters
 */

require('dotenv').config();
const express    = require('express');
const helmet     = require('helmet');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');
const path       = require('path');
const fs         = require('fs');
const { marked } = require('marked');
const { JSDOM }  = require('jsdom');
const createDOMPurify = require('dompurify');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app    = express();
const PORT   = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === 'production';

/* ══════════════════════════════════════════════════════════
   MIDDLEWARE STACK
   ══════════════════════════════════════════════════════════ */

// 1. Security headers (Helmet)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "https://challenges.cloudflare.com"],
      styleSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:    ["'self'", "https://fonts.gstatic.com"],
      imgSrc:     ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc:   ["https://challenges.cloudflare.com"],
      objectSrc:  ["'none'"],
      upgradeInsecureRequests: isProd ? [] : null
    }
  },
  hsts: isProd ? { maxAge: 31536000, includeSubDomains: true } : false
}));

// 2. CORS — only allow requests from the configured frontend origin
app.use(cors({
  origin:         process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  methods:        ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials:    false
}));

// 3. Body parsing (cap at 10kb to prevent abuse)
app.use(express.json({ limit: '10kb' }));

// 4. Request logger
app.use(function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', function () {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} — ${res.statusCode} — ${duration}ms`);
  });
  next();
});

// 5. Global rate limit (100 req / min per IP)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please slow down.' }
});
app.use(globalLimiter);

/* ══════════════════════════════════════════════════════════
   RATE LIMIT — Contact Form (5 req / 15 min per IP)
   ══════════════════════════════════════════════════════════ */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again in 15 minutes.' }
});

/* ══════════════════════════════════════════════════════════
   HELPER: Serve static frontend files
   ══════════════════════════════════════════════════════════ */
app.use(express.static(path.join(__dirname, '..')));

/* ══════════════════════════════════════════════════════════
   ROUTES
   ══════════════════════════════════════════════════════════ */

// ── GET /api/health ──────────────────────────────────────
app.get('/api/health', function (req, res) {
  res.json({
    status:    'OK',
    uptime:    process.uptime(),
    timestamp: new Date().toISOString(),
    version:   '1.0.0'
  });
});

// ── GET /api/projects ────────────────────────────────────
app.get('/api/projects', async function (req, res) {
  try {
    const { category, featured } = req.query;
    const where = {};
    if (category)                where.category = category;
    if (featured === 'true')     where.featured = true;

    const projects = await prisma.project.findMany({
      where,
      orderBy: { sortOrder: 'asc' }
    });

    // Parse techStack JSON string back to array
    const parsed = projects.map(function (p) {
      return Object.assign({}, p, {
        techStack: safeParseJSON(p.techStack, [])
      });
    });

    res.json(parsed);
  } catch (err) {
    console.error('GET /api/projects error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── GET /api/projects/:slug ──────────────────────────────
app.get('/api/projects/:slug', async function (req, res) {
  try {
    const slug = req.params.slug;
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ error: 'Invalid slug format.' });
    }

    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) return res.status(404).json({ error: 'Project not found.' });

    res.json(Object.assign({}, project, {
      techStack: safeParseJSON(project.techStack, [])
    }));
  } catch (err) {
    console.error('GET /api/projects/:slug error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── POST /api/contact ────────────────────────────────────
app.post('/api/contact', contactLimiter, async function (req, res) {
  try {
    const { name, email, subject, message } = req.body;

    // Server-side validation (never rely only on client)
    const errors = [];
    if (!name    || name.trim().length    < 2   || name.length    > 100) errors.push('name: must be 2–100 characters.');
    if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))           errors.push('email: invalid format.');
    if (!subject || subject.trim().length < 2   || subject.length > 200) errors.push('subject: must be 2–200 characters.');
    if (!message || message.trim().length < 10  || message.length > 1000)errors.push('message: must be 10–1000 characters.');

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(' ') });
    }

    // Optional: Cloudflare Turnstile token verification
    // Uncomment when you have a real Turnstile secret key:
    //
    // const token = req.body.cfTurnstileResponse;
    // if (!token) return res.status(403).json({ error: 'CAPTCHA required.' });
    // const captchaRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token })
    // });
    // const captchaBody = await captchaRes.json();
    // if (!captchaBody.success) return res.status(403).json({ error: 'CAPTCHA verification failed.' });

    const saved = await prisma.contactMessage.create({
      data: {
        name:      name.trim(),
        email:     email.trim().toLowerCase(),
        subject:   subject.trim(),
        message:   message.trim(),
        ipAddress: req.ip || null,
        userAgent: req.headers['user-agent'] || null
      }
    });

    res.status(201).json({ success: true, id: saved.id });
  } catch (err) {
    console.error('POST /api/contact error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── GET /api/resume/raw  (Easter Egg) ───────────────────
app.get('/api/resume/raw', function (req, res) {
  try {
    const resumePath = path.join(__dirname, '../resume/resume-data.json');
    const resumeData = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
    res.setHeader('X-Easter-Egg', 'You found it! 🎉 Here is the raw resume data.');
    res.json(resumeData);
  } catch (err) {
    res.status(500).json({ error: 'Could not load resume data.' });
  }
});

// ── GET /api/docs  (List documentation articles) ────────
app.get('/api/docs', function (req, res) {
  try {
    const docsDir = path.join(__dirname, '../documentation');
    const files   = fs.readdirSync(docsDir).filter(function (f) { return f.endsWith('.md'); });

    const docs = files.map(function (file) {
      const slug    = file.replace('.md', '');
      const content = fs.readFileSync(path.join(docsDir, file), 'utf8');
      const titleMatch = content.match(/^#\s+(.+)/m);
      return { slug, title: titleMatch ? titleMatch[1] : slug };
    });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Could not list documentation.' });
  }
});

// ── GET /api/docs/:slug  (Render markdown as HTML) ──────
app.get('/api/docs/:slug', function (req, res) {
  try {
    const slug = req.params.slug;

    // Security: only allow safe slug characters — prevent path traversal
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ error: 'Invalid documentation slug.' });
    }

    const filePath = path.join(__dirname, '../documentation', slug + '.md');
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Documentation not found.' });
    }

    const mdContent  = fs.readFileSync(filePath, 'utf8');
    const rawHtml    = marked(mdContent);

    // Sanitize using DOMPurify (server-side via jsdom) to prevent XSS
    const dom        = new JSDOM('');
    const purify     = createDOMPurify(dom.window);
    const cleanHtml  = purify.sanitize(rawHtml);

    const titleMatch = mdContent.match(/^#\s+(.+)/m);

    res.json({
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      html:  cleanHtml
    });
  } catch (err) {
    console.error('GET /api/docs/:slug error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── GET /api/stats ───────────────────────────────────────
app.get('/api/stats', async function (req, res) {
  try {
    const [totalProjects, totalMessages] = await Promise.all([
      prisma.project.count(),
      prisma.contactMessage.count()
    ]);
    res.json({ totalProjects, totalMessages });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* ══════════════════════════════════════════════════════════
   GLOBAL ERROR HANDLER
   ══════════════════════════════════════════════════════════ */
app.use(function globalErrorHandler(err, req, res, next) {
  // Log the full error on the server, but NEVER send stack trace to client
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    error: isProd ? 'Internal server error' : err.message
  });
});

/* ══════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════ */
function safeParseJSON(str, fallback) {
  try { return JSON.parse(str); }
  catch { return fallback; }
}

/* ══════════════════════════════════════════════════════════
   START SERVER
   ══════════════════════════════════════════════════════════ */
app.listen(PORT, function () {
  console.log(`\n🚀 Resume API running at http://localhost:${PORT}`);
  console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Easter egg  : http://localhost:${PORT}/api/resume/raw\n`);
});

module.exports = app; // exported for testing with supertest
