import loginService from '../services/login'
import blogService from '../services/blogs'

export const login = (username, password) => {
  const credentials = {
    username,
    password
  }
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: 'SET_USER',
        data: user
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
    } catch (exception) {
      return exception
    }
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_USER'
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export default reducer
