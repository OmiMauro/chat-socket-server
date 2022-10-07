import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const PORT = 5000

const app = express()
const httpServer = http.createServer(app)

const io = new Server(httpServer, { cors: ['http://localhost:3000'] })

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html')
})
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('send-message', (data) => {
    socket.broadcast.emit('message-from-server', data)
  })
  socket.on('typing-started', () => {
    socket.broadcast.emit('typing-from-server')
  })
  socket.on('typing-end', () => {
    socket.broadcast.emit('typing-from-server-end')
  })
})

httpServer.listen(PORT, () => {
  console.log('Running in: ', PORT)
})
