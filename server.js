// this module holds our emailer settings
const emailer = require('./emailer');

if (!process.env.EMAIL || !process.env.PASSWORD) {
  throw `Emailer credentials missing. Please set EMAIL and PASSWORD for a gmail account in the environment.`
}

// express is our http server framework
const express = require('express');

const app = express();

const port = 3000;

// we take info from ajax requests, not normal form actions
app.use(express.json({ extended: true }));

// render pages which we have on disk
app.use(express.static('public'));

// index page
app.get(`/`, (request, response) => {
  response.sendFile(__dirname + `/index.html`);
})

app.listen(port, () => console.log(`Listening on port ${port}`));

// when we receive a submission from the contact form,
//   we send ourselves an email from the server
app.get(`/contact`, (request, response) => {
  const emailData = {
    to: process.env.EMAIL,
    subject: `New message from "${request.query.name}" (${request.query.email}) [Contact form]`,
    text: request.query.message
  };

  emailer.sendMail(emailData, (error, data) => {
    if (error) {
      console.log(error);
      response.json({ success: false });
    } else {
      console.log(`Email sent: ` + data.response);
      response.json({ success: true });
    }
  });
})
