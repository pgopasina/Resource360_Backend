var Sequelize = require("sequelize");
var Connection = require("../connection");
const resourceStatus = Connection.define(
  "resource_status",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    status: {
      type: Sequelize.JSON, // JSON data type
      allowNull: true,
    },
    summary: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    }
  },
  {
    tableName: "resource_status",
    timestamps: false, // Disables `createdAt` and `updatedAt`
  }
);
module.exports = resourceStatus;
