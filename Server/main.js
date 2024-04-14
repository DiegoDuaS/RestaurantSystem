const db = require('./conn.js');
const login = require('./db.js');

const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM empleado');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
  const { id, password } = req.body; // Suponiendo que usas JSON como entrada

  if (!id || !password) {
    return res.status(400).json({ error: 'ID y password son requeridos' });
  }

  try {
    const userId = await login(id, password);
    
    if (userId) {
      return res.status(200).json({ userId });
    } else {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error en /login:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening at http://127.0.0.1:${PORT}`)
  })