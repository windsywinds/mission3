const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
router.post("/", async (req, res) => {
  console.log("Request on calculate Risk!");
  const { claim_history } = req.body;
  try {
    if (typeof claim_history !== "string") {
      throw new Error("input must be a string");
    }
    const triggerWords = ["collide", "crash", "scratch", "bump", "smash"];
    let count = 0;
    // Split the user input into words
    const words = claim_history.split(" ");
    //For loop to check word list against the triggers and add a count for each
    for (const word of words) {
      if (
        triggerWords.some((trigger) =>
          word.toLowerCase().includes(trigger.toLowerCase()),
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
    const riskResult = count;
    return res.status(200).json({ risk_rating: riskResult });
  } catch (error) {
    return res.status(400).json({ error: "there is an error" });
  }
});
module.exports = router;