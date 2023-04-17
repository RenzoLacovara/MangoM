import dotenv from "dotenv";
import program from "../process.js";

const environment = program.opts().mode;
dotenv.config({
  path:
    environment === "develop"
      ? "./env/.env.development"
      : "./env/.env.production",
});
export default {
  port: process.env.PORT,
  mongourl: process.env.MONGODB_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
};
