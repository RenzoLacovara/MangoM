import { Router } from "express";
// import userModel from "../Dao/services/mongo/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
const router = Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    const user = req.user;
    req.session.user = {
      name: `${user.first_name} ${user.last_name}}`,
      email: user.email,
      age: user.age,
    };
    req.session.admin = true;
    res.redirect("/github");
  }
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.status(201).send({
      status: "success",
      message: `User created successfully`,
    });
  }
);
router.get("/failregister", async (req, res) => {
  res.status(401).send({ error: "failed register" });
});
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .send({ status: "error", message: "invalid credentials" });
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      age: user.age,
      email: user.email,
    };
    res.send({
      status: "success",
      payload: req.session.user,
      message: "Succesfully logged in!",
    });
  }
);
router.get("faillogin", (req, res) => {
  res.status(401).send({ error: "failed login" });
});

export default router;
