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

async function register(name, trabajo, password) {
    try {
        const query = 'INSERT INTO Empleado (id_empleado, trabajo, nombre, contraseña, area) VALUES (125, $1, $2, $3, 1)';
        await pool.query(query, [trabajo, name, password]);

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

module.exports = {
    login,
    register,
};