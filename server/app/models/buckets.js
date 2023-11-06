const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const bucketSchema = new Schema(
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
    {type: Schema.Types.ObjectId, ref: 'File'}
   ],
  publicAccess : {
    type: Boolean,
    required: true,
    default: false
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  acceptedUserKeys: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }]

 },
 {collection: 'buckets'}
)
const Bucket = model('Bucket', bucketSchema)
// module.exports = mongoose.model('Buckets', bucketSchema)
 module.exports = Bucket;
