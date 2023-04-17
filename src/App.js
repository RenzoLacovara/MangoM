import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/users.views.router.js";
import messageRouter from "./routes/view.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import githubLoginViewRouter from "./routes/github-login.views.router.js";
import jwtRouter from "./routes/jwt.router.js";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import PruebaRouter from "./routes/Custom/prueba.router.js";
import config from "./config/config.js";
// import { Server } from "socket.io";
// import MongoStore from "connect-mongo";
// import session from "express-session";
// import { generateToken, authToken } from "./utils.js";
// import FileStore from "session-file-store";

const app = express();
// const fileStorage = FileStore(session);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("blablabla"));
const MONGO_URL = config.mongourl;

// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl: MONGO_URL,
//       mongoOptions: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//       ttl: 30,
//     }),
//     secret: "S3cr3t",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

initializePassport();
app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/users", userRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/messages", messageRouter);
app.use("/github", githubLoginViewRouter);
app.use("/api/jwt", jwtRouter);
const pruebaExtendRouter = new PruebaRouter();
app.use("api/prueba", pruebaExtendRouter.getRouter());

const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
  console.log(`server ${SERVER_PORT}`);
  console.log(config);
});
const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("conectado con exito a mongo");
  } catch (err) {
    console.error("no se pudo conectar" + err);
    process.exit();
  }
};
connectMongo();
