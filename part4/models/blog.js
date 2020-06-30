const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)


const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Blog', blogSchema)