// Verify if we can connect to the API

module.exports = {
    googleAPI: function () {

        let result=0;
        // Import google module api
        let google = require('googleapis');
        // Import the file which contain the identification token
        let privatekey = require("./privatekeyGsheet.json");

        // configure a JWT auth client
        let jwtClient = new google.google.auth.JWT(
            privatekey.client_email,
            null,
            privatekey.private_key,
            ['https://www.googleapis.com/auth/spreadsheets']);
        //authenticate request
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                console.log(err);
                return result;
            } else {
                result = 1;
                return result;
            }
        });
    }
}