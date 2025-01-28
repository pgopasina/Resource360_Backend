const { Op } = require("sequelize");
const resourceStatus = require("../models/resourceStatusModel");
const ResourceStatusSchema = require("../models/resourceStatusModel");
const aiSummarizingStatus = require("../services/genaiAPI");

const upsertResourceStatus = async (req, res) => {
  try {
    const { id, username, date, status, summary, comments } = req.body;

    const [resourceStatusRecord, statusCreated] =
      await ResourceStatusSchema.upsert({
        id: id || undefined,
        username,
        date,
        status,
        summary,
        comments,
      });

    if (statusCreated) {
      res.status(201).json({
        message: "Your Status is Saved",
        resourceStatus: resourceStatusRecord,
      });
    } else {
      res.status(200).json({
        message: "Your Status is Updated",
        resourceStatus: resourceStatusRecord,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Unable to save your Status, Date must be unique",
      error: error.message,
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

var deleteStatus = async (req, res) => {
  try {
    var dailyStatus = await ResourceStatusSchema.deleteOne({
      date: req.params.id,
    });

    if (dailyStatus.deletedCount === 0) {
      return res.status(404).send({
        message: "Status not found to delete.",
      });
    }

    return res.status(200).send({ message: "Status deleted successfully" });
  } catch (error) {
    console.error(error); // Log the full error
    res.status(500).send({
      message: "Unable to delete Status",
      error: error.message || error,
    });
  }
};

const elasticSearchStatus = async (req, res) => {
  try {
    const { year, month, username, from, to } = req.body;

    let query = {
      where: {},
    };

    // Handle date filtering logic
    if (year && month) {
      const startDate = new Date(Date.UTC(year, month - 1, 1)); // Start of the month
      const endDate = new Date(Date.UTC(year, month, 0)); // Last day of the month
      query.where.date = {
        [Op.between]: [
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0],
        ],
      };
    } else if (from && to) {
      query.where.date = {
        [Op.between]: [
          new Date(from).toISOString().split("T")[0],
          new Date(to).toISOString().split("T")[0],
        ],
      };
    } else if (year) {
      const startDate = new Date(Date.UTC(year, 0, 1)); // January 1st
      const endDate = new Date(Date.UTC(year, 11, 31)); // December 31st
      query.where.date = {
        [Op.between]: [
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0],
        ],
      };
    }

    if (username) {
      query.where.username = username;
    }
    const statuses = await ResourceStatusSchema.findAll(query);
    res.status(200).json(statuses);
  } catch (error) {
    console.error("Error fetching statuses in range:", error);
    res.status(500).json({
      message: "Error fetching statuses",
      error: error.message || error,
    });
  }
};

module.exports = elasticSearchStatus;

// var createResourceStatus = async (req, res) => {
//   try {
//     var [resourceStatus, statusCreated] = await ResourceStatusSchema.create({
//       username: req.body.username,
//       date: new Date().toISOString().split("T")[0],
//       status: req.body.status,
//       summary: req.body.summary,
//       comments: req.body.comments,
//     });
//     if (statusCreated) {
//       res.status(201).json({ message: "Your Status is Saved", resourceStatus });
//     } else {
//       res
//         .status(200)
//         .json({ message: "Your Status is updated", resourceStatus });
//     }
//   } catch (error) {
//     res.status(401).send({
//       message: "Unable to save your Status",
//       Error: error,
//     });
//   }
// };

// var updateResourceStatus => {
//   try {
//     const userExists = await ResourceStatusSchema.findOne({
//       where: { username: req.body.username, date: req.body.date },
//     });
//     //     const lengthOfJSON = Object.keys(userExists.status).length;
//     // console.log("userExists", lengthOfJSON);

//     if (!userExists) {
//       return res.status(404).send({
//         message: `User '${req.body.username}' does not exist or There is no record on '${req.body.date}'.`,
//       });
//     }
//     var updateStatus = await ResourceStatusSchema.update(
//       {
//         status: req.body.status,
//         comments: req.body.comments,
//       },
//       { where: { username: req.body.username, date: req.body.date } }
//     );

//     if (updateStatus[0] === 1) {
//       res.status(200).send({
//         message: "Successfully Updated Status",
//       });
//     } else {
//       res.status(201).send({
//         message: "There are no changes in the Status",
//       });
//     }
//   } catch (error) {
//     res.status(500).send({
//       message: "Unable to update the Daily Status",
//       Error: error.message,
//     });
//   }
// };

module.exports = {
  upsertResourceStatus,
  getDailyStatus,
  fetchAllStatus,
  statusInRange,
  deleteStatus,
  elasticSearchStatus,
  // createResourceStatus,
  // updateResourceStatus,
};
