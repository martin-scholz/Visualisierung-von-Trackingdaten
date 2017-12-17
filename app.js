/*
app.js
version : 1.0.0
datum: 8.12.2017
autor : Martin Scholz
*/

var express = require('express')
      ,http = require('http')
      ,path = require('path')
      ,app = express()
      ,fs = require('fs');


// database connection
var mongoose = require('mongoose');

MONGOLAB_URI = 'mongodb://hotomama:mamahoto0@ds143774.mlab.com:43774/trips';
mongoose.connect(MONGOLAB_URI);

//Datenbank Verbindung wird hergestellt
//mongoose.connect('mongodb://localhost/trips'); // local small


// Einige Umgebungsvariablen
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middlewarefunktionen
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'webapp')));

//Controller werden dynamisch eingelesen
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
      console.log(file);
  }
});

//Server-Erstellung
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
