const express = require('express')
const xml2js = require('xml2js')
const router = express.Router()
const Users = require('../models/user')
const crypto = require('crypto')
const User = require('../models/user')

// get All users (TEST PURPOSES)
router.get('/' , async (req, res) => {
  try {
    const users = await User.find()
    parseXML = await convertToXML(users)
    res.set('Content-Type', 'text/xml');
    res.send(parseXML)
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})

// GET ONE USER
router.get('/:id', getUser, (req, res) => {
  try {
    parseXML = convertToXML(res.user)
    res.send(parseXML)
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})

// MAKE NEW USER (FOR TESTING PURPOSES)

router.post('/', async (req, res) => {
  const newAccessKey = generateAPIKey()
  const newSecretKey = generateAPIKey()
  const user = new Users({
    user_name: req.body.user_name,
    password : req.body.password,
    access_key: newAccessKey,
    secret_key: newSecretKey
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  }
  catch (err) {
    res.status(400).json({message: err.message})
  }
})

async function getUser(req, res, next) {
  let user;
  try {
    user = await Users.findById(req.params.id)
    if (!user) {
      return res.status(404).json({message: "Cannot find user!"})
    }
  }
    catch (err) {
      return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
  }

 function generateAPIKey() {
    const apiKeyLength = 23; // You can adjust the length as needed
    const apiKey = crypto.randomBytes(apiKeyLength).toString('hex');
    return apiKey;
  }
