const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use("/test", (req, res) => {
    const testResponse = "You're receiving a response!";
    res.json(testResponse);
  });

server.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, Azure!" });
});



module.exports = { server };