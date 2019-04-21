var config = {
    mailserver = {
        //The smtp server host
        host = "hostname",
        //The smtp port
        port = 465,
        //Secure or not. True for port 465, false for all other ports
        secure = true,
        //Smtp server login information
        user = "user",
        password = "password"
    },
    message = {
        //What email adres do you want to send the message to
        toAdress = "",
        //Subject of the email
        subject = "",
        //The adress the email should come from
        fromAdress = ""
    },
    webServer = {
        //Port you want the API to run on
        port = 3333
    }
};

module.exports = config;
