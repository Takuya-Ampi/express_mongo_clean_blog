const express = require('express')
const path = require('path')
const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy
const session = require('express-session')
const cookieParser = require('cookie-parser')
const newPostController = require('./controllers/newPost')
const newUserController = require('./controllers/newUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const homeController = require('./controllers/home')
const adminController = require('./controllers/admin')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const storeUserController = require('./controllers/storeUser')
const validateMiddleWare = require('./middleware/validationMiddleware')
const app = new express()
const mongoose = require('mongoose')
// require('./models/BlogPost')
// const BlogPost = mongoose.model('BlogPost')
require('./models/User')
const User = mongoose.model('User')
const fileUpload = require('express-fileupload')
app.use(fileUpload())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cookieParser())
app.use(session({ resave: false, saveUninitialized:false, secret: 'something quite long and nonsense',
    cookie: {
        secure: false,
        maxAge: 3600000
    }
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(async (username, password, done) => {
      try{
          await User.findOne({username: username}, (err, user) => {
            if(err){
              return done(err);
            }
            if(!user){
              return done(null, false);
            }
            return done(null, user);
          })
      } catch(err) {
        console.log(err);
      }
  }
))
app.use('/posts/store', validateMiddleWare.validation)

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useCreateIndex: true })

function isAuthenticated(req, res, next){
  if (req.isAuthenticated()) {  // 認証済
      return next();
  }
  else {  // 認証されていない
    res.redirect('/auth/login');  // ログイン画面に遷移
  }
}

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

app.get('/posts/new', isAuthenticated, newPostController.get_new_post)
app.get('/auth/login', loginController.login)
app.get('/auth/logout', loginController.logout)
app.get('/auth/register', newUserController.get_new_user)
app.get('/admin', adminController.admin)

app.post('/posts/store', storePostController.store_post)
app.post('/users/register', storeUserController.store_user)
app.post('/users/login', passport.authenticate('local', {successRedirect: '/admin', failureRedirect:'/' }), loginUserController.login_user)
passport.serializeUser( (user, cb) => {
  cb(null, user)
})
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})
