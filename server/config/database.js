import mongoose from 'mongoose'
import config from 'config'

const mongoOpts = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000,
  loggerLevel: 'info',
  autoReconnect: true
}
const mongodbUrl = config.get('database.mongoUrl')

const connect = () => {
  mongoose.Promise = global.Promise

  if (!mongoose.connection.readyState) {
    return mongoose.connect(mongodbUrl, mongoOpts)
  } else {
    return Promise.resolve()
  }
}




export default { connect }
