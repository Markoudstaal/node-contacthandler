require('dotenv').config();

//Takes in details from contact form and inserts them into the default message
module.exports.getEmailContentFromDetails = function (
  name,
  email,
  phone,
  message
) {
  let defaultContent = config.message.emailContent;
  let emailContent = defaultContent.replace("$name", name);
  emailContent = emailContent.replace("$email", email);
  emailContent = emailContent.replace("$email", email);
  emailContent = emailContent.replace("$phone", phone);
  emailContent = emailContent.replace("$message", message);

  return emailContent;
};
