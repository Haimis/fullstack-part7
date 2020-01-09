import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  if (notification.message === '') {
    return null
  }

  if (notification.reason === 'error') {
    return (
      <div className="alert alert-danger" role="alert">
        {notification.message}
      </div>
    )
  }
  return (
    <div className="alert alert-success" role="alert">
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  props: PropTypes.object,
  notification: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)
