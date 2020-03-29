const dummy = (blogs) => {

    return 1
}


const totalLikes = (blogs) =>{
    let sum = 0
    blogs.forEach(blog => sum += blog.likes)
    return sum
}

const favouriteBlog = (blogs) => {
    let favourite = {}
    blogs.forEach(blog => {
        if (!favourite.likes){
            favourite = blog
        } else if (favourite.likes < blog.likes){
            favourite = blog
        }
    })
    return favourite
}

const mostBlogs = (blogs) => {
    let most = {}
    let list = {}
    max = 0
    blogs.forEach(blog =>{
        list[blog.author] ? list[blog.author]+=1 : list[blog.author] = 1
        if (max < list[blog.author]){
            most = {author: blog.author, blogs: list[blog.author]} 
            max = list[blog.author]
        } 
    })
    return most
}

const mostLikes = (blogs) =>{
    let most = {}
    let list = {}
    max = 0
    blogs.forEach(blog =>{
        list[blog.author] ? list[blog.author]+= blog.likes : list[blog.author] = blog.likes
        if (max < list[blog.author]){ 
             most = {author: blog.author, likes: list[blog.author]}
             max = list[blog.author]
        } 
    })
    return most
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}