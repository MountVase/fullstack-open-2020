const mongoose = require('mongoose')

// 4.11 & 4.12, likes, title & author validation added.
// middleware already routes mongoose validation errors to HTTP 400

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true},
  author: String,
  url: { type: String, required: true},
  likes: { type:Number, default:0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
  
// makes ids more readable and removes clutter
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//const Blog = mongoose.model('Blog', blogSchema)
module.exports = mongoose.model('Blog', blogSchema)
