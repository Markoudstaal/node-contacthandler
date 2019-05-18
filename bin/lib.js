const config = require("../config/config");

function getMessageFromDetails(name, email, phone, message) {
	let defaultMessage = config.message.content;
	let content = defaultMessage.replace("$name", name);
	content = content.replace("$email", email);
	content = content.replace("$phone", phone);
	content = content.replace("$message", message);

	return content;
}
