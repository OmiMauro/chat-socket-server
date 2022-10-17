import express, { Router } from 'express'
import Room from '../models/Room.js'
const router = new Router()

router.get('/rooms', async (req, res) => {
  const rooms = await Room.find()
  return res.json({ rooms })
})

router.delete('/rooms/roomId', async (req, res) => {
  const { roomId } = req.params
  await Room.deleteOne({ roomId })
  res.json({ data: { message: 'deleted' } })
})

export default router
