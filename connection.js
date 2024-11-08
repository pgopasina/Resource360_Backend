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

// const { MongoClient } = require("mongodb");

// const uri = "mongodb+srv://prudhvigopasina1999:wuGPextaDhfJI0b6@bench360.l4vpm.mongodb.net/Internal_DB";
// const client = new MongoClient(uri, { serverSelectionTimeoutMS: 30000 });

// client.connect()
//   .then(() => {
//     console.log("Successfully connected to MongoDB");
//     client.close();
//   })
//   .catch((error) => {
//     console.error("MongoDB connection test failed:", error.message);
//   });

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = "mongodb+srv://prudhvigopasina1999:wuGPextaDhfJI0b6@bench360.l4vpm.mongodb.net/";
// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );

// async function run() {
//   try {
//     await client.connect();
//     await client.db("Internal_DB").command({ ping: 1 });
//     console.log("Successfully connected to MongoDB");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://prudhvigopasina1999:wuGPextaDhfJI0b6@bench360.l4vpm.mongodb.net/Internal_DB');

// mongoose.connection.on('connected', () => {
// const { host, port } = mongoose.connection;
// console.log(`Connected to MongoDB host: ${host}, port: ${port}`);
// });

// const mongoose = require('mongoose');
// // const config = require("../config/dbConfig.json");

// const mongoUri = `mongodb+srv://prudhvigopasina1999:wuGPextaDhfJI0b6@bench360.l4vpm.mongodb.net/Internal_DB`;

// mongoose.connect(mongoUri, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 30000
// })
// .then(() => {
//     console.log('DB connected');
// })
// .catch((error) => {
//     console.error('DB not connected', error.message);
// });
