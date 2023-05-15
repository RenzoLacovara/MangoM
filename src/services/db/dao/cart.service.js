import { cartModel } from '../models/cart.model.js'

export default class CartService {
  getCartAndPop = async (id) =>
    await cartModel.findById(id).populate('products.product')

  getCartById = async (id) => await cartModel.findById(id)

  addCart = async () => cartModel.create({})
  addToCart = async (cid, pid) => {
    let cart = await cartModel.findOne({ _id: cid })
    cart.products.push({ product: pid })
    let result = await cartModel.updateOne(cart)
    return result
  }
  getProdInCart = async (pid) => {
    let result = await cartModel.find({
      products: { $elemMatch: { product: pid } },
    })
    return result
  }
  updateCartStock = async (cid, pid, data) => {
    let result = await cartModel.findOneAndUpdate(
      { _id: cid, 'products.product': pid },
      { $set: { 'products.$.quantity': data } }
    )
    return result
  }
  updateProdQuantity = async (cid, pid, data) => {
    let result = await cartModel.findOneAndUpdate(
      { _id: cid, 'products.product': pid },
      { $set: { 'products.$.quantity': data.quantity + 1 } }
    )
    return result
  }
  updateCart = async (cid, data) => {
    let result = await cartModel.updateOne({ _id: cid }, data)
    return result
  }
  deleteProduct = async (cid, pid) => {
    let result = await cartModel.findByIdAndUpdate(
      { _id: cid },
      { $pull: { products: { product: pid } } }
    )
    return result
  }
  deleteAllProducts = async (cid) => {
    let result = await cartModel.updateOne({ _id: cid }, { products: [] })
    return result
  }
}
