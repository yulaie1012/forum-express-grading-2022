const bcrypt = require('bcryptjs')

const db = require('../models')
const { User } = db

module.exports = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: async (req, res) => {
    const { name, email, password, passwordCheck } = req.body
    const errors = []

    if (!name || !email || !password || !passwordCheck) {
      req.flash('error_message', '所有欄位都必須填寫！')
      return res.redirect('/signup')
    }

    if (password !== passwordCheck) {
      errors.push({ message: '兩次密碼輸入不同！' })
    }

    const [checkName, checkEmail] = await Promise.all([
      User.findOne({ where: { name } }),
      User.findOne({ where: { email } })
    ])

    if (checkName) {
      errors.push({ message: 'name 已經重複註冊！' })
    }

    if (checkEmail) {
      errors.push({ message: 'email 已經重複註冊！' })
    }

    if (errors.length) {
      return res.render('signup', { errors, name, email, password, passwordCheck })
    }

    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    })
    req.flash('success_message', '成功註冊此 email！')
    return res.redirect('/signin')
  }
}
