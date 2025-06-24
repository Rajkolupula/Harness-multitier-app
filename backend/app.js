const express = require('express');
const app = express();
const port = 3000;
app.get('/api', (req, res) => {
  res.send({ message: 'Hello from Backend API!' });
});
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});