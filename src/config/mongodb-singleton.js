import mongoose from 'mongoose'
import config from './config.js'

export default class MongoSingleton {
  static #instance
  constructor() {
    this.#connectMongoDB()
  }
  static getInstance() {
    if (this.#instance) {
      console.log('Ya se ha abierto una conexion a MongoDB')
    } else {
      this.#instance = new MongoSingleton()
    }
    return this.#instance
  }
  #connectMongoDB = async () => {
    try {
      await mongoose.connect(config.mongourl)
      console.log('conectado con exito a mongo')
    } catch (err) {
      console.error('no se pudo conectar' + err)
      process.exit()
    }
  }
}
