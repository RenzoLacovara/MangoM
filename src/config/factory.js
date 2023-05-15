export let Products
switch (config.persistence) {
  case 'MONGO':
    const connection = mongoose.connect(config.mongodb.url)
    const { default: ProductsMongo } = await import(
      '../../business/services/product.service.js'
    )
    Products = ProductsMongo
    break
  case 'MEMORY':
    const { default: ProductsMemory } = await import('')
    Product = ProductsMemory
    break
}
