
import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import { handleLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router, Route, Link
} from 'react-router-dom'

const BlogList = (props) => {
  const blogFormRef = React.createRef()

  return (
    <div>
      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <ul>
        {props.blogs.map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )}
      </ul>
    </div>
  )
}

const sortedBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    blogs: sortedBlogs(state.blogs),
    user: state.user
  }
}

const mapDispatchToProps = {
  handleLike,
  setNotification,
  removeBlog
}

BlogList.propTypes = {
  blogs: PropTypes.array,
  handleLike: PropTypes.func,
  setNotification: PropTypes.func,
  removeBlog: PropTypes.func,
  user: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
