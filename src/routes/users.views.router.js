import { Router } from "express";
import { authToken } from "../utils.js";
import passport from "passport";
import { passportCall } from "../utils.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get(
  "/",
  //authToken, -> Usando Authorization Bearer Token
  //passport.authenticate('jwt', {session: false}), //-> Usando JWT por Cookie
  passportCall("jwt"), //-> Usando JWT por Cookie usando customCall
  // authorization("user"),
  (req, res) => {
    console.log(req.user);
    res.render("profile", {
      user: req.user,
    });
  }
);
router.get("/logout", (req, res) => {
  res.clearCookie("jwtCookieToken");
  res.redirect("/users/login");
  // req.session.destroy((err) => {
  //   if (!err) {
  //     res.redirect("/users/login");
  //   }
  // });
});

router.get("/error", (req, res) => {
  res.render("error");
});
export default router;
