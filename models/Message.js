import mongoose, { Schema } from 'mongoose'

const MessageSchema = new Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', MessageSchema)

export default Message
