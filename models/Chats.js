import mongoose, { Schema } from 'mongoose'

const ChatSchema = new Schema({})

const Chat = mongoose.model('chat', ChatSchema)

export default Chat
