const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: 'mysql', // name of your MySQL service in Kubernetes
  user: 'myuser',
  password: 'mypassword',
  database: 'myapp'
});

db.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/api', (req, res) => {
  db.query('SELECT NOW() AS time', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).send({ error: 'Database error' });
    }
    res.send({ message: `Hello from Backend API! DB Time: ${results[0].time}` });
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
