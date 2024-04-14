const express = require('express');
const db = require('./conn');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM area');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening at http://127.0.0.1:${PORT}`)
  })