import authRouter from './auth.js'
import chatRouter from './chat.js'
import messageRouter from './message.js'
import postRouter from './post.js'
import userRouter from './user.js'

import { Router } from 'express'
const router = new Router()

router.use('/auth', authRouter)
router.use('/chat', chatRouter)
router.use('/message', messageRouter)
router.use('/post', postRouter)
router.use('/user', userRouter)

export default router
