// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', (req, res) => {
  let unix, utc, date = new Date();

  unix = date.getTime();
  utc = date.toGMTString();

  res.json({unix, utc});
});

app.get('/api/timestamp/:date_string', (req, res) => {
  const time = req.params.date_string;

  let unix, utc, date;
  if(/\d{5,}/.test(time)) date = new Date(Number(time));
  else date = new Date(time);

  if(isNaN(date.getTime())) res.json({error: 'Invalid Date'});
  else {
    unix = date.getTime();
    utc = date.toGMTString();

    res.json({unix, utc});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
