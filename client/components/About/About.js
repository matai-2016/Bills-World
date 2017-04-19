import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkLogin, createLoginRequest } from '../../actions/auth.js'

import './about.css'

class About extends Component {
  componentDidMount () {
    this.props.checkLogin(this.props.history)
  }

  render () {
    return (
      <div className='about'>
        <div className='logo-container'>
          <img className='logo-img' src='/img/logo.png' />
        </div>
        <div className='features-container container'>
          <div className='compressor row'>
            <div className='feature feature-1 col-xs-12 col-sm-6 col-md-4'>
              <h3 id='feature-text'>View Bills</h3>
              <img className='feature-img' src='/img/rma.png' />
            </div>
            <div className='feature feature-2 col-xs-12 col-sm-6 col-md-4'>
              <h3 id='feature-text'>Track the Polls</h3>
              <img className='feature-img' src='/img/poll_360.png' />
            </div>
            <div className='feature feature-2 col-xs-12 col-sm-6 col-md-4'>
              <h3 id='feature-text'>Join the Debate</h3>
              <img className='feature-img' src='/img/parliament.png' />
            </div>
          </div>
        </div>
        <div className='description'>
          <div className='description-text'>
            <p>Bill's World is a place to learn, discuss and support proposed changes to New Zealand law. </p>
          </div>
          <div className='sign-up-text'>
            <div>
              <h4 id='scroll-to-see'>Scroll to see current bills </h4>
              {!this.props.isAuthenticated &&
              <span>
                <h4>or</h4>
                <button className='btn btn-default sign-up-button' onClick={() => this.props.onLoginClick()}>Sign Up</button>
              </span>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (history) => {
      return dispatch(checkLogin(history))
    },
    onLoginClick: () => {
      return dispatch(createLoginRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
