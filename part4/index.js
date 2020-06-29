const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger')
const config = require('./utils/config')


const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl =
  'mongodb+srv://fullstack:MYPx4PZv8JI96VfV@cluster0-7set0.mongodb.net/person-app?retryWrites=true&w=majority';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})