require('dotenv').config();

let express = require("express");
let nodemailer = require("nodemailer");
let cors = require("cors");
const { getEmailContentFromDetails } = require("./bin/lib.js");

let app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Initialize the smtp transporter
let smtpTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

//Get route to check if API is running
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'API is running' });
});

//Post route that takes in the info and sends the email
app.post(
  "/",
  function (req, res) {
    //Return 422 status if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    //Set up the parameters from the post data
    let mailParameters = {
      to: config.message.toAdress,
      subject: config.message.subject,
      from: config.message.fromAdress,
      replyTo: req.body.email,
      html: lib.getEmailContentFromDetails(
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.message
      )
    };

    //Send the mail according set parameters
    smtpTransport.sendMail(mailParameters, function (err, response) {
      if (err) {
        console.log(err);
        res.status(500).json({
          status: "error",
          error: err
        });
      } else {
        console.log("Message sent");
        res.json({
          status: "success"
        });
      }
    });
  }
);

//Starting webserver
app.listen(process.env.PORT || 3333, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port on " + (process.env.PORT || 3333));
  }
});
