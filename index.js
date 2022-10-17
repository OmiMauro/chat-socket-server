import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import sockets from './socket/sockets.js'
import { db } from './db.js'
import router from './api/routes.js'
const PORT = 5000

const app = express()
const httpServer = http.createServer(app)
db()
app.use(cors())
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
  },
})
app.use('/', router)
io.on('connection', sockets)

httpServer.listen(PORT, () => {
  console.log('Running in: ', PORT)
})
