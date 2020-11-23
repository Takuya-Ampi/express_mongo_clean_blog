module.exports = {
  admin: (req, res) => {
    console.log(req.user)
    res.render('admin')
  }
}
