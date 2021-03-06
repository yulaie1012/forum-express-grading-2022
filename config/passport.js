const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } })

        if (!user) {
          return done(null, false, req.flash('errorMessage', 'Incorrect username.'))
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, req.flash('errorMessage', 'Incorrect password.'))
        }

        return done(null, user)
      } catch (err) {
        console.error(err)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  return done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      raw: true
    })
    return done(null, user)
  } catch (err) {
    console.error(err)
  }
})

module.exports = passport
