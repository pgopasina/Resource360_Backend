const { Op } = require("sequelize");
const resourceStatus = require("../models/resourceStatusModel");
const ResourceStatusSchema = require("../models/resourceStatusModel");
const aiSummarizingStatus = require("../services/genaiAPI");

var createResourceStatus = async (req, res) => {
  try {
    var resourceStatus = await ResourceStatusSchema.create({
      username: req.body.username,
      date: new Date().toISOString().split("T")[0],
      status: req.body.status,
      summary: req.body.summary,
      comments: req.body.comments,
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

var statusInRange = async (req, res) => {
  const { from, to } = req.body;
  if ((!from || !to) && !req.body.username) {
    return res
      .status(400)
      .json({ Error: "Please provide both dates Range and username." });
  }
  try {
    const statusInRange = await resourceStatus.findAll({
      where: {
        date: {
          [Op.between]: [new Date(from), new Date(to)],
        },
        username: req.body.username,
      },
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

    const summary = await aiSummarizingStatus(dailyStatus.status);
    await ResourceStatusSchema.update(
      { summary: summary },
      { where: { username: req.body.username, date: req.body.date } }
    );
    await res.status(200).send({ dailyStatus });
  } catch (error) {
    res.status(401).send({
      message: "Unable Fetch the Daily Status",
      Error: error,
    });
  }
};

var updateStatus = async (req, res) => {
  try {
    const userExists = await ResourceStatusSchema.findOne({
      where: { username: req.body.username, date: req.body.date },
    });
    //     const lengthOfJSON = Object.keys(userExists.status).length;
    // console.log("userExists", lengthOfJSON);

    if (!userExists) {
      return res.status(404).send({
        message: `User '${req.body.username}' does not exist or There is no record on '${req.body.date}'.`,
      });
    }
    var updateStatus = await ResourceStatusSchema.update(
      {
        status: req.body.status,
        comments: req.body.comments,
      },
      { where: { username: req.body.username, date: req.body.date } }
    );

    if (updateStatus[0] === 1) {
      res.status(200).send({
        message: "Successfully Updated Status",
      });
    } else {
      res.status(201).send({
        message: "There are no changes in the Status",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Unable to update the Daily Status",
      Error: error.message,
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
