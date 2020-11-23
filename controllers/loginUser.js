const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
require('../models/User')
const User = mongoose.model('User')

module.exports = {
  login_user: async (req, res) => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username: username })
      if(!user) {
        res.redirect('/auth/login')
      }
      const check_password = bcrypt.compareSync(password, user.password)
      if(check_password){
        res.redirect('/admin')
      } else {
        res.redirect('/auth/login')
      }
    } catch (error) {
      console.log('例外')
      console.log(error)
    }

  }
}
