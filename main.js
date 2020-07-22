// Code which create a local server at port 8080

console.log('Program starts');

//import express module
const express = require('express');
const app = express();


app.get('/', function (req, res) {
    res.sendFile('E:/JavaScript/ProjetCartelis/ProjectCartelis/vue/appvue.html')
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})



