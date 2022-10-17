import TypingController from './controllers/TypingController.js'
import MessageController from './controllers/MessageController.js'
import RoomController from './controllers/RoomController.js'

const sockets = (socket) => {
  const typingController = new TypingController(socket)
  const messageController = new MessageController(socket)
  const roomController = new RoomController(socket)

  socket.on('send-message', messageController.sendMessage)

  socket.on('typing-started', typingController.typingStarted)
  socket.on('typing-end', typingController.typingStoped)

  socket.on('join-room', roomController.joinRoom)
  socket.on('new-room-created', roomController.newRoomCreated)
  socket.on('room-removed', roomController.roomRemoved)
  socket.on('disconnect', (socket) => {
    console.log('user disconnected')
  })
}
export default sockets
