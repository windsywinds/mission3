


const express = require("express");
const bodyParser = require("body-parser");

const calculaterisk = express.Router();



  

calculaterisk.post("/", async (req, res) => {
    const { claim_history } = req.body;
    if (typeof claim_history !== "string") {
      res.status(400).json({ error: "there is an error" });
    }
  try {
    const riskResult = calculateRisk(claim_history);
    res.json({ risk_rating: riskResult });
  } catch (error) {
    res.status(400).json({ error: "there is an error" });
  }

  });

  //Find the risk rating from the users input for API2
function calculateRisk(input) {
    //List an array of words to use as triggers
    const triggerWords = ["collide", "crash", "scratch", "bump", "smash"];
    let count = 0;
    // Split the user input into words
    const words = input.split(" ");
    //For loop to check word list against the triggers and add a count for each
    for (const word of words) {
      if (
        triggerWords.some((trigger) =>
          word.toLowerCase().includes(trigger.toLowerCase())
        )
      ) {
        count++;
      }
    }
    //Check that the rating returned will be atleast 1, and no more than 5
    if (count <= 0) {
      count++;
    }
    if (count >= 6) {
      count = 5;
    }
    return count;
  }

module.exports = calculaterisk;
