import userModel from '../models/user.model.js'

export default class UserService {
  save = async (student) => {
    let result = await userModel.create(student)
    return result
  }

  findUser = async (username) => await userModel.findOne({ email: username })

  update = async (filter, value) => {
    let result = await userModel.updateOne(filter, value)
    return result
  }
}
