
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");

const routetest = require ("./routes/routetest")
const calculatevalue = require("./routes/calculateValue")
const calculaterisk = require("./routes/calculateRisk")

const server = express();

server.use(cors());
server.get("/", (req, res) => {
  res.send(`
    <h1>API1</h1>
    <p>The app is operable:</p>
    <p>/routetest/</p> Working
    <p>/calculatevalue/</p> not working
    <p>/calculaterisk/</p> not working
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



module.exports = { server }; //Export server and functions for testing purposes
