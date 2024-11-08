const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User_Details = require("./routers/userDetailsrouter");
require('./connection')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/user", User_Details);

app.get("/", (req, res) => {
  res.send("Hello, World from Bench360App!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
