import mongoose from 'mongoose'
import { config } from '../config/config.js'

const DB_URI = config.db.DB_URI
export const db = async () => {
  return await mongoose.connect(DB_URI, () => {
    console.log('Connect DB')
  })
}
