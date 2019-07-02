import setupApp from './src/app'

const listen = app =>
  app.listen(app.get('port'), () =>
    console.log(`Listening on port ${app.get('port')}`)
  )

const startupError = err => {
  console.error(`🚨 Error bootstrapping app!`, err)
  process.exit(1)
}

setupApp()
  .then(listen)
  .catch(startupError)
