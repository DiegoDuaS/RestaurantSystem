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
        const { rows } = await pool.query('select * from recuento r join pedido p on p.id_pedido = r.pedido  where r.pedido = $1;', [id_pedido]);
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
    quejas_empleados

};