const express = require('express');
const cors = require('cors');
const user = require('./user.js');
const testApi = require('./test/testApi.js');
const nesslerApi = require('./components/nessler/nessler.js');

app = express();
app.use(cors());
app.use(express.json());

app.use('/v1/', nesslerApi);

app.listen(3000, (err) => {
    console.log("Listening");
})