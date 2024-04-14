const db = require('./conn.js');
const { login, register, areas } = require('./db.js');

const express = require('express');
const app = express();
const cors = require('cors');

// Middleware para parsear JSON
app.use(express.json());
app.use(cors);

const PORT = process.env.PORT || 3002;

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

app.post('/register', async (req, res) => {
  const { name, trabajo, password } = req.body;

  if (!name || !trabajo || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const userId = await register(name, trabajo, password);
      if (userId) {
          return res.status(201).json({ userId });
      } else {
          return res.status(400).json({ error: 'No se pudo registrar al usuario' });
      }
  } catch (err) {
      console.error('Error en /register:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/areas', async (req, res) => {
  try {
    const result = await areas();
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening at http://127.0.0.1:${PORT}`)
  })