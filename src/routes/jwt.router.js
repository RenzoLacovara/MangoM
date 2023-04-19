import { Router } from "express";
// import userModel from "../dao/services/mongo/models/user.model.js";
import { isValidPassword, generateJWToken, createHash } from "../utils.js";

import UserService from "../Dao/services/mongo/user.service.js";
const router = Router();
const userService = new UserService();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findUser(email);
    console.log("Usuario encontrado para login:");
    console.log(user);
    if (!user) {
      console.warn("User doesn't exists with username: " + email);
      return res.status(204).send({
        error: "Not found",
        message: "Usuario no encontrado con username: " + email,
      });
    }
    if (!isValidPassword(user, password)) {
      console.warn("Invalid credentials for user: " + email);
      return res.status(401).send({
        status: "error",
        error: "El usuario y la contraseña no coinciden!",
      });
    }
    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
    };
    const access_token = generateJWToken(tokenUser);
    console.log(access_token);
    //Con Cookie
    res.cookie("jwtCookieToken", access_token, {
      maxAge: 60000,
      httpOnly: true,
    });
    res.send({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: "error", error: "Error interno de la applicacion." });
  }
});
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  console.log("Registrando usuario:");
  console.log(req.body);

  const exists = await userService.findUser(email);
  if (exists) {
    return res
      .status(401)
      .send({ status: "error", message: "Usuario ya existe." });
  }
  const user = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
  };
  const result = await userService.save(user);
  res.status(201).send({
    status: "success",
    message: "Usuario creado con extito con ID: " + result.id,
  });
});

export default router;
