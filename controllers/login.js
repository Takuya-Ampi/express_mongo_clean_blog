module.exports = {
  login: (req, res) => {
    res.render('login')
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/')
  }
}
