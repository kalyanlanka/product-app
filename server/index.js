const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      mongoose = require('mongoose'),
      config = require('./config/main'),
      router = require('./router');




const server = app.listen(config.port);
console.log('Your Server is running on port ' + config.port + '.');

app.use(logger('dev'));



app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
mongoose.connect(config.database);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router(app);
