import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {
  const tryLogin = async (event) => {
    event.preventDefault()
    const response = await props.login(event.target.username.value, event.target.password.value)
    if (response) {
      props.setNotification('Login failed, bad username or password', 'error')
    } else {
      props.setNotification('succesfully logged in', '')
    }
  }

  return (
    <form className="form-group" onSubmit={tryLogin}>
      <div>
        username <input id="username" name="username"/>
      </div>
      <div>
        password <input id="password" name="password"/>
      </div>
      <button className="btn btn-dark" type="submit">login</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  login,
  setNotification
}

LoginForm.propTypes = {
  username: PropTypes.string,
  handleLike: PropTypes.func,
  initializeBlogs: PropTypes.func,
  removeBlog: PropTypes.func,
  setNotification: PropTypes.func,
  login: PropTypes.func,
  user: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
