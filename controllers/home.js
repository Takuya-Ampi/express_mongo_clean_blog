const mongoose = require('mongoose')
require('../models/BlogPost')
const BlogPost = mongoose.model('BlogPost')

module.exports = {
  get_home: async (req, res) => {
    const BlogPosts = await BlogPost.find({})
    res.render('index', {
      BlogPosts: BlogPosts
    })
  }
}
