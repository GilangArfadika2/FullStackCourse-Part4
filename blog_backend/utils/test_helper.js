const BlogModel = require('../models/BlogModels')
const UserModel = require('../models/userModels')
const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
  {
    title: "Understanding Node.js Streams",
    author: "Jane Doe",
    url: "https://example.com/node-streams",
    likes: 15,
  },
  {
    title: "A Guide to Express Middleware",
    author: "John Smith",
    url: "https://example.com/express-middleware",
    likes: 23,
  },
  {
    title: "Async/Await in JavaScript",
    author: "Alice Johnson",
    url: "https://example.com/async-await",
    likes: 8,
  },
  {
    title: "Mastering MongoDB Aggregations",
    author: "Bob Lee",
    url: "https://example.com/mongodb-aggregations",
    likes: 30,
  },
  {
    title: "REST API Design Best Practices",
    author: "Sara Kim",
    url: "https://example.com/rest-api-design",
    likes: 19,
  }
]

const nonExistingId = async () => {
  const blog = new BlogModel({
    title: 'willremovethissoon',
    author: 'temp',
    url: 'http://temp.com',
    likes: 0
  })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await BlogModel.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await UserModel.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}