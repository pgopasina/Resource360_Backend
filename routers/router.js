const express = require("express");
const router = express.Router();
const userDetails = require("../services/userDetailsService");
const ResourceStatus = require("../services/resourceStatusService");
const sendMail = require("../services/mailing");

// User Registeration
router.post("/details", userDetails.userReg);
router.get("/fetchAll", userDetails.fetchAllUsers);
router.get("/allMails", userDetails.userEmails);

// User Login
router.post("/login", userDetails.userLogin);

// Resource Status
router.post("/dailyStatus", ResourceStatus.getDailyStatus);
router.get("/allStatus/:username", ResourceStatus.fetchAllStatus);
router.post("/status", ResourceStatus.upsertResourceStatus);
router.post("/statusInRange", ResourceStatus.statusInRange);
router.delete("/delete/:id", ResourceStatus.deleteStatus);
router.post("/elasticSearch", ResourceStatus.elasticSearchStatus);
// router.post("/status", ResourceStatus.createResourceStatus);
// router.put("/editStatus", ResourceStatus.updateStatus);

// router.post("/sendmail", sendMail.setEmailDetails);
router.post("/sendmail", sendMail.sendMail);

module.exports = router;
