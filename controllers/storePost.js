const mongoose = require('mongoose')
const path = require('path')
require('../models/BlogPost')
const BlogPost = mongoose.model('BlogPost')

module.exports = {
  store_post: (req, res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, '..', 'public/img',image.name),async (error)=>{
    await BlogPost.create({
        ...req.body,
        image: '/img/' + image.name
    })
    res.redirect('/')
  })
  }
}
