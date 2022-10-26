import User from '../models/User.js'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import GoogleStrategy from 'passport-google-oauth20'
import BearerStrategy from 'passport-http-bearer'

passport.use(
  new BearerStrategy(async (token, cb) => {
    const user = await User.findOne(token)
    if (!user) return cb(null, false)
    return cb(null, user, { scope: 'all' })
  })
)

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      let user = await User.findOne({ email: username })
      if (!user) {
        return cb(null, false, { message: 'Incorrect email or password' })
      }
      let comparePwd = await bcrypt.compareSync(password, user.password)
      if (!comparePwd) {
        return cb(null, false, { message: 'Incorrect email or password' })
      }
      return cb(null, user)
    } catch (error) {
      cb(error)
    }
  })
)
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { _id: user._id, name: user.name, email: user.email })
  })
})
passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
      scope: ['profile', 'email'],
    },

    async function (accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ googleId: profile.id })
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile?.name,
          lastname: profile?.username,
        })
        user.save()
      }
      return cb(err, user)
      // This account not login with google before. Create a new record user and link to the Google account
    }
  )
)
