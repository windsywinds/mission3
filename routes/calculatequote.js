const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
router.post("/", async (req, res) => {
  try {
    const value = req.body.car_value;
    const risk = req.body.risk_rating;
    if (typeof value !== "number" || typeof risk !== "number") {
      return res.status(400).json({ error: "there is an error" });
    }
    const yearly = (value * risk) / 100;
    const monthly = yearly / 12;
    const result = {
      monthly_premium: monthly,
      yearly_premium: yearly,
    };
    res.json(result);
  } catch (error) {
    return res.status(400).json({ error: "there is a catch error" });
  }
});
module.exports = router;