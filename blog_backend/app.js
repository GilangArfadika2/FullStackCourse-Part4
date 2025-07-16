// const express = require('express')
// const mongoose = require('mongoose')
// const config = require('./utils/config')
// const logger = require('./utils/logger')
// const middleware = require('./utils/middleware')
// const notesRouter = require('./controllers/notes')

// const app = express()

// logger.info('connecting to', config.MONGODB_URI)

// mongoose
//   .connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info('connected to MongoDB')
//   })
//   .catch((error) => {
//     logger.error('error connection to MongoDB:', error.message)
//   })

// app.use(express.static('dist'))
// app.use(express.json())
// app.use(middleware.requestLogger)

// app.use('/api/notes', notesRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

// module.exports = app

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const BlogRouter = require('./controllers/BlogRouter')
const UserRouter = require('./controllers/userRouter')
const LoginRouter = require('./controllers/LoginRouter')
const {MONGODB_URI} = require('./utils/config')

const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

app.use('/api/blogs', BlogRouter)
app.use('/api/users',UserRouter)
app.use('/api/login',LoginRouter)

const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
    logger.info('connected to MongoDB')
    

  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })




app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app