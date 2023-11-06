const express = require('express')
const xml2js = require('xml2js')
const router = express.Router()
const Buckets = require("../models/buckets")
const File = require("../models/file")
const crypto = require('crypto')
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
router.get('/:id', getBucket, async (req, res) => {
  try {
    parseBucket = convertToXML(res.bucket)
    res.send(parseBucket)
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})

// GET ONE BUCKET, AND FILES

router.get('/:id/files', getBucket, async (req, res) => {
  try {
    const files = await File.find({bucket_key: req.params.id})
    const parsedData = convertToJoinedXML(res.bucket, files)
    res.send(parsedData)
  }
  catch (err) {
    res.status(500).json({message:err.message})
  }
})

//Create Bucket
router.post('/', async (req,res) => {
  const newKey = generateAPIKey()
  const bucket = new Buckets({
    bucket_key: newKey,
    bucket_name: req.body.bucket_name,
    attached_access: [...req.body.attached_access],
    attached_secret: [...req.body.attached_secret],
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

function convertToXML(data) {
  id = data._id.toString()
  const builder = new xml2js.Builder({ rootName: 'GetBucketResult', headless: false })
  const xml = builder.buildObject({ Bucket: data.bucket_name, CreationDate: data.creationDate.toDateString()})

  return xml
}
module.exports = router

function generateAPIKey() {
  const apiKeyLength = 23; // You can adjust the length as needed
  const apiKey = crypto.randomBytes(apiKeyLength).toString('hex');
  return apiKey;
}

function convertToJoinedXML(data, joinedData) {
  id = data._id.toString()
  // joinedData is the files connected to the BucketID
  const builder = new xml2js.Builder({ rootName: 'GetBucketResult', headless: false, explicitArray: false })
  const xml = builder.buildObject({ Bucket: data.bucket_name, Files: joinedData, CreationDate: data.creationDate.toDateString(), }, joinedData)
  return xml
}
