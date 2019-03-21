require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); // support json encoded bodies
app.use(cors());

var foods = require('./foods');
var todo = require('./todo');
var counter = require('./counter');
var fights = require('./fights');

app.get('/foods', function (req, res, next) {
    foods.foods()    
     .then(response => {    
       res.json(response.rows);    
     });   
     counter.counter()
     .then(response => {
       res.json(response.rows);
     })
    });

app.get('/fights', function (req, res, next) {
  fights.fights()    
    .then(response => {    
      res.json(response.rows);    
    });   
  });

app.get('/todo', function (req, res, next) {
  todo.todo()    
    .then(response => {    
      res.json(response.rows);    
    });   
  });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}   

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Now listening at http://%s:%s", host, port);
});