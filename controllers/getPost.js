const mongoose = require('mongoose')
require('../models/BlogPost')
const BlogPost = mongoose.model('BlogPost')

module.exports = {
  get_post_id: async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id)
    res.render('post',{
      blogPost: blogPost
    })
  },
  get_post: (req, res) =>{
    res.render('post')
  }
}
