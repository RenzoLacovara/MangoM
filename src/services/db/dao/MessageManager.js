import { messageModel } from '../../persistence/models/message.model.js'

export default class messageManager {
  getMesagges = async () => messageModel.find()
  getMessagesById = async (id) => messageModel.findById(id)
  addMessage = async (body) => messageModel.create(body)
}
