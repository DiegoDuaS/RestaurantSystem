const db = require('./conn.js');
const { login, register, areas, mesas, comida, bebida, cocina, bar,
  cocina_update, bar_update, eficiencia_meseros,  quejas_platos} = require('./db.js');

const express = require('express');
const app = express();
const cors = require('cors');

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

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
  const { name, trabajo, password, area } = req.body;

  if (!name || !trabajo || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const userId = await register(name, trabajo, password, area);
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

app.post('/mesas', async (req, res) => {
  const { idArea } = req.body; // Suponiendo que usas JSON como entrada

  if (!idArea) {
    return res.status(400).json({ error: 'Area es requeridos' });
  }

  try {
    const mesa = await mesas(idArea);
    
    if (mesas) {
      return res.json(mesa);
    } else {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error en /mesas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/comida', async (req, res) => {
  try {
    const result = await comida();
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/bebidas', async (req, res) => {
  try {
    const result = await bebida();
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/cocina', async (req, res) => {
  try {
    const result = await cocina();
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/bar', async (req, res) => {
  try {
    const result = await bar();
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/cocina/update', async (req, res) => {
  const { comida, pedido } = req.body; // Suponiendo que usas JSON como entrada

  if (!comida || !pedido) {
    return res.status(400).json({ error: 'el nombre de la comida es requerido' });
  }

  try {
    const result = await cocina_update(comida, pedido);
    return res.json(result);
  } catch (err) {
    console.error('Error en /cocina/update:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/bar/update', async (req, res) => {
  const { bebida, pedido } = req.body; // Suponiendo que usas JSON como entrada

  if (!bebida || !pedido) {
    return res.status(400).json({ error: 'el nombre de la bebida es requerido' });
  }

  try {
    const result = await bar_update(bebida, pedido);
    return res.json(result);
  } catch (err) {
    console.error('Error en /bar/update:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/stats/eficiencia_meseros1', async (req, res) => {
  try {
    const result = await eficiencia_meseros(); // Llamada a tu función existente
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
});


app.post('/stats/quejas_platos', async (req, res) => {
  const { fecha_inicial, fecha_final } = req.body;

  if (!fecha_inicial || !fecha_final) {
    return res.status(400).json({ error: 'Las fechas inicial y final son requeridas' });
  }

  try {
    const result = await quejas_platos(fecha_inicial, fecha_final);
    return res.json(result);
  } catch (err) {
    console.error('Error en /stats/quejas_platos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening at http://127.0.0.1:${PORT}`)
  })