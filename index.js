const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("C:/Users/pgopasina/Resource360_Backend/swagger.yaml");
const routers = require("./routers/router");
require('./connection')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
let options = {
  origin:'*'
}
app.use(cors(options))

app.use("/resource", routers);
app.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Hello, World from Bench360App!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
