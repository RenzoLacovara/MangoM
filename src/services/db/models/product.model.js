import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productsCollection = "products";

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};
const stringTypeSchemaNonUniqueRequired = {
  type: String,
  required: true,
};
const numberTypeSchemaNonUniqueRequired = {
  type: Number,
  required: true,
};
const booleanTypeSchemaNonUniqueRequired = {
  type: Boolean,
  required: true,
};
const arrayTypeSchemaNonUniqueRequired = {
  type: Array,
  required: true,
};
const productSchema = new mongoose.Schema({
  title: stringTypeSchemaNonUniqueRequired,
  autor: stringTypeSchemaNonUniqueRequired,
  description: stringTypeSchemaNonUniqueRequired,
  price: numberTypeSchemaNonUniqueRequired,
  thumbnail: stringTypeSchemaNonUniqueRequired,
  code: stringTypeSchemaUniqueRequired,
  stock: numberTypeSchemaNonUniqueRequired,
  category: arrayTypeSchemaNonUniqueRequired,
  available: booleanTypeSchemaNonUniqueRequired,
});

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productsCollection, productSchema);
