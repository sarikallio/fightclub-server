var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); // support json encoded bodies
var users = require('./foods');

// var foods = [{name: 'Pizza'}, {name: 'Burger'}]

app.get('/', function (req, res, next) {
    users.users()    
     .then(response => {    
       res.json(response.rows);    
     });   
    });

// app.get('/', function(req, res, next) {
//   res.json(foods);
// });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}   

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Now listening at http://%s:%s", host, port);
});