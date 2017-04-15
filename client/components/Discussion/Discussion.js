import React, { Component } from 'react'
import { connect } from 'react-redux'
import './discussion.css'

import { updateCommentForm } from '../../actions/comments.js'

class Discussion extends Component {
  render () {
    const errorMessage = this.props.message
    return (
      <div>
        <input type='text' className='comment-input' name='comment' placeholder='Share your views here' onChange={(e) => this.props.updateCommentForm(e.target.name, e.target.value)} />

        {errorMessage &&
          <p>{errorMessage}</p>
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCommentForm: (name, value) => {
      return dispatch(updateCommentForm(name, value))
    }
  }
}

export default connect(null, mapDispatchToProps)(Discussion)

// <button onClick={(event) => this.handleSubmit(event)}>Submit</button>

// saveComment: (details) => {
//   return dispatch(loginUser(creds))
//
// const mapStateToProps = (state) => {
//   return {
//     email: state.auth.email,
//     password: state.auth.password,
//     message: state.auth.message,
//     authenticated: state.auth.authenticated
//   }
// }
