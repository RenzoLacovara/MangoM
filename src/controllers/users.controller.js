import UserService from '../services/db/dao/user.service.js'
import {
  isValidPassword,
  generateJWToken,
  createHash,
} from '../config/utility/utils.js'
const userService = new UserService()

export const logUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userService.findUser(email)
    if (!user) {
      console.warn("User doesn't exists with username: " + email)
      return res.status(204).send({
        error: 'Not found',
        message: 'User doesnt exists with username: ' + email,
      })
    }
    if (!isValidPassword(user, password)) {
      console.warn('Invalid credentials for user: ' + email)
      return res.status(401).send({
        status: 'error',
        error: 'User or password invalid',
      })
    }
    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
    }
    const access_token = generateJWToken(tokenUser)
    console.log(access_token)
    //Con Cookie
    res.cookie('jwtCookieToken', access_token, {
      maxAge: 60000,
      httpOnly: true,
    })
    res.send({ message: 'Login successful!' })
  } catch (error) {
    return res
      .status(500)
      .send({ status: 'error', error: 'error logging in user' })
  }
}

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body
    console.log('Registrando usuario:')
    console.log(req.body)

    const exists = await userService.findUser(email)
    if (exists) {
      return res
        .status(401)
        .send({ status: 'error', message: 'user already exists' })
    }
    const user = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    }
    const result = await userService.save(user)
    res.status(201).send({
      status: 'success',
      message: 'user registered successfully with id: ' + result.id,
    })
  } catch (error) {
    res.status(500).send({ error: error, message: 'error registering user.' })
  }
}

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('jwtCookieToken')
    res.redirect('/users/login')
  } catch (error) {
    res.status(500).send({ error: error, message: 'error logging out user.' })
  }
}

export const newPassword = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userService.findUser(email)
    if (!user) {
      return res.status(401).json({ error: error, message: "Can't find user" })
    }
    const newUser = {
      email: email,
      password: createHash(password),
    }
    const result = await userService.update({ email: email }, newUser)
    res
      .status(200)
      .json({ status: 'success', message: `Success changing password` })
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: 'Password could not be changed' })
  }
}
