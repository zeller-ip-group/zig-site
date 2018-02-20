var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

// routes

// routes - index
app.get('/', function(request, response) {
  response.render('/index');
});

app.get('/index.html', function(request, response) {
  response.render('/index');
});

app.get('/automation', function(request, response) {
  response.render('/automation');
});

app.get('/automation.html', function(request, response) {
  response.render('/automation');
});

// nodemailer
app.post('/contact', function (request, response) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zelleripsite@gmail.com',
      pass: 'DistrictMake551'
    }
  });

  var message = {
    from: request.body.from,
    to: 'hello@zellerip.com',
    subject: 'New Potential Client - ' + request.body.from,
    text: request.body.messageBody
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      response.send(error);
    } else {
      response.send(info.request);
    }
  });
});

// routes - undefined
app.get('*', function(request, response) {
  response.render('/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
