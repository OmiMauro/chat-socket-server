import BaseController from './BaseController.js'
import Room from '../../models/Room.js'
export default class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    this.socket.join(roomId)
  }
  newRoomCreated = async ({ roomId, userId }) => {
    const room = new Room({ name: 'Test', roomId, userId })
    await room.save()
    console.log(room)
    this.socket.emit('new-room-created', { room })
  }
  roomRemoved = async ({ roomId }) => {
    await Room.deleteOne({ roomId })
    this.socket.emit('room-removed', { roomId })
  }
}
