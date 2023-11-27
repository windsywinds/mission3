
const express = require("express");
const bodyParser = require("body-parser");

const calculatevalue = express.Router();
calculatevalue.use(bodyParser.json());


calculatevalue.post("/", async (req, res) => {
    console.log("Request on calculate Value!")
    try {
        const model = req.body;
        const year = req.body;
        if (typeof model !== "string" || typeof year !== "number" || year < 0) {
          return res.status(400).json({ error: "Invalid input. Please provide a valid model and year." });
        }
        // Convert model to lowercase
        const carModel = model.toLowerCase();
        // For loop to assign a value for each letter
        let modelValue = 0;
        for (let i = 0; i < carModel.length; i++) {
          const charCode = carModel.charCodeAt(i);
          if (charCode >= 97 && charCode <= 122) {
            modelValue += charCode - 96;
          }
        }
        // Multiply the alphanumeric total by 100 and add the year to find carValue
        const carValue = modelValue * 100 + year;
    
        return res.status(200).json({ car_value: carValue });
      } catch (error) {
        console.error("Error in calculateValue route:", error);
        return res.status(500).json({ error: "Error in calculateValue route." });
      }
});


module.exports = calculatevalue;
