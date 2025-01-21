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
      unique: true,
      // defaultValue: Sequelize.NOW, // YYYY-MM-DDTHH:MM:SS.0Z
      defaultValue: () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // YYYY-MM-DD
      },
    },
    status: {
      type: Sequelize.JSON, // JSON data type
      allowNull: false,
    },
    summary: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    },
    comments: {
      type: Sequelize.JSON, // JSON data type
      allowNull: true,
    },
  },
  {
    tableName: "resource_status",
    timestamps: false, // Disables `createdAt` and `updatedAt`
  }
);
module.exports = resourceStatus;
