import { Promise as bluebird } from 'bluebird'
global.Promise = bluebird

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import database from '../config/database'

const app = express()

const configureExpress = () => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use('/', routes)

  app.set('port', process.env.PORT || 3001)
  return app
}

export default () => database.connect().then(configureExpress)
