import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { checkLogin, loginRequest, logoutSuccess } from '../actions'

class Login extends Component {
  constructor (props) {
    super(props)
    this.props.checkLogin(this.props.history)
  }

  render () {
    return (
      <div>
        {
          !this.props.isAuthenticated
          ? (
            <button onClick={() => this.props.onLoginClick(this.props.history)}>Login</button>
          )
          : (
            <div>
              <img src={this.props.profile.picture} height='40px' />
              <span>Welcome, {this.props.profile.nickname}</span>
              <button onClick={() => this.props.onLogoutClick(this.props.history)}>Logout</button>
            </div>
          )
        }
        {
          this.props.error && <p>{this.props.error}</p>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.profile,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (history) => {
      return dispatch(checkLogin(history))
    },
    onLoginClick: (history) => {
      return dispatch(loginRequest())
    },
    onLogoutClick: (history) => {
      return dispatch(logoutSuccess(history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
