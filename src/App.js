import express from 'express'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/cart.router.js'
import userRouter from './routers/users.views.router.js'
import messageRouter from './routers/view.router.js'
import sessionsRouter from './routers/sessions.router.js'
import githubLoginViewRouter from './routers/github-login.views.router.js'
import jwtRouter from './routers/jwt.router.js'
import testingMock from './routers/testing-mock.js'
import __dirname from './dirname.js'
import handlebars from 'express-handlebars'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'
import PruebaRouter from './routers/Custom/prueba.router.js'
import loggerRouter from './routers/logger.router.js'
import config from './config/config.js'
import MongoSingleton from './config/mongodb-singleton.js'
import { addLogger } from './config/logger.js'
import errorHandler from './config/middleware/errors/index.js'

const app = express()
app.use(addLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use(cookieParser('blablabla'))
app.use(errorHandler)
initializePassport()
app.use(passport.initialize())
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/users', userRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/messages', messageRouter)
app.use('/github', githubLoginViewRouter)
app.use('/api/jwt', jwtRouter)
app.use('/api/mockingproducts', testingMock)
app.use('/api/logger', loggerRouter)

const pruebaExtendRouter = new PruebaRouter()
app.use('api/prueba', pruebaExtendRouter.getRouter())

const SERVER_PORT = config.port
app.listen(SERVER_PORT, () => {
  console.log(`server ${SERVER_PORT}`)
})

const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance()
  } catch (error) {
    console.error(error)
  }
}
mongoInstance()