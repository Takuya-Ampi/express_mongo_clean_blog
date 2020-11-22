const express = require('express')
const path = require('path')
const app = new express()
const mongoose = require('mongoose')
require('./models/BlogPost')
const BlogPost = mongoose.model('BlogPost')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))

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
app.get('/posts/new', (req, res) => {
  res.render('create')
})

app.post('/posts/store', async (req, res) => {
  // model create
  await BlogPost.create(req.body)
  res.redirect('/')
})
