import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import sockets from './socket/sockets.js'
const PORT = 5000

const app = express()
const httpServer = http.createServer(app)
app.use(cors())
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
  },
})

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html')
})

io.on('connection', sockets)

httpServer.listen(PORT, () => {
  console.log('Running in: ', PORT)
})
