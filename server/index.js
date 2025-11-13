// FILE: server/server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const validator = require('validator');
const Contact = require('./models/Contact');

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean); // optional

if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env. Exiting.');
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error(err); process.exit(1); });

const app = express();

// security headers
app.use(helmet());

// CORS: allow configured origins or everything in dev
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow non-browser requests like curl
    if (ALLOWED_ORIGINS.length === 0) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json({ limit: '10kb' })); // body limit

// rate limiter for contact endpoint
const contactLimiter = rateLimit({
  windowMs: 1000 * 60 * 60, // 1 hour
  max: 10,
  message: { error: 'Too many messages from this IP. Try again later.' }
});

// POST /api/contact
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email.' });
    }
    // sanitize
    const cleanName = validator.escape(name).trim();
    const cleanEmail = validator.normalizeEmail(email);
    const cleanMessage = validator.escape(message).trim();

    const contact = new Contact({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      ip: req.ip,
      userAgent: req.get('User-Agent') || ''
    });

    await contact.save();

    // optional: you can send an email to admin here using nodemailer (not included)
    res.json({ message: 'Thank you — we received your message.' });
  } catch (err) {
    console.error('Contact save error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
