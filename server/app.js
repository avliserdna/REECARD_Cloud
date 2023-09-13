const express =  require('express')
const mongoose = require('mongoose')
const multer = require('multer');
mongoose.connect("mongodb://localhost:27017/AFILENAME",{
  useNewParser:true, useUnifiedTopology:true
}, (err) => {
  err ? console.log(err) : console.log("Connection successful!")
})

const app = express()
const port = 5000; // Change this value with env later on

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

const buckets = {}
const upload = multer({ storage });

app.use(express.json())
app.get('/', (req,res)=> {
  res.send("Hello World!")
})

app.post('/buckets', (req, res) => {
  const { bucketName } = req.body;
  console.log(req.body, "<==== Request body")

  if (!buckets[bucketName]) {
    buckets[bucketName] = [];
    res.status(201).json({ message: 'Bucket created successfully' });
  } else {
    res.status(400).json({ message: 'Bucket already exists' });
  }
});

app.use('/uploads', express.static('uploads'));

// Define routes for storing and retrieving objects
app.post('/upload', upload.single('file'), (req, res) => {
  // Handle file upload and storage logic here
  res.send('File uploaded successfully!');
});

app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;

  // Check if the file exists and send it as a response
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

app.listen(port, () => console.log(`Server is listening on port ${port}`))
