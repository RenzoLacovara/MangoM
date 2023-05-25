import { Router } from 'express'

const router = new Router()

router.get('/', (req, res) => {
  req.logger.fatal('Jodido')
  req.logger.error('Aspero')
  req.logger.warning('Grave')
  req.logger.info(`Informativo`)
  req.logger.http('Http')
  req.logger.debug('debug')
  res.send({ message: 'Testeando logger' })
})

export default router
