export const generateProductErrorInfo = (product) => {
  return `One or more properties were incomplete. Please check the following:
    - title: needs to be a String, received ${product.title}
    - description: needs to be a String, received ${product.description}
    - stock: needs to be a Number, received ${product.stock}`
}
