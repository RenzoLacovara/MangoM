import { productModel } from '../models/product.model.js'

export default class ProductService {
  getProducts = async (page) =>
    await productModel.paginate(
      { available: true },
      { page: page, limit: 5, lean: true, sort: { price: 1 } }
    )
  getProductById = async (id) => await productModel.findById(id)
  addProduct = async (body) => await productModel.create(body)
  deleteProduct = async (id) => {
    return await productModel.deleteOne({ _id: id })
  }
  updateProduct = async (id, newProd) => {
    return await productModel.updateOne({ _id: id }, newProd)
  }
}
