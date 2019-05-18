let express = require("express");
let nodemailer = require("nodemailer");
let bodyParser = require("body-parser");
let cors = require("cors");
const { check, validationResult } = require("express-validator/check");
const config = require("./config/config.js");
import "./bin/lib";

let app = express();

app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

//Initialize the smtp transporter
let smtpTransport = nodemailer.createTransport({
	host: config.mailserver.host,
	port: config.mailserver.port,
	secure: config.mailserver.secure,
	auth: {
		user: config.mailserver.user,
		pass: config.mailserver.password
	}
});

//Post route that takes in the info and sends the email
app.post(
	"/",
	[
		//Validate the post data
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
			html: getMessageFromDetails(
				req.body.name,
				req.body.email,
				req.body.phone,
				req.body.message
			)
		};

		//Send the mail according set parameters
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

//Starting webserver
app.listen(config.webServer.port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Listening on port on " + config.webServer.port);
	}
});
