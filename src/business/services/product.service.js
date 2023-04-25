import { productModel } from '../../persistence/models/product.model.js'

export default class ProductService {
  getProducts = async (page) =>
    await productModel.paginate(
      { available: true },
      { page: page, limit: 5, lean: true, sort: { price: 1 } }
    )
  getProductById = async (id) => await productModel.findById(id)
  addProduct = async (body) => await productModel.create(body)
}
