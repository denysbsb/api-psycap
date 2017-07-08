var path      = require("path");
var env       = process.env.NODE_ENV || "production";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

var Sequelize = require('sequelize');

var database = config.database,
    username = config.username,
    password = config.password,
    host = config.host,
    port = config.port;

var sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port, 
    dialect: 'postgres',
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;

