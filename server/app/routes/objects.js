const express = require('express')
const router = express.Router()
const Objects = require('../models/objects')

// get all Objects
router.get('/', async (req, res) => {
  try {
    const objects = await Objects.find()
    res.json(objects)
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})

// get ONE object
router.get('/:id', getObject, (req,res) => {
  res.json(getObject)
})

// Upload Object
router.post('/', async (req,res)=>{
   const object = new Objects({
    file_name: req.body.file_name,
    file_type: req.body.file_type
   })

   try {
    const newObject = object.save()
    res.status(201).json(newObject)
   }
   catch(err) {
    res.status(400).json({message: err.message})
   }
})
// Update Object
router.put('/:id', async (req,res) => {
})
// Delete Object

router.delete('/:id', async (req,res) => {
  try {

  }
})

function getObject(req, res, next) {
  let object;
  try {
    object = await Objects.findById(req.params.id)
    if (!object) {
      return res.status(404).json({message: "Cannot find object!"})
    }
  }
  catch (err) {
    return res.status(500).json({message: err.message})
  }
}
