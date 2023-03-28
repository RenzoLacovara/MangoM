import mongoose from "mongoose";

// const userCollection = "usuarios";

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};
// const stringTypeSchemaNonUniqueRequired = {
//   type: String,
//   required: true,
// };
// const userSchema = new mongoose.Schema({
//   first_name: stringTypeSchemaNonUniqueRequired,
//   last_name: stringTypeSchemaNonUniqueRequired,
//   email: stringTypeSchemaUniqueRequired,
//   courses: {
//     type: [
//       {
//         course: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "courses",
//         },
//       },
//     ],
//     default: [],
//   },
// });
// userSchema.pre("find", function () {
//   this.populate("courses.course");
// });
// export const userModel = mongoose.model(userCollection, userSchema);
const collection = "users";

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: stringTypeSchemaUniqueRequired,
  age: Number,
  password: String,
  role: String,
});

const userModel = mongoose.model(collection, schema);

export default userModel;
