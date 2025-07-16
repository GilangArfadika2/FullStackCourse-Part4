const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
  {
    "_id": "5a422aa71b54a676234d17f8",
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    "likes": 5,
    "__v": 0
  },
  {
    "_id": "b7f1c2d3e4f5678901234567",
    "title": "Understanding Node.js Streams",
    "author": "Jane Doe",
    "url": "https://example.com/node-streams",
    "likes": 15,
    "__v": 2
  },
  {
    "_id": "c8e2f3a4b5c6789012345678",
    "title": "A Guide to Express Middleware",
    "author": "John Smith",
    "url": "https://example.com/express-middleware",
    "likes": 23,
    "__v": 1
  },
  {
    "_id": "d9f3a4b5c6d7890123456789",
    "title": "Async/Await in JavaScript",
    "author": "Alice Johnson",
    "url": "https://example.com/async-await",
    "likes": 8,
    "__v": 3
  },
  {
    "_id": "e0a1b2c3d4e8901234567890",
    "title": "Mastering MongoDB Aggregations",
    "author": "Bob Lee",
    "url": "https://example.com/mongodb-aggregations",
    "likes": 30,
    "__v": 0
  },
  {
    "_id": "f1b2c3d4e5f9012345678901",
    "title": "REST API Design Best Practices",
    "author": "Sara Kim",
    "url": "https://example.com/rest-api-design",
    "likes": 19,
    "__v": 4
  }
    ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
   test('when list has more than one blog, sum the total likes from those blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 100)
  })
})

