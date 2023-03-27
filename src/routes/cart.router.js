import { Router } from "express";
// import CartManager from "../Dao/services/filesystem/CartManager.js";
// import ProductManager from "../Dao/services/filesystem/ProductManager.js";
import CartManager from "../Dao/services/mongo/CartManager.js";

const cm = new CartManager();
const router = Router();

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    let filterCart = await cm.getCartAndPop(cid);
    res.send({ status: "success", message: filterCart });
  } catch (error) {
    console.error(error);
    res.send({ status: "error", message: "Invalid cart id" });
  }
});
router.post("/", async (req, res) => {
  try {
    let newCart = await cm.addCart();
    res.send({ status: "success", message: newCart });
  } catch (error) {
    console.error(error);
    res.send({ status: "error", message: "Invalid cart" });
  }
});
router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    let isInCart = await cm.getProdInCart(pid);
    let cart = await cm.getCartById(cid);
    if (isInCart.length == 0) {
      cart.products.push({ product: pid, quantity: 1 });
      let result = await cm.updateCart(cid, cart);
      res.send({ status: "success", message: result });
    } else {
      let prodQuantity = cart.products.filter(
        (oneProd) => oneProd.product == pid
      );
      let result = await cm.updateProdQuantity(cid, pid, prodQuantity[0]);
      res.send({ status: "success", message: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:cid/products/:pid", async (req, res) => {
  const newStock = req.body;
  const { cid, pid } = req.params;
  try {
    let updateCart = await cm.updateCartStock(cid, pid, newStock);
    res.send({ status: "success", message: updateCart });
  } catch (error) {
    console.error(error);
    res.send({ status: "error", message: "Invalid product" });
  }
});
router.put("/:cid", async (req, res) => {
  try {
    let { newProducts } = req.body;
    let { cid } = req.params;
    let updateCart = await cm.updateCart(cid, newProducts);
    res.send({ status: "success", message: updateCart });
  } catch (error) {
    console.error(error);
    res.send({ status: "error", message: "Invalid product" });
  }
});
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  let result = await cm.deleteProduct(cid, pid);
  res.send({ status: "success", payload: result });
});
router.delete("/:cid", async (req, res) => {
  let { cid } = req.params;
  let result = await cm.deleteAllProducts({ _id: cid });
  res.send({ status: "success", payload: result });
});

export default router;
