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
  try {
    const response = await userSchema.findOne({
      where: { email: req.body.email },
    });

    if (!response) {
      return res.status(404).send(`${req.body.email} not found`);
    }
    if (req.body.password !== response.password) {
      return res.status(401).send("Wrong credentials");
    }
    if (response.designation === "Project Manager") {
      const allUsers = await userSchema.findAll();
      const managers = allUsers.filter(
        (manager) =>
          manager.designation === "Project Manager" &&
          manager.email === response.email
      );
      const leads = allUsers.filter(
        (lead) =>
          (lead.designation === "Sr.Technical associate" ||
            lead.designation === "Technical associate") &&
          lead.reportsTo === response.fullname
      );
      const resources = allUsers.filter(
        (resource) => resource.designation === "Jr.Technical associate"
      );

      const managersHierarchy = managers.map((manager) => {
        const managerLeads = leads
          .filter((lead) => (lead.reportsTo = manager.fullname))
          .map((lead) => {
            const leadResources = resources.filter(
              (resource) => resource.reportsTo === lead.fullname
            );
            return {
              name: lead.fullname ? lead.fullname : "",
              username: lead.username ? lead.username : "",
              role: lead.designation ? lead.designation : "",
              email: lead.email ? lead.email : "",
              reportsTo: lead.reportsTo ? lead.reportsTo : "",
              shiftTime: lead.shiftTime ? lead.shiftTime : "",
              resources: leadResources.map((resource) => ({
                name: resource.fullname ? resource.name : "",
                username: resource.username ? resource.username : "",
                role: resource.designation ? resource.designation : "",
                email: resource.email ? resource.email : "",
                reportsTo: resource.reportsTo ? resource.reportsTo : "",
                shiftTime: resource.shiftTime ? resource.shiftTime : "",
              })),
            };
          });

        return {
          name: manager.fullname ? manager.fullname : "",
          username: manager.username ? manager.username : "",
          role: manager.designation ? manager.designation : "",
          shiftTime: manager.shiftTime ? manager.shiftTime : "",
          leads: managerLeads ? managerLeads : "",
        };
      });

      res.send({
        message: `'${response.fullname}' Login Successfully`,
        data: managersHierarchy,
      });
    } else {
      res.send({
        message: `'${response.fullname}' Login Successfully`,
        data: {
          id: response.id,
          fullname: response.fullname,
          username: response.username,
          role: response.designation,
          email: response.email,
          reportsTo: response.reportsTo,
          shiftTime: response.shiftTime,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

module.exports = { userReg, fetchAllUsers, userLogin };
