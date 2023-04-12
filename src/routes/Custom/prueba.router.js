import CustomRouter from "./router.js";

export default class PruebaRouter extends CustomRouter {
  init() {
    this.get("/", (req, res) => {
      res.sendSuccess("Hola");
    });
  }
}
