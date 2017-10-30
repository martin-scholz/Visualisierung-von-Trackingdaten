var express = require('express')
      ,http = require('http')
      ,path = require('path')
      ,app = express()
      ,fs = require('fs');

// database connection
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/_ConnTrips');
MONGOLAB_URI = 'mongodb://hotomama:mamahoto0@ds143774.mlab.com:43774/trips';
mongoose.connect(MONGOLAB_URI);
//mongoose.connect('mongodb://localhost/trips');

// some environment variabless
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});
// var route = require('./controllers/index');
// route.controller(app);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
