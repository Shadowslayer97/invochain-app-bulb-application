var express = require('express');
require('dotenv').config();

var mongoFunction = require('./mongoFunction/connect');

var app = express();

app.set('view engine','ejs');

app.get('/',mongoFunction.getBulbState);

app.listen(3000,function(err){
  if(err) console.log('Error detected');

  console.log('Server running at port 3000');
});
