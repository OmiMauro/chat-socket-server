import express, { Router } from 'express'
import passport from 'passport'
const router = new Router()

router.get(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {}
)
export default router
