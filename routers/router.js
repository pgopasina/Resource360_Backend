const express = require("express");
const router = express.Router();
const userDetails = require("../services/userDetailsService");
const ResourceStatus = require('../services/resourceStatusService')

// User Registeration
router.post("/details", userDetails.userReg);
router.get("/fatchAll", userDetails.fatchAllUsers);

// User Login
router.post("/login", userDetails.userLogin);

// Resource Status
router.post("/status", ResourceStatus.createResourceStatus)

module.exports = router;
