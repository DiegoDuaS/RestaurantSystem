const pool = require('./conn.js');

async function login(id, password_md5) {
    try {
        const { rows } = await pool.query('SELECT * FROM Empleado WHERE id_empleado = $1 AND contraseña = $2', [id, password_md5]);
        if (rows.length === 1) {
            return rows[0].id_empleado; 
        }
        return false;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error; 
    }
}

async function register(name, trabajo, password, area) {
    try {
        const query = 'INSERT INTO Empleado (id_empleado, trabajo, nombre, contraseña, area) VALUES (null, $1, $2, $3, $4)';
        await pool.query(query, [trabajo, name, password, area]);

        const { rows } = await pool.query('SELECT * FROM Empleado WHERE nombre = $1', [name]);
        if (rows.length === 1) {
            return rows[0].id_empleado;
        }

        return false;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function areas() {
    try {
        // Ejecuta la consulta SQL para obtener todos los registros de la tabla 'area'
        const { rows } = await pool.query('SELECT * FROM area');
        // Devuelve todos los registros obtenidos
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function mesas(area) {
    try {
        const { rows } = await pool.query('SELECT * FROM Mesa WHERE area = $1', [area]);
        if (rows.length > 0) {
            return rows;
        }

        return false;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function comida() {
    try {
        const { rows } = await pool.query('SELECT * FROM comida');
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function bebida() {
    try {
        const { rows } = await pool.query('SELECT * FROM bebida');
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function cocina() {
    try {
        const { rows } = await pool.query('SELECT c.nombre as comida, cantidad, pedido, hora, estado FROM comida_cocina k JOIN comida c ON k.comida = c.id_comida ORDER BY hora');
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function bar() {
    try {
        const { rows } = await pool.query('SELECT b.nombre as bebida, cantidad, pedido, hora, estado FROM bebidas_bar k JOIN bebida b ON k.bebida = b.id_bebida ORDER BY hora');
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function cocina_update(comida, pedido) {
    try {
        const { rows } = await pool.query('UPDATE comida_cocina SET estado = true WHERE comida = (Select id_comida from comida where nombre = $1 AND pedido = $2)', [comida, pedido]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function bar_update(bebida, pedido) {
    try {
        const { rows } = await pool.query('UPDATE bebidas_bar SET estado = true WHERE bebida = (Select id_bebida from bebida where nombre = $1 AND pedido = $2)', [bebida, pedido]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function eficiencia_meseros(fecha_inicial, fecha_final) {
    try {
        const { rows } = await pool.query('SELECT * FROM eficiencia_meseros()');
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function quejas_platos(fecha_inicial, fecha_final) {
    try {
        const { rows } = await pool.query('SELECT * FROM quejas_platos($1, $2)', [fecha_inicial, fecha_final]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function horarios_pedidos(fecha_inicial, fecha_final) {
    try {
        const { rows } = await pool.query('SELECT * FROM horarios_pedidos($1, $2)', [fecha_inicial, fecha_final]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function platos_mas_pedidos(fecha_inicial, fecha_final) {
    try {
        const { rows } = await pool.query('SELECT * FROM platos_mas_pedidos($1, $2)', [fecha_inicial, fecha_final]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function promedio_comidas(fecha_inicial, fecha_final) {
    try {
        const { rows } = await pool.query('SELECT * FROM promedio_comidas($1, $2)', [fecha_inicial, fecha_final]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function quejas_empleados(fecha_inicial, fecha_final) {
    try {
        const { rows } = await pool.query('SELECT * FROM quejas_empleados($1, $2)', [fecha_inicial, fecha_final]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}


async function imprimir_pedido(id_pedido) {
    try {
        const { rows } = await pool.query('select * from recuento where pedido = $1;', [id_pedido]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function crear_pedido(id_mesa, propina, empleado, estado) {
    try {
        const query = 'INSERT INTO Pedido (mesa, propina, empleado, estado) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [id_mesa, propina, empleado, estado]);
  
        const { rows } = await pool.query('SELECT * FROM Pedido WHERE mesa = $1 AND estado = true', [id_mesa]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
  }

  async function ingresar_pedido(pedido, bebida, comida, cantidad) {
    try {
        const query = 'INSERT INTO Recuento (pedido, bebida, comida, cantidad) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [pedido, bebida, comida, cantidad]);
  
        const { rows } = await pool.query('SELECT * FROM Recuento WHERE pedido = $1', [pedido]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
  }

  async function cuenta(pedido) {
    try {
        const query = 'SELECT c.nombre AS productonombre, c.precio AS precioUnitario, r.cantidad FROM Recuento r LEFT JOIN Comida c ON r.comida = c.id_comida WHERE c.nombre IS NOT NULL AND r.pedido = $1 UNION ALL SELECT b.nombre AS productonombre, b.precio AS precioUnitario, r.cantidad FROM Recuento r LEFT JOIN Bebida b ON r.bebida = b.id_bebida WHERE b.nombre IS NOT NULL AND r.pedido = $1;';
        const { rows } = await pool.query(query, [pedido]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
  }

  async function comida_recuento(comida, pedido) {
    try {
        const query = 'select * from comida_a_recuento($1, $2)';
        await pool.query(query, [comida, pedido]);
  
        const { rows } = await pool.query('SELECT * FROM Recuento WHERE pedido = $1', [pedido]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
  }

  async function bebida_recuento(bebida, pedido) {
    try {
        const query = 'select * from bebida_a_recuento($1, $2)';
        await pool.query(query, [bebida, pedido]);
  
        const { rows } = await pool.query('SELECT * FROM Recuento WHERE pedido = $1', [pedido]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
  }


module.exports = {
    login,
    register,
    areas,
    mesas,
    comida,
    bebida,
    cocina,
    bar,
    cocina_update,
    bar_update,
    eficiencia_meseros,
    quejas_platos,
    imprimir_pedido,
    horarios_pedidos,
    platos_mas_pedidos,
    promedio_comidas,
    quejas_empleados,
    crear_pedido,
    ingresar_pedido,
    cuenta,
    comida_recuento,
    bebida_recuento
};