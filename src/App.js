import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/users.views.router.js";
import messageRouter from "./routes/view.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mongoose from "mongoose";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import session from "express-session";
// import FileStore from "session-file-store";
import MongoStore from "connect-mongo";

const app = express();
// const fileStorage = FileStore(session);
const MONGO_URL =
  "mongodb+srv://reenzo22:Cofi2020@clustermango.rzq3wlu.mongodb.net/ecommerce?retryWrites=true&w=majority";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 30,
    }),
    secret: "S3cr3t",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/users", userRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/messages", messageRouter);

const SERVER_PORT = 9090;
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`server ${SERVER_PORT}`);
});
let messages = [];
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("new user connected.");
  socket.on("message", (data) => {
    console.log(data);
    messages.push(data);
    socketServer.emit("messageLogs", messages);
  });
  socket.on("userConnected", (data) => {
    console.log("User connected: " + data.user);
    socket.broadcast.emit("userConnected", data.user);
  });
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
