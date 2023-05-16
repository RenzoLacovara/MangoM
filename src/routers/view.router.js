import { Router } from 'express'
import MessageManager from '../services/db/dao/MessageManager.js'

const router = Router()
const mm = new MessageManager()

router.get('/', (req, res) => {
  res.render('message')
})

export default router
