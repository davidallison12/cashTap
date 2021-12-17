const express = require('express');

const bodyParser = require('body-parser'); 
const pino = require('express-pino-logger')(); // express-pino-logger and pino-colada - for better server logging
const app = express();
const accountSid = "AC34841adf04c2bbe7b98bf7e5ddc08ec1";
const authToken = "7e25b5146f6c49f773bc0abdac5321af";
const twilioPhone = process.env.TWILIO_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken);

require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(pino);




// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: twilioPhone,
//      to: '+12406017856'
//   
//   .then(message => console.log(message.sid));

app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  });


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001🥳')
);
