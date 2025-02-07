var Sequelize = require("sequelize");
var Connection = require("../connection");
var userSchema = Connection.define(
  "User_Details",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    designation: {
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
    },
    reportsTo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    shiftTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    HRcontact: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false } // Disables `createdAt` and `updatedAt`
);

module.exports = userSchema;
