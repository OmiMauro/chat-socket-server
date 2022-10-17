import BaseController from './BaseController.js'
import Room from '../../models/Room.js'
export default class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    this.socket.join(roomId)
  }
  newRoomCreated = async ({ roomId }) => {
    const room = new Room({ name: 'Test', roomId })
    const document = await room.save()
    console.log(document)
    this.socket.broadcast.emit('new-room-created', { roomId })
  }
}
