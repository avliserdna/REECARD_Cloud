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
    const newFile = await file.save()
    res.status(201).json(newFile)
   }
   catch(err) {
    res.status(400).json({message: err.message})
   }
})

// Update Object
router.put('/:id', async (req,res) => {
  let file;
  let query = {_id: req.params.id}
  try {
    file = await Files.findOneAndUpdate(query, {$set: req.body})
    res.status(200)
    updateFile = await Files.findById(req.params.id)
    res.json(updateFile)
  }
  catch (err) {
    res.status(400).json({message: err.message})
}

})
// Delete Object

router.delete('/:id', getObject, async (req,res) => {
  try {
    await res.file.remove();
    res.json({message: 'Succesfully deleted File'})
  }
  catch (err) {
    res.status(500).json({message: err.message})
  }
})

async function getObject(req, res, next) {
  let file;
  try {
    file = await Files.findById(req.params.id)
    if (!file ) {
      return res.status(404).json({message: "Cannot find file!"})
    }
  }
  catch (err) {
    return res.status(500).json({message: err.message})
  }
  res.file = file
  next()
}
module.exports = router
