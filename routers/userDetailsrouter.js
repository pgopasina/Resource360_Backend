const express = require("express");
const router = express.Router();
const userDetails = require("../services/userDetailsService");

router.post("/userDetails", userDetails.userReg);
router.get("/getUser", userDetails.fatchAllUsers);
router.get("/userlogin", userDetails.userLogin);

module.exports = router;
