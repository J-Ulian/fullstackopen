const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    return Math.max(...blogs.map(blog => blog.likes))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}