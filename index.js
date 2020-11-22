const express = require('express')
const path = require('path')
const app = new express()
const mongoose = require('mongoose')
require('./models/BlogPost')
const BlogPost = mongoose.model('BlogPost')
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))

const validateMiddleWare = (req, res, next) => {
  if(req.files === null || req.body.title === null || req.body.body === null){
    return res.redirect('/posts/new')
  }
  next()
}
app.use('/posts/store', validateMiddleWare)

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

app.listen(4000, () => {
  console.log('App listen 4000');
})
app.get('/', async (req, res) => {
  const BlogPosts = await BlogPost.find({})
  res.render('index', {
    BlogPosts: BlogPosts
  })
})
app.get('/about', (req, res) => {
  res.render('about')

})
app.get('/contact', (req, res) => {
  res.render('contact')

})
app.get('/post', (req, res) => {
  res.render('post')
})
app.get('/post/:id', async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id)
  console.log(blogPost)
  res.render('post',{
    blogPost: blogPost
  })
})

app.get('/posts/new', (req, res) => {
  res.render('create')
})

app.post('/posts/store', (req, res) => {
  // console.log('req.files.image')
  // console.log(req.files.image)
  // console.log('req.body')
  // console.log(req.body)
  let image = req.files.image
  image.mv(path.resolve(__dirname,'public/img',image.name),async (error)=>{
    await BlogPost.create({
        ...req.body,
        image: '/img/' + image.name
    })
    res.redirect('/')
  })
})
