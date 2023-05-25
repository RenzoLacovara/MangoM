import { faker } from '@faker-js/faker'

export const generateProducts = (numberOfProducts = 10) => {
  const products = []
  for (let i = 0; i < numberOfProducts; i++) {
    let newProd = fakeProduct()
    products.push(newProd)
  }
  return products
}

const fakeProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    stock: Math.floor(Math.random() * 41),
  }
}
