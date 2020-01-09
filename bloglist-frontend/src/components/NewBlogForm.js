import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogForm = (props) => {
  const newBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      user: props.user,
      comments: []
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    props.addBlog(blog)
    props.setNotification(`Blog ${blog.title} from ${blog.author} added`, '')
  }

  return (
    <div>
      <h1>create new blog</h1>
      <form id="form" onSubmit={newBlog}>
        <div>title<input id="title" name="title" /></div>
        <div>author<input id="author" name="author" /></div>
        <div>url<input id="url" name="url" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  addBlog,
  setNotification
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func,
  handleLike: PropTypes.func,
  initializeBlogs: PropTypes.func,
  removeBlog: PropTypes.func,
  setNotification: PropTypes.func,
  user: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBlogForm)
