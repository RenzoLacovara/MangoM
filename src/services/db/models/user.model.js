import mongoose from 'mongoose'

const userCollection = 'users'

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
}

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: stringTypeSchemaUniqueRequired,
  age: Number,
  password: String,
  role: { type: String, default: 'user', enum: ['admin', 'user'] },
  cart: {
    type: [
      {
        cartId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'cart',
        },
      },
    ],
    default: [],
  },
})
// userSchema.pre("findOne", function () {
//   this.populate("cart.cartId");
// });
const userModel = mongoose.model(userCollection, userSchema)
export default userModel
