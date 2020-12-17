const express = require('express');
const router = express.Router();
require('dotenv').config();

console.log(process.env.MONGO_URI);

router.get('/testDotenv', (req, res) =>{
    res.json({
        URI: process.env.MONGO_URI
    })
})

module.exports = router;