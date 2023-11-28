const express = require("express");
const testRouter = require("./routes/routetest");
const calculatevalue = require("./routes/calculatevalue");
const calculaterisk = require("./routes/calculaterisk");
const calculatequote = require("./routes/calculatequote");
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Turners Quote Evaluation API</h1>
    <p>/calculatevalue</p>
    <p>/calculaterisk</p>
    <p>/calculatequote</p>
    `);
});

app.use("/test", testRouter);
app.use("/calculatevalue", calculatevalue);
app.use("/calculaterisk", calculaterisk);
app.use("/calculatequote", calculatequote);

app.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});
