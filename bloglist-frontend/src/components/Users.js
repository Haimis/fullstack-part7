import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router, Route, Link
} from 'react-router-dom'

const Users = (props) => {
  return (
    <div>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null
)(Users)
