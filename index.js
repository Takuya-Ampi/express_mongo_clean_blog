const express = require('express')
const path = require('path')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const validateMiddleWare = require('./middleware/validationMiddleware')
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

app.use('/posts/store', validateMiddleWare.validation)

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

app.listen(4000, () => {
  console.log('App listen 4000');
})
app.get('/', homeController.get_home)

app.get('/about', (req, res) => {
  res.render('about')
})
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/post', getPostController.get_post)
app.get('/post/:id', getPostController.get_post_id)

app.get('/posts/new', newPostController.get_new_post)

app.post('/posts/store', storePostController.store_post)
