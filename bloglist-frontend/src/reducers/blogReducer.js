import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    blogService.remove(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export const commentPost = (blog, comment) => {
  console.log(blog)
  console.log(comment)
  return async dispatch => {
    const blogToComment = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    const commentedBlog = await blogService.update(blogToComment)
    dispatch({
      type: 'COMMENT',
      data: commentedBlog
    })
    setNotification(`You liked ${blog.title}`, '')
  }
}

export const handleLike = (blog) => {
  return async dispatch => {
    const blogToLike = {
      ...blog,
      likes: blog.likes + 1
    }
    const likedBlog = await blogService.update(blogToLike)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      console.log(action.data)
      return [...state, action.data]
    case 'LIKE':
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      ).sort(function (a, b) {
        return b.likes - a.likes
      })
    case 'COMMENT':
      console.log(action.data)
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      )
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }
}

export default reducer
