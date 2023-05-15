import { Router } from 'express'
import { passportCall } from '../../config/utility/utils.js'
import {
  deleteProduct,
  getProductById,
  getProducts,
  saveProduct,
  updateProduct,
} from '../controllers/products.controller.js'

const router = Router()

router.get('/', passportCall('jwt'), getProducts)
router.get('/:pid', getProductById)
router.post('/add', saveProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)

export default router
