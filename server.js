const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const mongoose = require('mongoose');

// Database 
mongoose.connect('mongodb://localhost:27017/HappyGreen',{useNewUrlParser:true})
.then(success=>{
  console.log("Connected to database");
})
.catch(err=>{
  console.log("Error connecting to database");
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

const api = require('./controllers/core.endpoints')(app);

http.listen(8000 || process.env.PORT,()=>{
  console.log("Server has started.")
})