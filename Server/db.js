const pool = require('./conn.js');

// INGRESO DE USUARIOS
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

// INGRESO DE PEDIDOS POR ÁREA Y MESA
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

// MOSTRAR MENÚ
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

// PILA DE PREPARACIONES
async function cocina() {
    try {
        const { rows } = await pool.query('SELECT c.nombre as comida, cantidad, pedido, hora, estado, id_preparacion FROM comida_cocina k JOIN comida c ON k.comida = c.id_comida ORDER BY id_preparacion');
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function bar() {
    try {
        const { rows } = await pool.query('SELECT b.nombre as bebida, cantidad, pedido, hora, estado, id_preparacion FROM bebidas_bar k JOIN bebida b ON k.bebida = b.id_bebida ORDER BY id_preparacion');
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function cocina_update(id) {
    try {
        const { rows } = await pool.query('UPDATE comida_cocina SET estado = true WHERE id_preparacion = $1', [id]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function bar_update(id) {
    try {
        const { rows } = await pool.query('UPDATE bebidas_bar SET estado = true WHERE id_preparacion =  $1', [id]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

// REPORTES
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

// CREACIÓN Y EDICIÓN DE PEDIDOS
async function imprimir_pedido(id_pedido) {
    try {
        const { rows } = await pool.query('select * from pedido where id_pedido = $1;', [id_pedido]);
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

// CLIENTE Y COMENTARIOS
async function crear_cliente(nit, nombre, direccion) {
    try {
        const query = 'select * from existe_cliente($1, $2, $3)';
        const { rows } = await pool.query(query, [nit, nombre, direccion]);
  
        return rows
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function nueva_encuesta(cliente, empleado, amabilidad, exactitud) {
    try {
        const query = 'INSERT INTO encuesta (cliente, empleado, amabilidad, exactitud) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [cliente, empleado, amabilidad, exactitud]);
  
        return 'Guardado!';
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function nueva_queja(cliente, empleado, comida, bebida, motivo, clasificacion) {
    try {
        const query = 'INSERT INTO Queja (cliente, empleado, comida, bebida, motivo, clasificacion) VALUES ($1, $2, $3, $4, $5, $6)';
        await pool.query(query, [cliente, empleado, comida, bebida, motivo, clasificacion]);
  
        return 'Guardado!';
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function cuenta_update(id) {
    try {
        const { rows } = await pool.query('UPDATE pedido SET estado = false WHERE id_pedido =  $1', [id]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

// FACTURA
async function save_factura(cliente, pedido) {
    try {
        await pool.query('INSERT INTO factura (cliente, pedido) VALUES ($1, $2);', [cliente, pedido]);

        const { rows } = await pool.query('SELECT * FROM factura WHERE pedido = $1;', [pedido]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function save_pago(factura, tipo, fraccion) {
    try {
        await pool.query('INSERT INTO forma_de_pago (factura, tipo, fraccion) VALUES ($1, $2, $3);', [factura, tipo, fraccion]);

        const { rows } = await pool.query('SELECT * FROM forma_de_pago WHERE factura = $1;', [factura]);
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
    bebida_recuento,
    crear_cliente,
    nueva_encuesta,
    nueva_queja,
    cuenta_update,
    save_factura,
    save_pago
};