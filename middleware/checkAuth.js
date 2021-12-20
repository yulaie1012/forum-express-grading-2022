module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('errorMessage', '請先登入才能使用！')
    return res.redirect('/signin')
  },

  authenticatedAdmin: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        return next()
      }
      req.flash('errorMessage', '只有管理者才可使用！') // 為什麼看不到 flash 訊息？
      return res.redirect('/')
    }
    req.flash('errorMessage', '請先登入才能使用！')
    return res.redirect('/signin')
  }
}
