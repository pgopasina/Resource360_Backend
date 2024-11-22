const { Op } = require("sequelize");
const resourceStatus = require("../models/resourceStatusModel");
const ResourceStatusSchema = require("../models/resourceStatusModel");

var createResourceStatus = async (req, res) => {
  try {
    var resourceStatus = await ResourceStatusSchema.create({
      username: req.body.username,
      date: new Date().toISOString().split("T")[0],
      status: req.body.status,
    });
    res.status(200).send({
      Message: "Your Status is Saved",
      Data: resourceStatus,
    });
  } catch (error) {
    res.status(401).send({
      message: "Unable to save your Status",
      Error: error,
    });
  }
};

var fetchAllStatus = async (req, res) => {
  try {
    if (!req.params.username) {
      return res.status(400).send({
        message: "Username required",
      });
    }
    const allResourceStatus = await resourceStatus.findAll({
      where: { username: req.params.username },
    });
    if (allResourceStatus.length === 0) {
      return res.status(404).send({
        message: "No status found for the provided username",
      });
    }
    res.status(200).send(allResourceStatus);
  } catch (error) {
    console.error("Error while fetching status:", error);
    res.status(500).send({
      message: "Unable to fetch status",
      Error: error.message || JSON.stringify(error),
    });
  }
};

// const data = await YourModel.findAll({
//     where: {
//       dateColumn: {
//         [Op.between]: [startDate, endDate],
//       },
//     },
//   });
var statusInRange = async (req, res) => {
  const { from, to } = req.body;
  if ((!from || !to) && !req.body.username) {
    return res.status(400).json({ Error: 'Please provide both dates Range and username.' });
  }
  try {
    const statusInRange = await resourceStatus.findAll({
      where: { date:{
        [Op.between]:[new Date(from), new Date(to)],
      }, username:req.body.username },
    });
    if (statusInRange.length === 0) {
      return res.status(404).send({
        message: "No status found for the provided username",
      });
    }
    res.status(200).send(statusInRange);
  } catch (error) {
    console.error("Error while fetching status in Range :", error);
    res.status(500).send({
      message: "Unable to fetch status",
      Error: error.message || JSON.stringify(error),
    });
  }
};

var getDailyStatus = async (req, res) => {
  try {
    var dailyStatus = await ResourceStatusSchema.findOne({
      where: { username: req.body.username, date: req.body.date },
    });

    res.status(200).send({ dailyStatus });
  } catch (error) {
    res.status(401).send({
      message: "Unable Fetch the Daily Status",
      Error: error,
    });
  }
};

var updateStatus = async (req, res) => {
  try {
    var updateStatus = await ResourceStatusSchema.update(
      {
        status: req.body.status,
      },
      { where: { username: req.body.username, date: req.body.date } }
    );
    if (JSON.parse(updateStatus) == 1) {
      res.status(200).send("Successfully Updated Status");
    } else {
      res.status(200).send("There is no changes in Status");
    }
  } catch (error) {
    res.status(401).send({
      message: "Unable update the Daily Status",
      Error: error,
    });
  }
};

module.exports = {
  createResourceStatus,
  getDailyStatus,
  fetchAllStatus,
  updateStatus,
  statusInRange,
};
