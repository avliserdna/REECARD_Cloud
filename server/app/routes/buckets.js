const express = require('express')
const router = express.Router()
const Buckets = require("../models/buckets")
//Get ALL Buckets
router.get('/', async (req, res) => {
  try {
    const buckets = await Buckets.find()
    console.log(buckets)
    res.json(buckets)
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})

//Get ONE bucket
router.get('/:id', (req, res) => {

})
//Create Bucket
router.post('/', (req,res) => {

})
//Update Buckets
router.put('/', (req,res) =>{

})

async function getBucket(req, res, next) {
  let bucket;
  try {
    file = await Buckets.findById(req.params.id)
    if (!file) {
      return res.status(400).json({message: "Cannot find bucket"})
    }
  }
  catch (err) {
    return res.status(500).json({message: err.message})
  }
}
module.exports = router
