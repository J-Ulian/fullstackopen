const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are one blog', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(response.body.length)
})

test('the first blog is not about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('Ada Lovelace')
})


afterAll(() => {
    mongoose.connection.close()
})