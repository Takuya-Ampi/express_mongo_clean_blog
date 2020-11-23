const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
  store_user: (req, res) => {
    const { username, password } = req.body
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
