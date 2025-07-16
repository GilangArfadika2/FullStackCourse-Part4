const BlogRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const BlogModel = require('../models/BlogModels')
const UserModel = require('../models/userModels')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

BlogRouter.get('/', async (request, response, next) => {
   const listBlogs = await BlogModel.find({}).populate('user')
   response.json(listBlogs)
})
BlogRouter.get('/:id', async (request, response, next) => {
  try{
      const listBlogs = await BlogModel.findById(request.params.id).populate('user')
   if (!listBlogs) {
     return response.status(404).json({ error: 'blog not found' })
   }
   response.status(200).json(listBlogs)
  } catch (error) {
    next(error)
  }
})

BlogRouter.post('/', async (request, response,next) => {

  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await UserModel.findById(decodedToken.id)
    if (!request.body.title || !request.body.author || !request.body.url 
        || !request.body.likes ||
        request.body.title === '' || request.body.author === '' || request.body.url === '') {
        return response.status(400).json({ error: 'title, author, likes and url are required' })
        }
    const existingUser = await UserModel.findById(decodedToken.id)
    const blog = new BlogModel({
      title: request.body.title,
      Author: request.body.author,
      url: request.body.url,
      likes: Number.parseInt(request.body.likes) || 0,
      user : request.body.userId
    }
    )
    const newBlog = await blog.save()
    existingUser.blogs = existingUser.blogs.concat(newBlog._id)
    await existingUser.save()
    
    response.status(201).json(newBlog)
  } catch (error) {
     next(error)
  }
})


BlogRouter.put('/:id', async (request, response, next) => {
  const { title,author,likes,url } = request.body
  try {
    const existingBlog = await BlogModel.findById(request.params.id);
    if (!existingBlog) {
      return response.status(404).json("blog not found")
    } else {
      existingBlog.title =   (!title || title === "" )?  existingBlog : title;
      existingBlog.author = (!author || author === "") ? existingBlog.author : author;
      existingBlog.likes = (likes === undefined || likes === null) ? existingBlog.likes : likes;
      existingBlog.url = (!url || url === "") ? existingBlog.url : url;
      const updatedBlog = await existingBlog.save()
      if (!updatedBlog){
        return response.status(500).json("the server could not update the blog. contact the admin")
      }
      return response.status(200).json(updatedBlog)
    }
  } catch (error) {
    next(error)
  }

})

BlogRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(request.params.id)
    if (!deletedBlog){
      return response.status(404).json('blog not found')
    }
    return response.status(204).end()
  } catch (error) {
    next(error)
  }
})




module.exports = BlogRouter