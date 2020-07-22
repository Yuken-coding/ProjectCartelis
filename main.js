// Code which create a local server and refresh the data of a Gsheet when you go in it
console.log('Program starts');

//import http modules
var http = require('http');

//Import function in GsheetMerge
var GSheetMerge = require('./GSheetMerge');

// Creation of a local server
var server = http.createServer(function(req, res) {
    res.writeHead(200);
    //share link : https://docs.google.com/spreadsheets/d/1o04noCXEf-F3E2O1MgRQQhJLEojNzJ78_pYFWov96Nk/edit?usp=sharing
    res.end('Refresh this page to merge data in file : https://docs.google.com/spreadsheets/d/1o04noCXEf-F3E2O1MgRQQhJLEojNzJ78_pYFWov96Nk/edit?usp=sharing');
    GSheetMerge.mergeData();
});

server.listen(8080); // the server start at localhost:8080


