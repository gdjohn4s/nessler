const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
const user = require('./user.js');
const testApi = require('./test/testApi.js');

app = express();
app.use(cors());
app.use(express.json());

app.use('/v1/', user, testApi);

// app.get('/', (req, res) => {
//     res.json({
//         message: "Welcome"
//     })
// })

app.post('/geppetto', (req, res) => {
    const cacca = {
        cacca: req.body.cacca
    };

    res.json({
        content: cacca,
        statusCode: res.statusCode
    });
});

app.listen(3000, (err) => {
    console.log("Listening");
})