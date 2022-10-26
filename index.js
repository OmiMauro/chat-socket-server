import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import sockets from './socket/sockets.js'
import { db } from './db/db.js'
import router from './routes/index.js'
import session from 'express-session'
import passport from 'passport'
import 'dotenv/config'
const PORT = process.env.PORT || 5000
const app = express()
const httpServer = http.createServer(app)
db()

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    cookie: { secure: true },
    resave: true,
    name: 'session',
    keys: ['oauth'],
    maxAge: 24 * 60 * 60 * 100,
  })
)
app.use(
  cors({
    //set this in enviroment var
    origin: process.env.URL_ORIGIN,
    credentials: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1', router)

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.URL_ORIGIN],
  },
})
io.on('connection', sockets)

httpServer.listen(PORT, () => {
  console.log('Running in: ', PORT)
})
