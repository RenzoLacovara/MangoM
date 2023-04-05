import { Router } from "express";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this.params);
      } catch (e) {
        console.error(e);
        params[i].status(500).send(e);
      }
    });
  }
  get(path, ...callbacks) {
    this.router.get(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }
  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => {
      res.status(200).send({ status: "success", payload });
    };
    next();
  };
}
