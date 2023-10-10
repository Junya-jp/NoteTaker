//Import Express.js
const express = require('express');
//const uuid = require('./helpers/uuid');
//const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
//Import 'path' to resolve path of files located on server
const path = require('path');
//Initialize express.js
const app = express();
//Specify which port express.js will run
const PORT = 3001;
//Static middleware pointing to public folder
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
//get request to display index.html
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
//Get request to get to return notes/html file
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
