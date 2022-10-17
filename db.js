import mongoose from 'mongoose'

const DB_URI = 'mongodb://127.0.0.1:27017/mern-sockets'

export const db = async () => {
  return await mongoose.connect(DB_URI, () => {
    console.log('Connect DB')
  })
}
