const express = require('express')
const router = express.Router()
const Files = require('../models/file')

// get all Objects
router.get('/', async (req, res) => {
  try {
    const files = await Files.find()
    res.json(files)
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})

// get ONE object
router.get('/:id', getObject, (req,res) => {
  res.json(res.file)
})

// Upload Object
router.post('/', async (req,res)=>{
   const file = new Files({
    file_name: req.body.file_name,
    file_type: req.body.file_type
   })

   try {
    const newFile = file.save()
    res.status(201).json(newFile)
   }
   catch(err) {
    res.status(400).json({message: err.message})
   }
})
// Update Object
router.put('/:id', getObject, (req,res) => {

})
// Delete Object

router.delete('/:id', getObject, async (req,res) => {
  try {
    await res.file.remove();
    res.json({message: 'Deleted Subscriber'})
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})

async function getObject(req, res, next) {
  let file;
  try {
    file = await Files.findById(req.params.id)
    if (!file) {
      return res.status(404).json({message: "Cannot find file!"})
    }
  }
  catch (err) {
    return res.status(500).json({message: err.message})
  }
}
