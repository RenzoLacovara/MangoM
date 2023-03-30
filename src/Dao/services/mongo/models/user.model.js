import mongoose from "mongoose";

// const userCollection = "usuarios";
const userCollection = "users";

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: stringTypeSchemaUniqueRequired,
  age: Number,
  password: String,
  role: String,
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;
