const config = {
	mailserver: {
		//The smtp server host
		host: "hostname",
		//The smtp port
		port: 465,
		//Secure or not. True for port 465, false for all other ports
		secure: true,
		//Smtp server login information
		user: "user",
		password: "password"
	},
	message: {
		//What email adres do you want to send the message to
		toAdress: "",
		//Subject of the email
		subject: "",
		//The adress the email should come from
		fromAdress: "",
		/* The content of the email. HTML is allowed and will work.
		Add information by using the following:

		$name = Client name
		$email = Client email
		$phone = Client phonenumber
		$message = Client message

		Example: "New email by $name, $email, $phone: $message"
		*/
		emailContent: ""
	},
	webServer: {
		//Port you want the API to run on
		port: 3333
	}
};

module.exports = config;
