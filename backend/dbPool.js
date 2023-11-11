const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'capstone_project'
  });

  module.exports = pool;