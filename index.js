const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, Azure!" });
});

const PORT = process.env.PORT || 8000;

const httpServer = server.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});

// Close the server after all tests are completed
afterAll((done) => {
  httpServer.close(done);
});

module.exports = { server, httpServer };