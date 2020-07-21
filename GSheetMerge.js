// Function which modified a Gsheet

module.exports = {
    //function which merged data in the GSheet
    mergeData : function() {

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
                return;
            } else {
                console.log("Successfully connected!");
            }
        });

        //link of the file : https://docs.google.com/spreadsheets/d/1o04noCXEf-F3E2O1MgRQQhJLEojNzJ78_pYFWov96Nk/edit?usp=sharing
        let spreadsheetId = '1o04noCXEf-F3E2O1MgRQQhJLEojNzJ78_pYFWov96Nk';//

        let sheetName = 'A1:E50'; // Size of the Gsheet

        let values = [['Test']];  // Imput value
        const resource = {values}; // Convert values in cells
        let sheets = google.google.sheets('v4');

        // Recuperation of data in the Gsheet
        sheets.spreadsheets.values.get({
            auth: jwtClient,
            spreadsheetId: spreadsheetId,
            range: sheetName
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error for GetValue: ' + err);
            } else {
                console.log(response.data.values[0]);

                sheetName = 'A1:A1'; //where the imput data is send
                // Modification of the Gsheet
                sheets.spreadsheets.values.update({
                    auth: jwtClient,
                    spreadsheetId: spreadsheetId,
                    range: sheetName,
                    valueInputOption: 'RAW',
                    resource,
                }, function (err, response) {
                    if (err) {
                        console.log('The API returned an error for update value: ' + err);
                    } else {
                        //console.log(response);
                    }
                });
            }
        });
    }
}