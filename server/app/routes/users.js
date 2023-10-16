const express = require('express')
const xml2js = require('xml2js')
const router = express.Router()
const Users = require('../models/user')
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
