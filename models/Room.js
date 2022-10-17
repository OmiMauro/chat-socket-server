import mongoose, { Schema } from 'mongoose'

const RoomSchema = new Schema({
  name: String,
  roomId: String,
})

const Room = mongoose.model('Room', RoomSchema)
export default Room
