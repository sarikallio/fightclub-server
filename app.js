require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); // support json encoded bodies
app.use(cors());

var services = require('./services');

app.get('/foods', function (req, res, next) {
    services.foods()    
     .then(response => {    
       res.json(response.rows);    
     });   
     services.counter()
     .then(response => {
       res.json(response.rows);
     })
    });

app.post('/foods', function (req, res, next){
  console.log("Req.body foods: ", req.body);
  services.newFood(req.body)
  .then(resp=>{
      res.send(resp);
  })
  .catch(err=>{
      console.error(err);
      res.status(400).send(err);
  })
})

app.get('/fights', function (req, res, next) {
  services.fights()    
    .then(response => {    
      res.json(response.rows);    
    });   
  });

app.get('/feedback', function (req, res, next) {
  services.feedback()    
    .then(response => {    
      res.json(response.rows);    
    });   
  });

app.post('/feedback', function (req, res, next){
  console.log("Req.body feedback: ", req.body);
  services.newMessage(req.body)
  .then(resp=>{
      res.send(resp);
  })
  .catch(err=>{
      console.error(err);
      res.status(400).send(err);
  })
})

app.delete('/feedback', function(req, res){
  services.deleteAll(function(deletecount) {
    res.send(JSON.stringify({deletedcount: deletecount}));    
  })
});

app.delete('/feedback/:id', (req, res, next) => {
  const id = req.params.id; 
  console.log("id: ", id);
  services.deleteOne(id)
    .then(resolved => {
      res.send('Deleted ' + resolved.rowCount + ' rows of comments');
    })
  });

app.delete('/foods', function(req, res){
  services.deleteFoods(function(deletecount) {
    res.send(JSON.stringify({deletedcount: deletecount}));    
  })
});

app.delete('/foods/:id', (req, res, next) => {
  const id = req.params.id; 
  console.log("id: ", id);
  services.deleteOneFood(id)
    .then(resolved => {
      res.send('Deleted ' + resolved.rowCount + ' rows of foods');
    })
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