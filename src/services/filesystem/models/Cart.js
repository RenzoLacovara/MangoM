export default class Cart {
  static id = 1;
  constructor() {
    this.products = [];
    this.id = Cart.id++;
  }
}
