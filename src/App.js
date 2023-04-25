import express from 'express'
import productRouter from './presentation/routes/products.router.js'
import cartRouter from './presentation/routes/cart.router.js'
import userRouter from './presentation/routes/users.views.router.js'
import messageRouter from './presentation/routes/view.router.js'
import sessionsRouter from './presentation/routes/sessions.router.js'
import githubLoginViewRouter from './presentation/routes//github-login.views.router.js'
import jwtRouter from './presentation/routes/jwt.router.js'
import __dirname from './dirname.js'
import handlebars from 'express-handlebars'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'
import PruebaRouter from './presentation/routes/Custom/prueba.router.js'
import config from './config/config.js'
import MongoSingleton from './mongodb-singleton.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/presentation/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use(cookieParser('blablabla'))

initializePassport()
app.use(passport.initialize())
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/users', userRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/messages', messageRouter)
app.use('/github', githubLoginViewRouter)
app.use('/api/jwt', jwtRouter)
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
