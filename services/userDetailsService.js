const { Op } = require("sequelize");
const userSchema = require("../models/userDetailsModel");
const ResourceStatusSchema = require("../models/resourceStatusModel");
const userSchemaValidation = require("../models/userDetailsModel");
var userReg = async (req, res) => {
  try {
    const { error } = userSchemaValidation.validate(req.body);
    if (error) {
      return res.status(400).send({
        message: "Validation Error",
        details: error.details,
      });
    }

    var userDetails = await userSchema.create({
      fullname: req.body.fullname,
      username: req.body.username,
      designation: req.body.designation,
      email: req.body.email,
      password: req.body.password,
      reportsTo: req.body.reportsTo,
      shiftTime: req.body.shiftTime,
    });
    res.status(200).send({
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
        res.status(200).send(userDetails);
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

var userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const managers = await userSchema.findAll({
      where: { designation: "Project Manager" },
    });

    const leads = await userSchema.findAll({
      where: {
        designation: {
          [Op.in]: ["Technical associate", "Sr.Technical associate"],
        },
      },
    });
    const resources = await userSchema.findAll({
      where: { designation: "Jr.Technical associate" },
    });

    if (user.designation === "Project Manager" && user.email === email) {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const yesterday = date.toISOString().split("T")[0];

      const allStatuses = await ResourceStatusSchema.findAll({
        where: {
          date: yesterday,
        },
      });
      const managersHierarchy = managers
        .filter((manager) => manager.email === email)
        .map((manager) => ({
          fullname: manager.fullname ? manager.fullname : "",
          username: manager.username ? manager.username : "",
          role: manager.designation ? manager.designation : "",
          email: manager.email ? manager.email : "",
          HRcontact: manager.HRcontact ? manager.HRcontact : "",
          shiftTime: manager.shiftTime ? manager.shiftTime : "",
          leads: leads
            .filter((lead) => lead.reportsTo === manager.fullname)
            .map((lead) => ({
              fullname: lead.fullname ? lead.fullname : "",
              username: lead.username ? lead.username : "",
              role: lead.designation ? lead.designation : "",
              email: lead.email ? lead.email : "",
              reportsTo: lead.reportsTo ? lead.reportsTo : "",
              HRcontact: lead.HRcontact ? lead.HRcontact : "",
              shiftTime: lead.shiftTime ? lead.shiftTime : "",
              yesterdayStatus:
                allStatuses.find(
                  (summary) => summary.username === lead.username
                )?.summary || "No status available",
              resources: resources
                .filter((resource) => resource.reportsTo === lead.fullname)
                .map((resource) => ({
                  fullname: resource.fullname ? resource.fullname : "",
                  username: resource.username ? resource.username : "",
                  role: resource.designation ? resource.designation : "",
                  email: resource.email ? resource.email : "",
                  reportsTo: resource.reportsTo ? resource.reportsTo : "",
                  HRcontact: resource.HRcontact ? resource.HRcontact : "",
                  shiftTime: resource.shiftTime ? resource.shiftTime : "",
                  yesterdayStatus:
                    allStatuses.find(
                      (summary) => summary.username === resource.username
                    )?.summary || "No status available",
                })),
            })),
        }));

      res.status(200).send({
        message: `'${user.fullname}' Login Successfully`,
        logUserRole: user.designation,
        data: managersHierarchy,
      });
    } else if (
      (user.designation === "Technical associate" ||
        user.designation === "Sr.Technical associate") &&
      user.email === email
    ) {
      const leadHierarchy = managers
        .filter((manager) => manager.fullname === user.reportsTo)
        .map((manager) => ({
          fullname: manager.fullname ? manager.fullname : "",
          username: manager.username ? manager.username : "",
          role: manager.designation ? manager.designation : "",
          email: manager.email ? manager.email : "",
          HRcontact: manager.HRcontact ? manager.HRcontact : "",
          lead: leads
            .filter((lead) => user.email === lead.email)
            .map((lead) => ({
              fullname: lead.fullname ? lead.fullname : "",
              username: lead.username ? lead.username : "",
              role: lead.designation ? lead.designation : "",
              email: lead.email ? lead.email : "",
              reportsTo: lead.reportsTo ? lead.reportsTo : "",
              HRcontact: lead.HRcontact ? lead.HRcontact : "",
              shiftTime: lead.shiftTime ? lead.shiftTime : "",
            })),
        }));
      res.status(200).send({
        message: `'${user.fullname}' Login Successfully`,
        logUserRole: user.designation,
        data: leadHierarchy,
      });
    } else {
      let loginUser = leads.filter((lead) => lead.fullname === user.reportsTo);

      const employeeHierarchy = managers
        .filter((manager) => manager.fullname === loginUser[0].reportsTo)
        .map((manager) => ({
          fullname: manager.fullname ? manager.fullname : "",
          username: manager.username ? manager.username : "",
          role: manager.designation ? manager.designation : "",
          email: manager.email ? manager.email : "",
          HRcontact: manager.HRcontact ? manager.HRcontact : "",
          lead: leads
            .filter((lead) => user.reportsTo === lead.fullname)
            .map((lead) => ({
              fullname: lead.fullname ? lead.fullname : "",
              username: lead.username ? lead.username : "",
              role: lead.designation ? lead.designation : "",
              email: lead.email ? lead.email : "",
              reportsTo: lead.reportsTo ? lead.reportsTo : "",
              HRcontact: lead.HRcontact ? lead.HRcontact : "",
              resource: resources
                .filter((resource) => resource.email === user.email)
                .map((resource) => ({
                  fullname: resource.fullname ? resource.fullname : "",
                  username: resource.username ? resource.username : "",
                  role: resource.designation ? resource.designation : "",
                  email: resource.email ? resource.email : "",
                  reportsTo: resource.reportsTo ? resource.reportsTo : "",
                  HRcontact: resource.HRcontact ? resource.HRcontact : "",
                  shiftTime: resource.shiftTime ? resource.shiftTime : "",
                })),
            })),
        }));
      res.status(200).send({
        message: `'${user.fullname}' Login Successfully`,
        logUserRole: user.designation,
        data: employeeHierarchy,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

var userEmails = async (req, res) => {
  try {
    let allUsersData = await userSchema.findAll();
    let allEmails = allUsersData.map((mail) => ({
      email: mail.email ? mail.email : "",
    }));

    res.status(200).send({
      message: "All Resource Mails",
      Data: allEmails,
    });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while fetching resource emails",
      error: error.message || "Internal Server Error",
    });
  }
};

var userNames = async (req, res) => {
  try {
    if (!req.params.username) {
      return res.status(400).send({
        message: "Username required",
      });
    }

    const manager = await userSchema.findOne({
      where: { username: req.params.username },
    });

    if (!manager) {
      return res.status(404).send({
        message: "Manager not found",
      });
    }

    const leads = await userSchema.findAll({
      where: { reportsTo: manager.fullname },
    });

    const leadFullname = [...new Set(leads.map((lead) => lead.fullname))];
    const userDetails = await userSchema.findAll({
      where: {
        reportsTo: {
          [Op.in]: leadFullname,
        },
      },
    });

    // Flatten the structure
    const result = [
      {
        fullname: manager.fullname,
        username: manager.username,
      },
      ...leads.map((lead) => ({
        fullname: lead.fullname,
        username: lead.username,
      })),
      ...userDetails.map((resource) => ({
        fullname: resource.fullname,
        username: resource.username,
      })),
    ];

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while fetching User Names",
      error: error.message || "Internal Server Error",
    });
  }
};

var userHierarchy = async (req, res) => {
  try {
    const user = await userSchema.findOne({
      where: { username: req.params.username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }

    const managers = await userSchema.findAll({
      where: { designation: "Project Manager" },
    });

    const leads = await userSchema.findAll({
      where: {
        designation: {
          [Op.in]: ["Technical associate", "Sr.Technical associate"],
        },
      },
    });
    const resources = await userSchema.findAll({
      where: { designation: "Jr.Technical associate" },
    });

    if (
      user.designation === "Project Manager" &&
      user.username === req.params.username
    ) {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const yesterday = date.toISOString().split("T")[0];

      const allStatuses = await ResourceStatusSchema.findAll({
        where: {
          date: yesterday,
        },
      });
      const managersHierarchy = managers
        .filter((manager) => manager.username === req.params.username)
        .map((manager) => ({
          fullname: manager.fullname ? manager.fullname : "",
          username: manager.username ? manager.username : "",
          role: manager.designation ? manager.designation : "",
          email: manager.email ? manager.email : "",
          HRcontact: manager.HRcontact ? manager.HRcontact : "",
          shiftTime: manager.shiftTime ? manager.shiftTime : "",
          leads: leads
            .filter((lead) => lead.reportsTo === manager.fullname)
            .map((lead) => ({
              fullname: lead.fullname ? lead.fullname : "",
              username: lead.username ? lead.username : "",
              role: lead.designation ? lead.designation : "",
              email: lead.email ? lead.email : "",
              reportsTo: lead.reportsTo ? lead.reportsTo : "",
              HRcontact: lead.HRcontact ? lead.HRcontact : "",
              shiftTime: lead.shiftTime ? lead.shiftTime : "",
              yesterdayStatus:
                allStatuses.find(
                  (summary) => summary.username === lead.username
                )?.summary || "No status available",
              resources: resources
                .filter((resource) => resource.reportsTo === lead.fullname)
                .map((resource) => ({
                  fullname: resource.fullname ? resource.fullname : "",
                  username: resource.username ? resource.username : "",
                  role: resource.designation ? resource.designation : "",
                  email: resource.email ? resource.email : "",
                  reportsTo: resource.reportsTo ? resource.reportsTo : "",
                  HRcontact: resource.HRcontact ? resource.HRcontact : "",
                  shiftTime: resource.shiftTime ? resource.shiftTime : "",
                  yesterdayStatus:
                    allStatuses.find(
                      (summary) => summary.username === resource.username
                    )?.summary || "No status available",
                })),
            })),
        }));

      res.status(200).send({
        message: `You fatched the '${user.fullname}' Hierarchy`,
        data: managersHierarchy,
      });
    } else if (
      (user.designation === "Technical associate" ||
        user.designation === "Sr.Technical associate") &&
      user.username === req.params.username
    ) {
      const leadHierarchy = managers
        .filter((manager) => manager.fullname === user.reportsTo)
        .map((manager) => ({
          fullname: manager.fullname ? manager.fullname : "",
          username: manager.username ? manager.username : "",
          role: manager.designation ? manager.designation : "",
          email: manager.email ? manager.email : "",
          HRcontact: manager.HRcontact ? manager.HRcontact : "",
          lead: leads
            .filter((lead) => user.username === lead.username)
            .map((lead) => ({
              fullname: lead.fullname ? lead.fullname : "",
              username: lead.username ? lead.username : "",
              role: lead.designation ? lead.designation : "",
              email: lead.email ? lead.email : "",
              reportsTo: lead.reportsTo ? lead.reportsTo : "",
              HRcontact: lead.HRcontact ? lead.HRcontact : "",
              shiftTime: lead.shiftTime ? lead.shiftTime : "",
            })),
        }));
      res.status(200).send({
        message: `You fatched the '${user.fullname}' Hierarchy`,
        data: leadHierarchy,
      });
    } else {
      let loginUser = leads.filter((lead) => lead.fullname === user.reportsTo);

      const employeeHierarchy = managers
        .filter((manager) => manager.fullname === loginUser[0].reportsTo)
        .map((manager) => ({
          fullname: manager.fullname ? manager.fullname : "",
          username: manager.username ? manager.username : "",
          role: manager.designation ? manager.designation : "",
          email: manager.email ? manager.email : "",
          HRcontact: manager.HRcontact ? manager.HRcontact : "",
          lead: leads
            .filter((lead) => user.reportsTo === lead.fullname)
            .map((lead) => ({
              fullname: lead.fullname ? lead.fullname : "",
              username: lead.username ? lead.username : "",
              role: lead.designation ? lead.designation : "",
              email: lead.email ? lead.email : "",
              reportsTo: lead.reportsTo ? lead.reportsTo : "",
              HRcontact: lead.HRcontact ? lead.HRcontact : "",
              resource: resources
                .filter((resource) => resource.email === user.email)
                .map((resource) => ({
                  fullname: resource.fullname ? resource.fullname : "",
                  username: resource.username ? resource.username : "",
                  role: resource.designation ? resource.designation : "",
                  email: resource.email ? resource.email : "",
                  reportsTo: resource.reportsTo ? resource.reportsTo : "",
                  HRcontact: resource.HRcontact ? resource.HRcontact : "",
                  shiftTime: resource.shiftTime ? resource.shiftTime : "",
                })),
            })),
        }));
      res.status(200).send({
        message: `You fatched the '${user.fullname}' Hierarchy`,
        data: employeeHierarchy,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while fatching the Data",
      error: error.message,
    });
  }
};

module.exports = {
  userReg,
  fetchAllUsers,
  userLogin,
  userEmails,
  userNames,
  userHierarchy,
};
