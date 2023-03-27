import { Router } from "express";
import userModel from "../Dao/services/mongo/models/user.model.js";
import { createHash, isValidPassword } from "../dirname.js";
const router = Router();
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  console.log(req.body);
  const exists = await userModel.findOne({ email });
  if (exists) {
    return res
      .status(400)
      .send({ status: "error", message: "User already registered" });
  }
  const user = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
  };
  const result = await userModel.create(user);
  res.status(201).send({
    status: "success",
    message: `User created successfully, ID: ${result._id}`,
  });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });
  if (!user)
    return res
      .status(401)
      .send({ status: "error", message: "User or Password not found" });
  if (!isValidPassword(user, password)) {
    return res
      .status(401)
      .send({ status: "error", message: "User or Password not found" });
  }
  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
  };
  res.send({
    status: "success",
    payload: req.session.user,
    message: "User logged!",
  });
});

export default router;
