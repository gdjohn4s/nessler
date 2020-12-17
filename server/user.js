const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Filter = require('bad-words');
require('dotenv').config();
const monk = require('monk');

// - Mongo config
const Schema = mongoose.Schema;
const objectId = mongoose.objectId;

const db = monk(process.env.MONGO_URI);
const userColl = db.get('users')

// const conn = mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

// - User Schema
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    timestamp: Date
});

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Requested URI Path : ', req.url)
    next()
  }) 

router.get('/' , (req, res) =>{
    res.json({
        message: "welcome"
    })
})

// - Get all users 
router.get('/users', (req, res, next) => {
    userColl
      .find()
      .then(userColl => {
        res.json(userColl);
      }).catch(next);
  });

// - Insert an user
router.post('/addUser' , (req, res, next) =>{ 

    // var User = mongoose.model('User', userSchema);
    // let user= new User({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name
    // });

    // user.save(err =>{
    //     if (err)
    //         throw err;
    //     else
    //         res.json({
    //             message: "User added to db"
    //         });
    //         console.log('User added to db..')
    // });

    const newUser = {
        username: req.body.username.toString().trim(),
        created: new Date()
    };

    userColl
        .insert(newUser)
        .then(() =>{
            res.json(newUser);
        }).catch(next);
});

router.get('/about', (req, res) =>{
    res.json({
        message: "about this nothing"
    });
});

module.exports = router;