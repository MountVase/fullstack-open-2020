const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
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
