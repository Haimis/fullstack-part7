import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleLike, removeBlog, commentPost } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router, Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Blog = (props) => {
  if (!props.blog) {
    return (
      <div>unknown page</div>
    )
  }

  const commentPost = async (event) => {
    console.log()
    const newComment = event.target.comment.value
    props.commentPost(props.blog, newComment)
    props.setNotification(`Your comment ${newComment} to ${props.blog.title} was added`, '')
  }

  const likeBlog = (blog) => {
    props.handleLike(blog)
    props.setNotification(`You liked ${blog.title}`, '')
  }

  const deleteBlog = (blog) => {
    props.removeBlog(blog)
    props.setNotification(`You removed ${blog.title}`, '')
    return (
      <Router>
        <Redirect to="/" />
      </Router>
    )
  }

  const DeleteButton = () => {
    if (props.blog.user.id === props.user.id) {
      return (
        <div>
          <button onClick={() => deleteBlog(props.blog)}>remove</button><br></br>
        </div>
      )
    } else {
      return (
        null
      )
    }
  }

  return (
    <div>
      <h1>{props.blog.title} by {props.blog.author}</h1>
      {props.blog.url}<br></br>
      {props.blog.likes} likes <button id="like" onClick={() => likeBlog(props.blog)}>like</button><br></br>
      added by {props.blog.user.name}<br></br>
      <h2>comments</h2>
      <ul>
        {props.blog.comments.map(comment =>
          <li key={comment}>
            {comment}
          </li>
        )}
      </ul>
      <form id="form" onSubmit={commentPost}>
        <div><input name="comment" /></div>
        <button type="submit">add comment</button>
      </form>
      {DeleteButton()}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.blogs,
    blog: ownProps.blog,
    user: state.user
  }
}

const mapDispatchToProps = {
  handleLike,
  removeBlog,
  commentPost,
  setNotification
}

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object,
  handleLike: PropTypes.func,
  removeBlog: PropTypes.func,
  commentPost: PropTypes.func,
  setNotification: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
