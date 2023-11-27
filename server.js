
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");

const routetest = require ("./routes/routetest")

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use("/routetest/", routetest);

//Allow a test route and response to ensure connection and operation between testing and server
server.use("/test", (req, res) => {
  //.use to allow both post and get
  const testResponse = "You're receiving a response from Azure!";
  res.json(testResponse);
});



module.exports = { server }; //Export server and functions for testing purposes
