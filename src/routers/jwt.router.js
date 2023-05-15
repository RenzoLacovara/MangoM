import { Router } from 'express'
import {
  logUser,
  logoutUser,
  newPassword,
  registerUser,
} from '../controllers/users.controller.js'

const router = Router()

router.post('/login', logUser)
router.post('/register', registerUser)
router.get('/logout', logoutUser)
router.post('/forgot-password', newPassword)
export default router
