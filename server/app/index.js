let dotenv = require('dotenv').config()
console.log(dotenv)
const express = require('express');
const app = express();
// const aws = require('aws-sdk');
// const bodyParser = require('body-parser');

// Use bodyParser middleware to parse JSON requests
// app.use(bodyParser.json());

const mongoose = require('mongoose')

const uri = process.env.uri
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Successful connection to MongoDB")
  }
  catch (error) {
    console.log(error)
  }
}
const port = process.env.PORT; // Change this value with env later on


app.listen(port, () => console.log(`Server is listening on port ${port}`))
