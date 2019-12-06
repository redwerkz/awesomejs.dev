import './passport'
import { bootstrap, printReady } from '@nodepack/app'
import { Context } from './context'
import morgan from 'morgan'
import { hook } from '@nodepack/app-context'
import { spawn } from 'child_process'

if (process.env.NODEPACK_ENV === 'development') {
  hook('expressCreate', (ctx: Context) => {
    // Express logs
    ctx.express.use(morgan('dev'))
    ctx.express.use(morgan(':method :url req-cookie: :req[cookie] res-set-cookie: :res[set-cookie]'))
  })
}

bootstrap(() => {
  printReady()
})

// Auto-generate shcema code
hook('apolloListen', () => {
  spawn('yarn', ['schema-gen'], {
    cwd: process.cwd(),
    stdio: ['inherit', 'inherit', 'inherit'],
  })
})
