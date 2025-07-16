
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const BlogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user : {
    
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    
  }
})

BlogSchema.set('toJSON', {
  transform : (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(),
    delete returnedObject._id
    // delete returnedObject.__v
  }
})
const BlogModel = mongoose.model('Blog', BlogSchema)
module.exports = BlogModel