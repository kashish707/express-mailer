const express = require('express');
const mailer = require('express-mailer');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json({extended:false}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

mailer.extend(app, {
  from: 'kashish',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'user@gmail.com',
    pass: 'user_pwd'
  }
});

app.get('/', function (req, res, next) {
    app.mailer.send('email', {
      to: 'to@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
      subject: 'Test Email', // REQUIRED.
      otherProperty: 'Other Property' ,// All additional properties are also passed to the template as local variables.
    }, function (err) {
      if (err) {
        // handle error
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
      res.send('Email Sent');
    });
});
  
app.listen(port, () => {
    console.log(`Server started in mode on port ${port} `);
  });