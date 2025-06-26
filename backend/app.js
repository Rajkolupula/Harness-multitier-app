const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql', // Kubernetes Service name or override with env
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'myapp',
  connectTimeout: 10000 // optional: handle slow startups
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL');
});

// API route
app.get('/api', (req, res) => {
  db.query('SELECT NOW() AS time', (err, results) => {
    if (err) {
      console.error('❌ Query error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: `Hello from Backend API! DB Time: ${results[0].time}` });
  });
});

// Fallback route for unmatched paths
app.get('*', (req, res) => {
  res.status(404).send({ error: 'Route not found' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Backend running on port ${port}`);
});
