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

// var userReg = async (req, res) => {
//   userSchema.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     })
//     .then((data) => {
//       res.send({
//         Message: "User Registered Successfully",
//         Data: data,
//       });
//     })
//     .catch((error) => {
//       res.status(401).send({
//         Message: "Unable to Register the User",
//         data: error,
//       });
//     });
// };

var fatchAllUsers = async (req, res) => {
  await userSchema.findAll()
    .then(async (data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

// var userLogin = async (req, res) => {
//   await userSchema.findOne({ where: { email: req.email } })
//     .then(async (response) => {
//       console.log("response",response);

//       if (response == null) {
//         res.status(404).send("User not found");
//       }
//       if ( req.body.email === response.email && req.body.password === response.password) {
//         res.status(200).send("User Successfully logged in");
//       } else {
//         res.status(401).send("Wrong credentials");
//       }
//     })
//     .catch((error) => {
//       res.status(401).send("Wrong credentials!");
//     });
// };

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
// const { default: connectDB } = require("../connection");
// const USER = require("../models/userDetailsModel");
// // userId: element.userId ? element.userId : "",
// // name: element.name ? element.name : "",
// // role: element.role ? element.role : "",
// // email: element.email ? element.email : "",
// // userName: element.userName ? element.userName : "",
// // password: element.password ? element.password : "",
// // reportsTo: element.reportsTo ? element.reportsTo : "",
// var createUser = async (req, res) => {
//   try {
//     const user = new USER({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     await user.save();
//     console.log("User created:", user);
//   } catch (error) {
//     console.log("User not created:", error);
//   }
// };

// var getUser = async (req, res) => {
//   // connectDB()
//   USER.find()
//     .then((user) => {
//       if (!user) {
//         console.log("user not found");
//         res.send(result).status(400)
//       } else {
//         res.send(user).status(200)
//       }
//     })
//     .catch((error) => {
//       console.error("Error finding user:", error.message);
//     });

// };

// module.exports = { createUser, getUser };
