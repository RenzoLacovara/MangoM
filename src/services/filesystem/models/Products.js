export default class Product {
  static id = 1;

  constructor(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.category = category;
    this.status = status;
    this.id = Product.id++;
  }
}
