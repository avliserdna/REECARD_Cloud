const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const fileSchema = new Schema (
  {
    bucket_key: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Bucket"
    },
    file_key: {
      type: String,
      require: true
    },
    file_name: {
      type: String,
      require: true
    },
    file_type: {
      type: String,
      require: true
    }
  },
  {
    collection: 'files'
  }
)
const File = model('File', fileSchema)

module.exports = File;
