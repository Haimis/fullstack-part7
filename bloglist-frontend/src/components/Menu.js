import React from 'react'
import Users from './Users'
import PropTypes from 'prop-types'
import BlogList from './BlogList'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'
import Blog from '../components/Blog'
import UserView from '../components/UserView'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
    paddingLeft: 5
  }

  const userById = (id) =>
    props.users.find(a => a.id === id)

  const blogById = (id) =>
    props.blogs.find(a => a.id === id)

  const endSession = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    props.logout()
  }

  if (!props.user) {
    return (
      <div></div>
    )
  }
  return (
    <div>
      <Router>
        <div>
          <div className="p-3 mb-2 bg-info text-white">
            <Link style={padding} className="text-white" to="/">blogs</Link>
            <Link style={padding} className="text-white" to="/users">users</Link>
            {props.user.name} logged in
            <button type="button" className="btn btn-light" onClick={endSession}>log out</button>
          </div>
          <Notification />
          <div>
            <h2>blog app</h2>
            <Route exact path="/" render={() => <BlogList />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={blogById(match.params.id)}/>}
            />
            <Route exact path="/users/:id" render={({ match }) =>
              <UserView user={userById(match.params.id)} />}
            />

          </div>
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  logout,
  setNotification
}

Menu.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  blogs: PropTypes.array,
  logout: PropTypes.func,
  setNotification: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
