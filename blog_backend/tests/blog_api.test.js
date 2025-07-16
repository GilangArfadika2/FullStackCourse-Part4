const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('../utils/test_helper')
const BlogModel = require('../models/BlogModels')

const api = supertest(app)

beforeEach(async () => {
  await BlogModel.deleteMany({})
  for (const blog of helper.initialBlogs) {
    const blogObject = new BlogModel(blog)
    await blogObject.save()
  }
})

describe('Blog API tests', () => {
    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'New Blog',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 7
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('New Blog'))
    })

    test('the unique identifier of blogs is represented by property ID', async () => {

        const listBlogs = await helper.blogsInDb()
        listBlogs.forEach(blog => assert.ok(blog.id))
        
    })

    test('blog with missing data is not added', async () => {
    const newBlog = {
        author: 'No Title',
        url: 'http://notitle.com',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('a blog can be updated', async () => {
        const newBlog = helper.initialBlogs[0]
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await helper.blogsInDb()
        const updateQuery = {
            title : "updated title"
        }
        const addedBlog = response.find(blog => blog.title === newBlog.title)
        const updatedBlog = await api
        .put(`/api/blogs/${addedBlog.id}`)
        .send(updateQuery)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(updateQuery.title , updatedBlog.body.title)
    })
  
     test('a blog can be deleted', async () => {
        const newBlog = helper.initialBlogs[0]
        const initialData = await helper.blogsInDb()
        const initialLength = initialData.length
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await helper.blogsInDb()
        const addedBlog = response.find(blog => blog.title === newBlog.title)
        await api
        .delete(`/api/blogs/${addedBlog.id}`)
        .expect(204)
        const resultResponse = await helper.blogsInDb()
        const resultLength = resultResponse.length
        assert.strictEqual(initialLength ,resultLength)
    })
     after(async () => {
    await mongoose.connection.close()
    })
})