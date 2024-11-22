const { where } = require("sequelize");
var userSchema = require("../models/userDetailsModel");
const { response } = require("express");

var userReg = async (req, res) => {
  try {
    var userDetails = await userSchema.create({
      fullname: req.body.fullname,
      username: req.body.username,
      designation: req.body.designation,
      email: req.body.email,
      password: req.body.password,
      reportsTo: req.body.reportsTo,
      shiftTime: req.body.shiftTime,
    });
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

var fetchAllUsers = async (req, res) => {
  await userSchema
    .findAll()
    .then(async (user) => {
      if (user.length === 0) {
        res.status(404).send("No Users user");
      } else {
        const userDetails = user.map((singleUser) => ({
          id: singleUser.id ? singleUser.id : "",
          fullname: singleUser.fullname ? singleUser.fullname : "",
          username: singleUser.username ? singleUser.username : "",
          designation: singleUser.designation ? singleUser.designation : "",
          email: singleUser.email ? singleUser.email : "",
          password: singleUser.password ? singleUser.password : "",
          reportsTo: singleUser.reportsTo ? singleUser.reportsTo : "",
          shiftTime: singleUser.shiftTime ? singleUser.shiftTime : "",
        }));
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

var userLogin = async (req, res) => {
  await userSchema
    .findOne({ where: { email: req.body.email } })
    .then(async (response) => {
      if (!response) {
        return res.status(404).send("User not found");
      }
      if (req.body.password === response.password) {
        if (response.designation === "Project Manager") {
          await userSchema
            .findAll({ where: { reportsTo: response.fullname } })
            .then((resourceData) => {
              res.send({
                message: `'${response.fullname}' Login Successfully`,
                user_details: {
                  fullname: response.fullname ? response.fullname : "",
                  username: response.username ? response.username : "",
                  designation: response.designation ? response.designation : "",
                  allResource: resourceData ? resourceData : "",
                },
              });
            });
        } else {
          console.log("hello user");
          res.send({
            message: `'${response.fullname}' Login Successfully`,
            user_details: {
              id: response.id ? response.id : "",
              fullname: response.fullname ? response.fullname : "",
              username: response.username ? response.username : "",
              designation: response.designation ? response.designation : "",
              email: response.email ? response.email : "",
              reportsTo: response.reportsTo ? response.reportsTo : "",
              shiftTime: response.shiftTime ? response.shiftTime : "",
            },
          });
        }
      } else {
        res.status(401).send("Wrong credentials");
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "An error occurred during login",
        error: error.message,
      });
    });
};

module.exports = { userReg, fetchAllUsers, userLogin };
