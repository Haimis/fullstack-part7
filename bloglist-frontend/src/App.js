import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Menu from './components/Menu'
import { initializeBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/userReducer'
import { initializeUser } from './reducers/loginReducer'
import './App.css'
import PropTypes from 'prop-types'
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router, Route, Link, Redirect, withRouter
} from 'react-router-dom'

const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
    props.initializeUser()
    props.getUsers()
  }, [])

  return (
    <Router>
      <div className="p-3 mb-2 bg-light text-dark" >
        {props.user === null
          ? <div>
            <Notification />
            <h1>log in to application</h1>
            <LoginForm/>
          </div>
          : <div>
            <Menu />
            <Redirect to="/" />
          </div>
        }
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUser,
  getUsers
}

App.propTypes = {
  initializeBlogs: PropTypes.func,
  initializeUser: PropTypes.func,
  getUsers: PropTypes.func,
  user: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
