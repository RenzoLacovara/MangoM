// import multer from "multer";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'

export const PRIVATE_KEY = 'blablablabla'

export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '60s' })
}
export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send({ error: 'not authenticated' })
  const token = authHeader.split(' ')[1]
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: 'not authorized' })
    req.user = credentials.user
    next()
  })
}

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password)

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    console.log('Entrando a llamar strategy: ')
    console.log(strategy)
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err)
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() })
      }
      console.log('Usuario obtenido del strategy: ')
      console.log(user)
      req.user = user
      next()
    })(req, res, next)
  }
}
export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: 'unauthorized' })
    if (req.user.role != role)
      return res.status(403).send({ error: 'no permissions' })
    next()
  }
}
