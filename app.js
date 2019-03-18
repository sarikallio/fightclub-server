var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); // support json encoded bodies
var users = require('./foods');

app.get('/foods', function (req, res, next) {
    users.users()    
     .then(response => {    
       res.json(response.rows);    
     });   
    });

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Now listening at http://%s:%s", host, port);
});