import { Router } from 'express'
import passport from 'passport'
import User from '../models/User.js'
const router = new Router()

router.post(
  '/login/password',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
)
router.post('/logout', (req, res, next) => {
  req.logout()
})
router.post('/signup', async (req, res) => {
  const newUser = await User.create(req.body)
  const user = await newUser.save()
  req.login(user, (err) => {
    if (err) return next(err)
    res.redirect('/')
  })
})

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile'] })
)

router.post(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Error when loggin with Google',
  }),
  (req, res) => {
    //successful authetication
    res.json({ message: 'Data for user' })
  }
)
export default router
