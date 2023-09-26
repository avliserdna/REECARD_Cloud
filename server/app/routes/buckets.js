const express = require('express')
const router = express.Router()
const Buckets = require("../models/buckets")
//Get ALL Buckets
router.get('/', async (req, res) => {
  try {
    const buckets = await Buckets.find()
    res.json(buckets)
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})

//Get ONE bucket
router.get('/:id', getBucket, (req, res) => {
  res.json(res.bucket)
})

//Create Bucket
router.post('/', async (req,res) => {
  const bucket = new Buckets({
    bucket_key: req.body.bucket_key,
    bucket_name: req.body.bucket_name,
    attached_access: req.body.attached_access,
    attached_secret: req.body.attached_secret,
    files: req.body.files
  })
  try {
    const newBucket = await bucket.save()
    res.status(201).json(newBucket)
  }
  catch (err) {
    res.status(400).json({message: err.message})
  }
})
//Update Buckets
router.put('/:id', async (req,res) =>{
  try {
    bucket = await Buckets.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    res.status(200)
    updatedBucket = await Buckets.findById(req.params.id)
    res.json(updatedBucket)
  }
  catch (err) {
    res.status(400).json({message: err.message})
  }
})

// Delete bucket
router.delete('/:id', getBucket, async (req, res) => {
  try {
    await res.bucket.remove();
    res.json({message: 'Successfully deleted bucket!'})
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})
async function getBucket(req, res, next) {
  let bucket;
  try {
    bucket = await Buckets.findById(req.params.id)
    if (!bucket) {
      return res.status(400).json({message: "Cannot find bucket"})
    }
  }
  catch (err) {
    return res.status(500).json({message: err.message})
  }
  res.bucket = bucket
  next()
}
module.exports = router
