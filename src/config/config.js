import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program
  .option('-d', 'variable para debug', false)
  .option('-p <port>', 'variable para puerto', 9090)
  .option('--mode <mode>', 'variable para modo', 'production')
  .requiredOption(
    '-u <user>',
    'variable para usuario',
    'no se ha declarado un usuario'
  )
  .option('-l, --letters [letters...]', 'specify letters')
program.parse()

console.log('mode option: ', program.opts().mode)

process.on('exit', (code) => {
  console.log('exit code: ', code)
})
process.on('uncaughtException', (exception) => {
  console.log('uncaughtException: ', exception)
})
process.on('message', (message) => {
  console.log('message: ', message)
})

const environment = program.opts().mode
dotenv.config({
  path:
    environment === 'develop'
      ? './config/env/.env.development'
      : './config/env/.env.production',
})
export default {
  port: process.env.PORT,
  mongourl: process.env.MONGODB_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
}
