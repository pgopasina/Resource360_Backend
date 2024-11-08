var Sequelize = require("sequelize");
var Connection = require("../connection");
var userSchema = Connection.define("User_Details", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = userSchema;

// const mongoose = require("mongoose");

// const userModel = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });

// const user = mongoose.model("User_Details", userModel);
// module.exports = user;
