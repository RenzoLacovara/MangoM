import { Router } from 'express'
import MessageManager from '../../business/services/MessageManager.js'

const router = Router()
const mm = new MessageManager()

router.get('/', (req, res) => {
  res.render('message')
})

export default router
