import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router, Route, Link
} from 'react-router-dom'

const UserView = (props) => {
  if (!props.user) {
    return (
      <div>
        loading
      </div>
    )
  }

  if (props.user !== null) {
    return (
      <div>
        <h1>{props.user.name}</h1>
        <h2>added blogs</h2>
        <ul className="list-group">
          {props.user.blogs.map(blog =>
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
  return (
    null
  )
}

UserView.propTypes = {
  user: PropTypes.object,
  blogs: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  null
)(UserView)
