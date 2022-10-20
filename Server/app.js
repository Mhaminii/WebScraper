const express = require('express');
const app = express();

app.use(express.json());

//import all router 
const jobs = require('./Routes/job');

app.use(jobs)

module.exports= app;