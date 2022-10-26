import mongoose, { Schema } from 'mongoose'

const ChatSchema = new Schema({
  members: {
    type: Array,
  },
})

const Chat = mongoose.model('Chat', ChatSchema)

export default Chat
