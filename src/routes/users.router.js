import { Router } from "express";
import { userModel } from "../Dao/services/mongo/models/user.model.js";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser("s3cr3t"));

router.get("/setCookie", (req, res) => {
  res
    .cookie("oreos", "tremenda cookie", { maxAge: 10000, signed: true })
    .send("Cookie");
});
router.get("/getCookie", (req, res) => {
  res.send(req.cookies);
});
router.get("/deleteCookie", (req, res) => {
  res.clearCookie("oreos").send("Cookie borrada");
});
router.get("/", async (req, res) => {
  try {
    let users = await userModel.find();
    res.send(users);
  } catch (err) {
    console.log("algo paso:" + err);
    res.status(500).send({ err: "no se pudo hacer la cosa", message: err });
  }
});
router.post("/", async (req, res) => {
  try {
    let { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email)
      return res.status(400).send({ status: "error", message: "error capo" });
    let users = await userModel.create({ first_name, last_name, email });
    res.status(201).send(users);
  } catch (err) {
    console.log("algo paso:" + err);
    res.status(500).send({ err: "no se pudo hacer la cosa", message: err });
  }
});
router.put("/:uid", async (req, res) => {
  let { uid } = req.params;
  let userToReplace = req.body;
  if (
    !userToReplace.first_name ||
    !userToReplace.last_name ||
    !userToReplace.email
  )
    return res.send({ status: "error", error: "valores incompletos" });
  let result = await userModel.updateOne({ _id: uid }, userToReplace);
  res.send({ status: "success", payload: result });
});
router.delete("/:uid", async (req, res) => {
  let { uid } = req.params;
  let result = await userModel.deleteOne({ _id: uid });
  res.send({ status: "success", payload: result });
});
export default router;
