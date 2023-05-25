import { Router } from 'express'
import { generateProducts } from '../config/utility/faker.js'
import CustomError from '../services/errors/CustomError.js'
import { generateProductErrorInfo } from '../services/errors/info.js'
import EErrors from '../services/errors/enums.js'
const router = Router()

router.get('/', async (req, res) => {
  try {
    const products = generateProducts(100)
    products.forEach((product) => {
      if (
        typeof product.title !== 'string' ||
        typeof product.stock !== 'number'
      ) {
        CustomError.createError({
          name: 'Product creation error',
          cause: generateProductErrorInfo(product),
          message: 'Error trying to create a product',
          code: EErrors.INVALID_TYPES_ERROR,
        })
      }
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
