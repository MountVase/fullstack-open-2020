const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((total, currentValue) => {
        return total + currentValue.likes
    }, 0)
    
    return total
}

const favoriteBlog = (blogs) => {
    const reduceFunc = (prev, current) => {
      if (current.likes > prev.likes) return { title: current.title, author: current.author, likes: current.likes }
   
      else return prev
    }
    return blogs.length === 0 ? null : blogs.reduce(reduceFunc, blogs[0])   
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
