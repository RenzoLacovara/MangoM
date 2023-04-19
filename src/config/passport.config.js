import passport from "passport";
import passportLocal from "passport-local";
// import userModel from "../dao/services/mongo/models/user.model.js";
import userService from "../Dao/services/mongo/user.service.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import jwtStrategy from "passport-jwt";
import { PRIVATE_KEY } from "../utils.js";

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;
const localStrategy = passportLocal.Strategy;
const initializePassport = () => {
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["jwtCookieToken"];
    }
    return token;
  };
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (e) {
          return done(e);
        }
      }
    )
  );
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const exists = await userService.findUser({ email });
          if (exists) {
            console.log("user already exists");
            return done(null, false);
          }
          const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await userService.save(user);
          return done(null, result);
        } catch (err) {
          return done("user registration failed" + err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
    }
  });
  // passport.use(
  //   "login",
  //   new localStrategy(
  //     { passReqToCallback: true, usernameField: "email" },
  //     async (req, username, password, done) => {
  //       try {
  //         const user = await userModel.findOne({ email: username });
  //         if (!user) {
  //           console.log("user does not exist");
  //           return done(null, false);
  //         }
  //         if (!isValidPassword(user, password)) return done(null, false);
  //         return done(null, user);
  //       } catch (err) {
  //         return done(err);
  //       }
  //     }
  //   )
  // );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.eb0514e7d89e4f80",
        clientSecret: "92817af386b1502ed6ffbdfc142a71c3e7ec02e2",
        callbackUrl: "http://localhost:9090/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Profile obtenido del usuario: ");
        console.log(profile);
        try {
          const user = await userService.findUser({
            email: profile._json.email,
          });
          console.log("Usuario encontrado para login:");
          console.log(user);
          if (!user) {
            console.warn(
              "User doesn't exists with username: " + profile._json.email
            );
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 18,
              email: profile._json.email,
              password: "",
              loggedBy: "GitHub",
            };
            const result = await userService.save(newUser);
            return done(null, result);
          } else {
            //Si entramos por acá significa que el usuario ya existía.
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
export default initializePassport;
