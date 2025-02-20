const Sequelize = require("sequelize");
const Connection = require("../connection");
const Joi = require("joi");

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

const userSchemaValidation = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  designation: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  reportsTo: Joi.string().required(),
  shiftTime: Joi.string().required(),
});

module.exports = { userSchema, userSchemaValidation };
