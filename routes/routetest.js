const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router()


router.post('/', (req, res) => {
    const response = "You're receiving a response!";
    return res.status(200).json(response);
})

module.exports = router