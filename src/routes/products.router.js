import { Router } from "express";
// import { uploader } from "../dirname.js";
// import ProductManager from "../Dao/services/filesystem/ProductManager.js";
import ProductManager from "../Dao/services/mongo/ProductManager.js";

const pm = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page);

    if (!page) page = 1;
    let result = await pm.getProducts(page);
    result.prevLink = result.hasPrevPage
      ? `http://localhost:9090/api/products?page=${result.prevPage}`
      : "";
    result.nextLink = result.hasNextPage
      ? `http://localhost:9090/api/products?page=${result.nextPage}`
      : "";
    result.isValid = !(page <= 0 || page > result.totalPages);

    res.render("products", result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: "invalid products" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    let filterProd = await pm.getProductById(productId);
    if (filterProd) {
      res.send({ status: "success", message: filterProd });
    } else {
      res.send({ status: "error", message: "Invalid product id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: "invalid products" });
  }
});

router.post("/add", async (req, res) => {
  let newProd = await pm.addProduct(req.body);
  res.send({ status: "success", message: newProd });
});

// router.put("/:pid", async (req, res) => {
//   const productId = parseInt(req.params.pid);
//   const newData = JSON.stringify(req.body);
//   await pm.updateProduct(productId, JSON.parse(newData));
//   res.send({
//     status: "success",
//     message: `producto con id: ${productId} actualizado`,
//   });
// });
// router.delete("/:pid", async (req, res) => {
//   const productId = parseInt(req.params.pid);
//   await pm.deleteProduct(productId);
//   res.send({ status: "success", message: "objeto eliminado" });
// });
export default router;
