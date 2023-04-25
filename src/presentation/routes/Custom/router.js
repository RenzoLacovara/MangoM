import { Router } from 'express'
import { PRIVATE_KEY } from '../../../config/utility/utils.js'

export default class CustomRouter {
  constructor() {
    this.router = Router()
    this.init()
  }
  getRouter() {
    return this.router
  }
  init() {}
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this.params)
      } catch (e) {
        console.error(e)
        params[i].status(500).send(e)
      }
    })
  }
  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    )
  }
  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    )
  }
  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    )
  }
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    )
  }
  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) =>
      res.status(200).send({ status: 'success', payload })
    res.sendServerError = (error) =>
      res.status(500).send({ status: 'error', error })
    res.sendUserError = (error) =>
      res.status(400).send({ status: 'error', error })
    next()
  }
  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === 'PUBLIC') return next()
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(401)
        .send({ error: 'user not authenticated or missing token' })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
      if (error)
        return res.status(403).send({ error: 'invalid token, unauthorized' })
      if (!policies.includes(user.role.toUpperCase()))
        return res.status(403).send({ error: 'user has no roles' })
      req.user = credentials.tokenUser
      next()
    })
  }
}
