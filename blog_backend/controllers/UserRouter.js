const bcrypt = require('bcrypt')
const UserRouter = require('express').Router()
const User = require('../models/userModels')

UserRouter.get('/', async (request, response) => {
   //   const users = await User.find({}).populate('blogs')
  const users = await User.find({}).populate('blogs', { title : "Understanding Node.js Streams 2"})
  response.json(users)
})

UserRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = UserRouter