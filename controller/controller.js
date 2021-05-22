var Blog = require('../models/Blog');

exports.getById = (req, res, next)=>{
    console.log('the response will be sent by the next function ...');
    next();
  }, function (req, res) {
    res.send('Hello from B!');
  };
