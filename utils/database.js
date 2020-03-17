const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_first_node_schema', 'root', '0310984r', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
