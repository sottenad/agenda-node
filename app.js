//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const mongoose = require('mongoose');
const Signature = require('./models/Signature.js')
const app = express();
const url = process.env.MONGOLAB_URI;



//Allowing all for now.
app.use(cors());
//Enables pre-flight for all routes
//app.options('*', cors()) 


app.use(bodyParser.json())

//=========================//

//====ROOT DIRECTORY===//
app.get('/', function(req, res) {
  res.json('you did it');
});

//====GET ALL SIGNATURES===//
app.get('/api/signatures', function(req, res) {
  Signature.find({}).then(eachOne => {
    res.json(eachOne);
    })
  })

app.options('/api/signatures', cors());
//====POST NEW SIGNATURE===//
app.post('/api/signatures', function(req, res) {
  console.log(req.body);
  Signature.create({
    guestSignature: req.body.signature,
    message: req.body.message,
  }).then(signature => {
    res.json(signature)
  });
});



//====MONGOOSE CONNECT===//
const mongoConfig = {
  autoIndex: false,
  useNewUrlParser: true,
};
mongoose.connect(url, mongoConfig, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
 });


 app.listen(3001);