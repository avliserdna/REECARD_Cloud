const mongoose = require('mongoose')

const bucketSchema = new mongoose.Schema(
 {
  bucket_key: {
    type: String,
    required: true
  },
  bucket_name: {
    type: String,
    required: true
  },
  attached_access:[String],
  attached_secret:[String],
  files:[
    {
      file_name: {
        type: String
      },
      file_type: {
        type: String
      }
    }
  ],
  creationDate: {
    type: Date,
    required: true,
    default: Date.now
  }

 }
)

module.exports = mongoose.model('Buckets', bucketSchema)
