const express = require('express');
const app = express();
const port = 3000;

let viewCount = 0;

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

// Endpoint for the mod page
app.get('/mod-apps', (req, res) => {
  res.sendFile(path.join(__dirname, 'mod apps/mod.webp'));
});

app.get('/get-views', (req, res) => {
  res.json({ views: viewCount });
});

app.post('/increment-views', (req, res) => {
  viewCount += 5;
  res.json({ views: viewCount });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});