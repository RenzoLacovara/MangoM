import { Router } from "express";
import userModel from "../Dao/services/mongo/models/user.model.js";
import { createHash, isValidPassword } from "../dirname.js";
import passport from "passport";
const router = Router();
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.status(201).send({
      status: "success",
      message: `User created successfully, ID: ${result._id}`,
    });
  }
);
router.get("/failregister", async (req, res) => {
  console.log("fail to register");
  res.send({ error: "failed" });
});
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", message: "invalid credentials" });
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    res.send({ status: "success", payload: req.user });
  }
);
router.get("faillogin", (req, res) => {
  res.send({ error: "failed login" });
});

export default router;
