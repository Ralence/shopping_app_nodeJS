const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'my_first_node_schema',
  password: '0310984r',
});

module.exports = pool.promise();
