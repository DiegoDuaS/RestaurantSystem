const db = require('./conn.js');
const { login, register, areas, mesas, comida, bebida, cocina, bar,
  cocina_update, bar_update, eficiencia_meseros,  quejas_platos,
imprimir_pedido, horarios_pedidos, platos_mas_pedidos, quejas_empleados,promedio_comidas,
crear_pedido, ingresar_pedido, cuenta, comida_recuento, bebida_recuento, 
crear_cliente, nueva_encuesta, nueva_queja} = require('./db.js');

const express = require('express');
const app = express();
const cors = require('cors');

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3002;

// INGRESO DE USUARIOS
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

// INGRESO DE PEDIDOS POR ÁREA Y MESA
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

// MOSTRAR MENÚ
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

// PILA DE PREPARACIONES
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
  const { id } = req.body; // Suponiendo que usas JSON como entrada

  if (!id) {
    return res.status(400).json({ error: 'el id de la preparación es requerido' });
  }

  try {
    const result = await cocina_update(id);
    return res.json(result);
  } catch (err) {
    console.error('Error en /cocina/update:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/bar/update', async (req, res) => {
  const { id } = req.body; // Suponiendo que usas JSON como entrada

  if (!id) {
    return res.status(400).json({ error: 'el id de la preparación es requerido' });
  }

  try {
    const result = await bar_update(id);
    return res.json(result);
  } catch (err) {
    console.error('Error en /bar/update:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// REPORTES
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

app.post('/stats/horarios_pedidos', async (req, res) => {
  const { fecha_inicial, fecha_final } = req.body;

  if (!fecha_inicial || !fecha_final) {
    return res.status(400).json({ error: 'Las fechas inicial y final son requeridas' });
  }

  try {
    const result = await horarios_pedidos(fecha_inicial, fecha_final);
    return res.json(result);
  } catch (err) {
    console.error('Error en /stats/quejas_platos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/stats/platos_mas_pedidos', async (req, res) => {
  const { fecha_inicial, fecha_final } = req.body;

  if (!fecha_inicial || !fecha_final) {
    return res.status(400).json({ error: 'Las fechas inicial y final son requeridas' });
  }

  try {
    const result = await platos_mas_pedidos(fecha_inicial, fecha_final);
    return res.json(result);
  } catch (err) {
    console.error('Error en /stats/platos_mas_pedidos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/stats/promedio_comidas', async (req, res) => {
  const { fecha_inicial, fecha_final } = req.body;

  if (!fecha_inicial || !fecha_final) {
    return res.status(400).json({ error: 'Las fechas inicial y final son requeridas' });
  }

  try {
    const result = await promedio_comidas(fecha_inicial, fecha_final);
    return res.json(result);
  } catch (err) {
    console.error('Error en /stats/quejas_platos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/stats/quejas_empleados', async (req, res) => {
  const { fecha_inicial, fecha_final } = req.body;

  if (!fecha_inicial || !fecha_final) {
    return res.status(400).json({ error: 'Las fechas inicial y final son requeridas' });
  }

  try {
    const result = await quejas_empleados(fecha_inicial, fecha_final);
    return res.json(result);
  } catch (err) {
    console.error('Error en /stats/platos_mas_pedidos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// CREACIÓN Y EDICIÓN DE PEDIDOS
app.post('/pedidos', async (req, res) => {
  const { idPedido } = req.body;

  if (!idPedido) {
    return res.status(400).json({ error: 'El id del pedido es requerido' });
  }

  try {
    const result = await imprimir_pedido(idPedido);
    return res.json(result);
  } catch (err) {
    console.error('Error en /stats/quejas_platos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/pedidos/crear', async (req, res) => {
  const { idMesa, propina, empleado, estado } = req.body;

  if (!idMesa || !propina || !empleado || !estado) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const pedido = await crear_pedido(idMesa, propina, empleado, estado);
      if (pedido) {
          return res.json(pedido);
      } else {
          return res.status(400).json({ error: 'No se pudo registrar al usuario' });
      }
  } catch (err) {
      console.error('Error en /register:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/pedidos/ingresar', async (req, res) => {
  const { pedido, id_bebida, id_comida, cantidad } = req.body;

  if (!pedido || !cantidad) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const result = await ingresar_pedido(pedido, id_bebida, id_comida, cantidad);
      if (result) {
          return res.json(result);
      } else {
          return res.status(400).json({ error: 'No se pudo registrar al usuario' });
      }
  } catch (err) {
      console.error('Error en /register:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/cuenta', async (req, res) => {
  const { pedido } = req.body;

  if (!pedido) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const result = await cuenta(pedido);
      if (result) {
          return res.json(result);
      } else {
          return res.status(400).json({ error: 'No se pudo registrar al usuario' });
      }
  } catch (err) {
      console.error('Error en /register:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/recuento/comida', async (req, res) => {
  const { comida, pedido } = req.body;

  if (!comida || !pedido) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const result = await comida_recuento(comida, pedido);
      if (result) {
          return res.json(result);
      } else {
          return res.status(400).json({ error: 'No fue posible obtener los datos' });
      }
  } catch (err) {
      console.error('Error en /register:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/recuento/bebida', async (req, res) => {
  const { bebida, pedido } = req.body;

  if (!bebida || !pedido) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const result = await bebida_recuento(bebida, pedido);
      if (result) {
          return res.json(result);
      } else {
          return res.status(400).json({ error: 'No fue posible obtener los datos' });
      }
  } catch (err) {
      console.error('Error en /register:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// CLIENTE Y COMENTARIOS
app.post('/cliente', async (req, res) => {
  const { nit, nombre, direccion } = req.body;

  if (!nit || !nombre || !direccion) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const result = await crear_cliente(nit, nombre, direccion);
      if (result) {
          return res.json(result);
      } else {
          return res.status(400).json({ error: 'No se pudo registrar al cliente' });
      }
  } catch (err) {
      console.error('Error en /cliente:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/encuesta', async (req, res) => {
  const { cliente, empleado, amabilidad, exactitud } = req.body;

  if (!cliente || !empleado || !amabilidad || !exactitud) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const result = await nueva_encuesta(cliente, empleado, amabilidad, exactitud);
      if (result) {
          return res.json(result);
      } else {
          return res.status(400).json({ error: 'No se pudo registrar la encuesta' });
      }
  } catch (err) {
      console.error('Error en /cliente:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/queja', async (req, res) => {
  const { cliente, empleado, comida, bebida, motivo, clasificacion } = req.body;

  if (!cliente || !motivo || !clasificacion) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
      const result = await nueva_queja(cliente, empleado, comida, bebida, motivo, clasificacion);
      if (result) {
          return res.json(result);
      } else {
          return res.status(400).json({ error: 'No se pudo registrar la queja' });
      }
  } catch (err) {
      console.error('Error en /cliente:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening at http://127.0.0.1:${PORT}`)
  })