import mongoose from "mongoose";

const messagesCollection = "messages";

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};
const stringTypeSchemaNonUniqueRequired = {
  type: String,
  required: true,
};

const messageSchema = new mongoose.Schema({
  user: stringTypeSchemaUniqueRequired,
  message: stringTypeSchemaNonUniqueRequired,
});

export const messageModel = mongoose.model(messagesCollection, messageSchema);
