var Sequelize = require("sequelize");
var Connection = require("../connection");
const comments = Connection.define(
  "comments",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      // defaultValue: Sequelize.NOW, // YYYY-MM-DDTHH:MM:SS.0Z
      // defaultValue: () => {
      //   const today = new Date();
      //   return today.toISOString().split("T")[0]; // YYYY-MM-DD
      // },
    },
    statusSlot: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comments: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    commentTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    receiverName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disables `createdAt` and `updatedAt`
  }
);
module.exports = comments;
