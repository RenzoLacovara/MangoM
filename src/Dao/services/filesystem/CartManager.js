import fs from "fs";
import Cart from "./models/Cart.js";

class CartManager {
  #carts;
  #cartDirPath;
  #cartsFilePath;
  #fileSystem;

  constructor() {
    this.#carts = [];
    this.#cartDirPath = "./module1/files";
    this.#cartsFilePath = this.#cartDirPath + "/Carts.json";
    this.#fileSystem = fs;
  }
  #prepareDir = async () => {
    await this.#fileSystem.promises.mkdir(this.#cartDirPath, {
      recursive: true,
    });
    if (!this.#fileSystem.existsSync(this.#cartsFilePath)) {
      await this.#fileSystem.promises.writeFile(this.#cartsFilePath, "[]");
    }
  };

  createCart = async () => {
    let newCart = new Cart();
    try {
      await this.#prepareDir();
      await this.getCarts();

      if (this.#carts.some((cart) => cart.id === newCart.id)) {
        console.log("Codigo repetido");
      } else {
        this.#carts.push(newCart);
        console.log(this.#carts);
        this.#fileSystem.promises.writeFile(
          this.#cartsFilePath,
          JSON.stringify(this.#carts)
        );
      }
    } catch (error) {
      throw Error(
        `Error creando cart nuevo: ${JSON.stringify(
          newCart
        )}, detalle del error: ${error}`
      );
    }
  };
  getCarts = async () => {
    try {
      await this.#prepareDir();
      let cartFile = await this.#fileSystem.promises.readFile(
        this.#cartsFilePath,
        "utf-8"
      );
      this.#carts = JSON.parse(cartFile);
      console.log(this.#carts);
      return this.#carts;
    } catch (error) {
      throw Error(`Error consultando los carts por archivo, valide el archivo: ${
        this.#cartDirPath
      },
       detalle del error: ${error}`);
    }
  };
  getCartById = async (id) => {
    await this.getCarts();
    let cartfilter = this.#carts.findIndex((cart) => cart.id === id);
    if (cartfilter === -1) {
      console.log(`Codigo: ${id} no arroja resultados`);
    } else {
      console.log(`cart encontrado:`);
      console.log(this.#carts[cartfilter]);
      return this.#carts[cartfilter];
    }
  };
  AddToCart = async (cid, newProd) => {
    try {
      await this.#prepareDir();
      await this.getCarts();
      let filterCart = await this.getCartById(cid);
      if (filterCart) {
        filterCart.products.push(newProd);
        this.#fileSystem.promises.writeFile(
          this.#cartsFilePath,
          JSON.stringify(this.#carts)
        );
      }
    } catch (err) {
      throw Error(`Error consultando los carts por archivo, valide el archivo: ${
        this.#cartDirPath
      },
     detalle del error: ${err}`);
    }
  };
}
export default CartManager;
