const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  username: String,
  datePosted: {
    type: Date,
    default: new Date()
  },
  image: String
})


module.exports = mongoose.model('BlogPost', BlogPostSchema)
