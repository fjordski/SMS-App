'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const app = express();

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

const nexmo = new Nexmo({
  apiKey: 'YOUR_KEY',
  apiSecret: 'YOUR_SECRET',
}, {debug: true});

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  res.send(req.body);

  let NUMBER = YOUR_NUMBER;
  let toNumber = req.body.number;
  let text = req.body.text;

  nexmo.message.sendSms(
    NUMBER, toNumber, text, {type: 'unicode'},
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // Optional: add socket.io -- will explain later
      }
    }
  );
 });