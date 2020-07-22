// Function merge sheet A and B in sheet C

module.exports = {
    //function which merged data in the GSheet
    mergeData : function() {

        // Import google module api
        let google = require('googleapis');
        // Import the file which contain the identification token
        let privatekey = require("../privatekeyGsheet.json");

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
        let spreadsheetId = '1o04noCXEf-F3E2O1MgRQQhJLEojNzJ78_pYFWov96Nk';
        let sheets = google.google.sheets('v4'); // version of google API


        let sheetNameA = 'A!A1:G50'; // Size of the Gsheet !!! Hard Value should be modified

                // Recuperation of data in the sheetA
        sheets.spreadsheets.values.get({
            auth: jwtClient,
            spreadsheetId: spreadsheetId,
            range: sheetNameA
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error for GetValue sheetA: ' + err);
            } else {
                // If you get the data from sheet A
                let dataSheetA = response.data.values;
                let sheetNameB = 'B!A1:G50'; // Size of the Gsheet !!! Hard Value should be modified

                // Recuperation of data in the sheetB
                sheets.spreadsheets.values.get({
                    auth: jwtClient,
                    spreadsheetId: spreadsheetId,
                    range: sheetNameB
                }, function (err, response) {
                    if (err) {
                        console.log('The API returned an error for GetValue sheetB: ' + err);
                    } else {

                        // if you get the data from sheet A
                        let dataSheetB = response.data.values;

                        // Call function regroupData
                        let dataSheetC = regroupData(dataSheetA,dataSheetB);
                        let values = dataSheetC;

                        // Modification of the Gsheet
                        let sheetNameC = 'C!A1:G50'; // Size of the Gsheet !!! Hard Value should be modified
                        sheets.spreadsheets.values.update({
                            auth: jwtClient,
                            spreadsheetId: spreadsheetId,
                            range: sheetNameC,
                            valueInputOption:'RAW',
                            resource: {values}
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
        });
    }
}

// Function which regroup all the data of sheet A and C in the variable dataSheetC
function regroupData(dataSheetA,dataSheetB) {

    let dataSheetC = dataSheetA;
    maxLin = Math.max(dataSheetA.length, dataSheetB.length);
    maxCol = Math.max( dataSheetA[0].length, dataSheetB[0].length)

    //Determine the number of column in the sheet
    //We admit that titles of columns are the same
    if (dataSheetB[0].length == maxCol){
        dataSheetC[0]=dataSheetB[0];
    }

    //Goes through all the cells
    for (let indLin=0; indLin<maxLin; indLin++){
        for(let indCol=0; indCol<maxCol; indCol++){

            //Determine if the cell of the sheet is undefined or empty
            if (dataSheetB[indLin][indCol] === undefined || dataSheetB[indLin][indCol] === ''){
                dataSheetC[indLin][indCol] = dataSheetA[indLin][indCol];
            }
            else if (dataSheetA[indLin][indCol] === undefined || dataSheetA[indLin][indCol] === ''){
                dataSheetC[indLin][indCol] = dataSheetB[indLin][indCol];
            }
        }
    }
    //console.log(dataSheetC);
    return dataSheetC
}

