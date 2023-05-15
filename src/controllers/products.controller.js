import ProductService from '../services/db/dao/product.service'

const productService = new ProductService()

export const getProducts = async (req, res) => {
  try {
    let page = parseInt(req.query.page)
    if (!page) page = 1
    let result = await productService.getProducts(page)
    result.prevLink = result.hasPrevPage
      ? `http://localhost:9090/api/products?page=${result.prevPage}`
      : ''
    result.nextLink = result.hasNextPage
      ? `http://localhost:9090/api/products?page=${result.nextPage}`
      : ''
    result.isValid = !(page <= 0 || page > result.totalPages)
    res.render('products', result)
  } catch (error) {
    res.status(500).send({ error: error, message: 'error getting products' })
  }
}

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.pid
    let filterProd = await productService.getProductById(productId)
    if (filterProd) {
      res.send({ status: 'success', message: filterProd })
    } else {
      res.send({ status: 'error', message: 'Invalid product id' })
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: error, message: 'error getting product by id' })
  }
}

export const saveProduct = async (req, res) => {
  try {
    let newProd = await productService.addProduct(req.body)
    res.send({ status: 'success', message: newProd })
  } catch (error) {
    res.status(500).send({ error: error, message: 'error creating product' })
  }
}
export const updateProduct = async (req, res) => {
  try {
    const prodId = req.params.pid
    const newProd = req.body
    await productService.updateProduct(prodId, newProd)
    res.send({
      status: 'success',
      message: `product with id: ${prodId} updated successfully`,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error, message: 'Error updating product.' })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.pid
    let prodDeleted = await productService.deleteProduct(productId)
    res.status(201).send(prodDeleted)
  } catch (error) {
    res.status(500).send({ error: error, message: 'Error deleting product.' })
  }
}
