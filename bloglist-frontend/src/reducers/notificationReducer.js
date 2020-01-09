export const setNotification = (message, reason) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: {
        message,
        reason
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'SET',
        data: {
          message: '',
          reason: ''
        }

      })
    }, 5000)
  }
}

const initialNotification = {
  message: '',
  reason: ''
}

const reducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    default:
      return state
  }
}

export default reducer
