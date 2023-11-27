const express = require("express");

const routetest = express.Router();

routetest.use("/", async (req, res) => {
    const testResponse = "You're receiving a response from the test route!";
    console.log("Request on routetest!")
    res.status(200).json(testResponse);
  });


module.exports = routetest;