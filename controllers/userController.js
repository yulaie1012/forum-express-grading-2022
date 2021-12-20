const bcrypt = require('bcryptjs')

const db = require('../models')
const { User } = db

module.exports = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: async (req, res) => {
    const { name, email, password, passwordCheck } = req.body
    const errorMessages = []

    if (!name || !email || !password || !passwordCheck) {
      req.flash('errorMessage', '所有欄位都必須填寫！')
      return res.redirect('/signup')
    }

    if (password !== passwordCheck) {
      errorMessages.push('兩次密碼輸入不同！')
    }

    const [checkName, checkEmail] = await Promise.all([
      User.findOne({ where: { name } }),
      User.findOne({ where: { email } })
    ])

    if (checkName) {
      errorMessages.push('name 已經重複註冊！')
    }

    if (checkEmail) {
      errorMessages.push('email 已經重複註冊！')
    }

    if (errorMessages.length) {
      return res.render('signup', { errorMessages, name, email, password, passwordCheck })
    }

    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    })
    req.flash('successMessage', '成功註冊此 email！')
    return res.redirect('/signin')
  },

  signInPage: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('successMessage', '登入成功！')
    return res.redirect('/restaurants')
  },

  signOut: (req, res) => {
    req.flash('successMessage', '登出成功！')
    req.logOut()
    return res.redirect('/signin')
  }
}
