const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");

const routetest = require ("./routes/routetest")


const server = express();
const PORT = process.env.PORT || 8000;
server.use(cors());

server.get("/", (req, res) => {
  res.send(`
  <h1>The API</h1>  
`);
});

server.use("/routetest/", routetest);

//Allow a test route and response to ensure connection and operation between testing and server
server.use("/test", (req, res) => {
  //.use to allow both post and get
  const testResponse = "You're receiving a response from Azure!";
  res.json(testResponse);
});


server.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});


