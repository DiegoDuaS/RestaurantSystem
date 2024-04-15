const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Restaurante1',
    password: 'Dd425##*SGC1702SQL',
    port: 5432,
  });

module.exports = {
  query: (text, params) => pool.query(text, params)
};