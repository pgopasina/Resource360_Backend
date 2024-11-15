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

module.exports = {createResourceStatus}