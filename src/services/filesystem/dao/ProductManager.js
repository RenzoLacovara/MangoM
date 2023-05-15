import fs from 'fs'
import Product from '../models/Products'
class ProductManager {
  #products
  #productDirPath
  #productsFilePath
  #fileSystem

  constructor() {
    this.#products = []
    this.#productDirPath = './module1/files'
    this.#productsFilePath = this.#productDirPath + '/Products.json'
    this.#fileSystem = fs
  }
  #prepareDir = async () => {
    await this.#fileSystem.promises.mkdir(this.#productDirPath, {
      recursive: true,
    })
    if (!this.#fileSystem.existsSync(this.#productsFilePath)) {
      await this.#fileSystem.promises.writeFile(this.#productsFilePath, '[]')
    }
  }

  addProduct = async ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status,
  }) => {
    let newProduct = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status
    )
    try {
      await this.#prepareDir()
      await this.getProducts()

      if (this.#products.some((product) => product.code === code)) {
        console.log('Codigo repetido')
      } else {
        this.#products.push(newProduct)
        console.log(this.#products)
        return this.#fileSystem.promises.writeFile(
          this.#productsFilePath,
          JSON.stringify(this.#products)
        )
      }
    } catch (error) {
      throw Error(
        `Error creando producto nuevo: ${JSON.stringify(
          newProduct
        )}, detalle del error: ${error}`
      )
    }
  }
  getProducts = async () => {
    try {
      await this.#prepareDir()
      let prodFile = await this.#fileSystem.promises.readFile(
        this.#productsFilePath,
        'utf-8'
      )
      this.#products = JSON.parse(prodFile)
      console.log(this.#products)
      return this.#products
    } catch (error) {
      throw Error(`Error consultando los productos por archivo, valide el archivo: ${
        this.#productDirPath
      },
       detalle del error: ${error}`)
    }
  }
  getProductById = async (code) => {
    await this.getProducts()
    let productfilter = this.#products.findIndex(
      (product) => product.id === code
    )
    if (productfilter === -1) {
      console.log(`Codigo: ${code} no arroja resultados`)
    } else {
      console.log(`Producto encontrado:`)
      console.log(this.#products[productfilter])
      return this.#products[productfilter]
    }
  }

  updateProduct = async (id, newProd) => {
    await this.getProducts()
    const index = this.#products.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.#products[index] = { ...this.#products[index], ...newProd }
    } else {
      console.log(`Producto no encontrado:`)
    }
    return this.#fileSystem.promises.writeFile(
      this.#productsFilePath,
      JSON.stringify(this.#products)
    )
  }

  deleteProduct = async (code) => {
    await this.getProducts()
    if (this.#products.find((prod) => prod.id === code)) {
      let filteredProducts = this.#products.filter((prod) => prod.id !== code)
      this.#products = filteredProducts
      this.#fileSystem.promises.writeFile(
        this.#productsFilePath,
        JSON.stringify(this.#products)
      )
      console.log(this.#products)
    } else {
      console.log(`producto con codigo ${code} no encontrado`)
    }
  }
}
export default ProductManager
