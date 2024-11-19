const { where } = require("sequelize");
const resourceStatus = require("../models/resourceStatusModel");
const ResourceStatusSchema = require("../models/resourceStatusModel");

var createResourceStatus = async (req,res)=>{
    try {
        var resourceStatus = await ResourceStatusSchema.create({
            username:req.body.username,
            date: new Date().toISOString().split('T')[0],
            status: req.body.status
        })
        res.status(200).send({
            Message:"Your Status is Saved",
            Data: resourceStatus
        })
    } catch (error) {
        res.status(401).send({
            message:"Unable to save your Status",
            Error: error
        });
    }
};

var fatchAllStatus = async (req, res) => {
    try {
        if (!req.params.username) {
            return res.status(400).send({
                message: "Username required",
            });
        }
        const allResourceStatus = await resourceStatus.findAll({ where: { username: req.params.username } });
        if (allResourceStatus.length === 0) {
            return res.status(404).send({
                message: "No status found for the provided username",
            });
        }
        res.status(200).send(allResourceStatus);
    } catch (error) {
        console.error("Error fetching status:", error);
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
      
      res.status(200).send({dailyStatus});
    } catch (error) {
      res.status(401).send({
        message: "Unable Fatch the Daily Status",
        Error: error,
      });
    }
  };
module.exports = {createResourceStatus, getDailyStatus, fatchAllStatus}