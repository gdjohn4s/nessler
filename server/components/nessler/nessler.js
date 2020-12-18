const express = require('express');
const router = express.Router();
const monk = require('monk');

require('dotenv').config();

// - Mongo Configuration
// - It will connect to the mongo database and find nessler collection, if not found, it will created
const db = monk(process.env.MONGO_URI);
const nessler = db.get('nessler')

// - Nessler middleware
// - middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Requested Nessler URI Path : ', req.url)
    next()
  }) 

// - Get all nesslers with a db find function
router.get('/nessler', (req, res, next) => {
    nessler
        .find()
        .then(nessler => {
            res.json(nessler);
        }).catch(next);
});

// - Validation function
function isValidNessler(nessler) {
    return nessler.user && nessler.user.toString().trim() !== '' && nessler.user.toString().trim().length <= 20 && 
    nessler.nessler && nessler.nessler.toString().trim() !== '' && nessler.nessler.toString().trim().length <= 100 ;
}

// - Insert a nessler into the database
router.post('/addNessler', (req, res, err) => {
    if (isValidNessler(req.body)) {
        const newNessler = {
            user: req.body.user,
            nessler: req.body.nessler,
            created: new Date()
        };

        nessler
            .insert(newNessler)
            .then(createdNessler => {
                res.json(createdNessler);
            }).catch(err);
    } else {
        res.status(422);
        res.json({
            httpStatus: res.statusCode,
            message: "User and Nessler are required! Name cannot be longer than 20 chars and nessler cannot be longer than 100 chars."
        });
    }
});

module.exports = router;