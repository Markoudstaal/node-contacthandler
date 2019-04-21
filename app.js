let express = require("express");
let nodemailer = require("nodemailer");
let bodyParser = require("body-parser");
let cors = require("cors");
const { check, validationResult } = require("express-validator/check");

let app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

let smtpTransport = nodemailer.createTransport({
  host: "smtp.transip.email",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "info@bsmoud-beijerland.nl", // generated ethereal user
    pass: "Bijlschool1" // generated ethereal password
  }
});

app.post(
  "/",
  [
    check("email")
      .not()
      .isEmpty()
      .isEmail(),
    check("name")
      .not()
      .isEmpty()
      .isString(),
    check("message")
      .not()
      .isEmpty()
      .isString(),
    check("phone")
      .not()
      .isEmpty()
      .isLength({
        min: 10
      })
  ],
  function(req, res) {
    console.log(req.query);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    let mailParameters = {
      to: "info@bsmoud-beijerland.nl",
      subject: "Bericht via contact formulier",
      from: "Contact Formulier < info@bsmoud-beijerland.nl >",
      replyTo: req.body.email,
      html:
        "<p>From: " +
        req.body.name +
        " , " +
        req.body.phone +
        " <br> " +
        "User email: " +
        req.body.email +
        " <br> " +
        "Bericht: </p><p>" +
        req.body.message +
        "</p>"
    };

    console.log(mailParameters);
    smtpTransport.sendMail(mailParameters, function(err, response) {
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

app.listen(3333, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port on 3333");
  }
});
