var path = require('path')
var express = require('express')
var app = express()
var port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/assets/', express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.render('index');

})
app.listen(port, function() {
  console.log('Listening on port: ' + port)
})