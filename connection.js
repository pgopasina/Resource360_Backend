var Sequelize = require("sequelize");
var cfig = require("./config.json");

var Connection = new Sequelize(
  cfig.mysqlDB.database,
  cfig.mysqlDB.username,
  cfig.mysqlDB.password,
  {
    dialect: cfig.mysqlDB.dialect,
    host: cfig.mysqlDB.hostname,
  }
);

Connection.authenticate()
  .then(() => {
    console.log("Successfully connected to DataBase");
  })
  .catch(() => {
    console.log("DataBase is not connected");
  });

Connection.sync({ force: false })
  .then(() => {
    console.log("Table Created");
  })
  .catch((error) => {
    console.log(error);
  });
  
module.exports = Connection;
