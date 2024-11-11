const { where } = require("sequelize");
var userSchema = require("../models/userDetailsModel");
const { response } = require("express");

var userReg = async (req, res) => {
  try {
    var userDetails = await userSchema.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    console.log("userDetails", userDetails);
    res.send({
      Message: "User Registered Successfully",
      Data: userDetails,
    });
  } catch (error) {
    res.status(401).send({
      Message: "Unable to Register the User",
      data: error,
    });
  }
};

var fatchAllUsers = async (req, res) => {
  await userSchema.findAll()
    .then(async (data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

var userLogin = (req, res) => {
  userSchema.findOne({ where: { email: req.body.email } })
    .then((response) => {
      if (!response) {
        return res.status(404).send("User not found");
      }
      if (
        req.body.email === response.email &&
        req.body.password === response.password
      ) {
        res.status(200).send("User successfully logged in");
      } else {
        res.status(401).send("Wrong credentials");
      }
    })
    .catch((error) => {
      res.status(500).send("An error occurred during login", error);
    });
};

module.exports = { userReg, fatchAllUsers, userLogin };
