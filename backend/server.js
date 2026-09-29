require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === 'production';

// Security Headers
app.use(helmet());

// CORS
const allowedOrigins = process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN.split(',') : (isProd ? [] : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:4000']);
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10kb' }));

// Rate limiter for API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', apiLimiter);

// Contact form limiter (5 req per 15 min)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many contact requests. Please try again later.' }
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message, cfTurnstileResponse } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // 1. Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // 2. Length limits
  if (name.length > 100 || email.length > 150 || message.length > 2000) {
    return res.status(400).json({ error: 'Input too long' });
  }

  // 3. Turnstile Validation Placeholder
  // Real implementation would verify against Cloudflare API
  if (process.env.TURNSTILE_SECRET_KEY && !cfTurnstileResponse) {
    return res.status(400).json({ error: 'CAPTCHA missing or invalid' });
  }

  // 4. Basic XSS Mitigation (Sanitization)
  const sanitize = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeName = sanitize(name);
  const safeMessage = sanitize(message);
  
  try {
    const newMsg = await prisma.contactMessage.create({
      data: { name: safeName, email, message: safeMessage }
    });
    res.status(201).json({ success: true, id: newMsg.id });
  } catch (err) {
    console.error('Contact submit error:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

app.get('/api/resume/raw', (req, res) => {
  const resumePath = path.join(__dirname, '../resume/resume-data.json');
  if (fs.existsSync(resumePath)) {
    const data = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
    res.json(data);
  } else {
    res.status(404).json({ error: 'Resume not found' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
