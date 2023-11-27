const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");

const routetest = require ("./routes/routetest")
const calculatevalue = require("./routes/calculateValue")
const calculaterisk = require("./routes/calculateRisk")


const server = express();
const PORT = process.env.PORT || 8000;
server.use(cors());

server.get("/", (req, res) => {
  res.send(`
  <h1>Mission1 API</h1>  
`);
});

server.use("/routetest/", routetest);
server.use("/calculatevalue/", calculatevalue);
server.use("/calculaterisk/", calculaterisk);

//Allow a test route and response to ensure connection and operation between testing and server
server.use("/test", (req, res) => {
  //.use to allow both post and get
  const testResponse = "You're receiving a response from Azure!";
  res.json(testResponse);
});


server.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});


