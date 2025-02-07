const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const https = require('https');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for security
app.use(helmet());  // Adds HTTP headers for security
app.use(cors());    // Allows CORS for cross-domain requests

// Rate limiting to protect from DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 9000, // Max 9000 requests per IP within 15 minutes
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

// Serve static files like index.html, CSS, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint for the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Endpoint for the resume page
app.get('/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'resume.html'));
});

// Endpoint for the services page
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'services.html'));
});

// Endpoint for the skills page
app.get('/skills', (req, res) => {
  res.sendFile(path.join(__dirname, 'skills.html'));
});

// Endpoint for the projects page
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'projects.html'));
});

// Endpoint for the blog page
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

// Endpoint for the playfrom page
app.get('/playfrom', (req, res) => {
  res.sendFile(path.join(__dirname, 'playfrom.html'));
});

// Endpoint for the contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Endpoint for the UU No. 19 Tahun 2002 tentang Hak Cipta page
app.get('/UU%20No.%2019%20Tahun%202002%20tentang%20Hak%20Cipta.pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'UU No. 19 Tahun 2002 tentang Hak Cipta.pdf'));
});

// Endpoint for the UU Nomor 28 Tahun 2014 page
app.get('/UU%20Nomor%2028%20Tahun%202014.pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'UU Nomor 28 Tahun 2014.pdf'));
});

// Endpoint for the comingson page
app.get('/comingson', (req, res) => {
  res.sendFile(path.join(__dirname, 'comingson.html'));
});

// Endpoint for the 3D modeling page
app.get('/3d%20modeling', (req, res) => {
  res.sendFile(path.join(__dirname, '3d modeling.html'));
});

// Endpoint for the mod page
app.get('/mod', (req, res) => {
  res.sendFile(path.join(__dirname, 'mod.html'));
});

// JWT Example
const secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey'; // Use environment variable for production

const token = jwt.sign({ userId: 123 }, secretKey, { expiresIn: '1h' });
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.log('Token is invalid or expired');
  } else {
    console.log('Decoded data:', decoded);
  }
});

// Cookie parser middleware
app.use(cookieParser());

// Login endpoint that sets a JWT in cookies
app.post('/login', (req, res) => {
  const token = jwt.sign({ userId: 123 }, secretKey, { expiresIn: '1h' });
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: true,  // Ensure cookies are sent over HTTPS
    sameSite: 'Strict',  // Prevent CSRF
  });
  res.send('Logged in');
});

// CSRF Protection Middleware
const csrfProtection = csrf({ cookie: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(csrfProtection);

// CSRF form example
app.get('/form', (req, res) => {
  res.send(`<form action="/process" method="POST">
              <input type="hidden" name="_csrf" value="${req.csrfToken()}">
              <button type="submit">Submit</button>
            </form>`);
});

// Handle form submission
app.post('/process', (req, res) => {
  res.send('Form submitted');
});

// SSL certificate generation and HTTPS setup (replace with real certificates)
const httpsOptions = {
  key: fs.readFileSync('encryption/private-key.pem'), // Use a real certificate file here
  cert: fs.readFileSync('encryption/certificate.pem'), // Use a real certificate file here
  ca: fs.readFileSync('encryption/public-key-pkcs1.pem'), // Use a real certificate file here
  ca: fs.readFileSync('encryption/public-key-x509.pem'), // Use a real certificate file here
  requestCert: true,
  rejectUnauthorized: false,
};

// Create HTTPS server
const httpsServer = https.createServer(httpsOptions, app);

// Start HTTPS server
httpsServer.listen(port, () => {
  console.log(`HTTPS server running on https://localhost:${port}`);
});
