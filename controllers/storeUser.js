const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
require('../models/User')
const User = mongoose.model('User')

module.exports = {
  store_user: (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const hashed_password = bcrypt.hashSync(password, 10)
    const user = {
      username: username,
      password: hashed_password
    }
    User.create(user, (error, User) => {
      if(error){
        return res.redirect('/auth/redirect')
      }
      res.redirect('/')
    })
  }
}
