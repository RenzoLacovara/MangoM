import { Router } from "express";
import userModel from "../models/user.model.js";
import { authToken } from "../utils.js";

const router = Router();

router.get("/:userId", authToken, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      res.status(202).json({ message: "User not found with id: " + userId });
    }
    res.json(user);
  } catch (err) {
    console.error("error consultando el usuario con id: " + userId);
  }
});
export default router;

// router.param("word", async (req, res, next, word) => {
//     console.log("Buscando nombre de mascota con valor: " + word);
//     try {
//         let result = await petsService.findByName(word);
//         if (!result) {
//             req.pet = null;
//         } else {
//             req.pet = result;
//         }
//         next();
//     } catch (error) {
//         console.error("Error consultando las mascotas");
//         res.status(500).send({error: "Error consultando las mascotas", message: error});
//     }
// });
