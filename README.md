# node-contacthandler

This app uses nodemailer in NodeJS to take post data from your contact form and forward it through email.

## Installation

To install clone the repository as follows:

```
git clone https://github.com/Markoudstaal/node-contacthandler.git
```

Then run `npm install` in the newly created folder.

Next make sure to change the config at `/config/conig.js`

Lastly start the server with `npm start`

## Usage

Setup the config file in config/config.js

The email send can be customized by adding the following parameters to \$emailContent:

```
		$name = Client name
    $phone = Client phonenumber
		$email = Client email
		$message = Client message
```

Example: `New email by $name, $email, $phone: $message`

Pass the POST data in JSON to the server as follows:

```
{
  name: "full name",
  phone: "phone number",
  email: "users email",
  message: "users message"
}
```
