const app = require('./app') // the actual Express application
const {PORT}= require('./utils/config')
const logger = require('./utils/logger')

// logger.info('message')
// logger.error('error message')


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})