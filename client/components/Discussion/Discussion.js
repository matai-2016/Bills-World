import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import './discussion.css'

import { updateCommentForm, saveComment, clearInputBox } from '../../actions/comments.js'

class Discussion extends Component {
  render () {
    return (
      <div>
        <h3 className='comments-title'>Comments</h3>
        {this.props.auth.isAuthenticated &&
          <span>
            <div className='form-group row'>
              <textarea type='text' className='input-box form-control' name='comment' placeholder='Share your views here' value={this.props.activeComment} onChange={(e) => this.props.updateCommentForm(e.target.name, e.target.value)}>
              </textarea>
              <button className='submit-button btn' onClick={(event) => this.handleSubmit(event)}>Submit</button>
            </div>
          </span>
        }
        {!this.props.auth.isAuthenticated &&
          <span>
            <p className='login-prompt'>Please login or register to comment on this thread</p>
          </span>
        }
        <div>
          {
          this.props.comments.map((comment, i) => {
            return (
              <div key={i} className='comment'>
                <div>
                  <p className='comment-text'>{comment.comment}</p>
                </div>
                <div className='row'>
                  <div className='metadata col-md-offset-2'>
                    <p className='username'>{comment.username}</p>
                    <p>{comment.date}</p>
                  </div>
                </div>
                <hr/>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
  handleSubmit (event) {
    const today = new Date()
    const dd = today.getDate()
    const mm = today.getMonth() + 1
    const yyyy = today.getFullYear()
    const date = dd + '/' + mm + '/' + yyyy
    const username = this.props.username
    const clientID = this.props.clientID
    const billNumber = this.props.billNumber
    const activeComment = this.props.activeComment
    const commentDetails = { date: date, username: username, clientID: clientID, billNumber: billNumber, comment: activeComment }
    this.props.saveComment(commentDetails)
    .then(this.props.getBillInfo.bind(null, billNumber))
    .then(this.props.clearInputBox)
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
  }
}

Discussion.propTypes = {
  billNumber: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    clientID: state.auth.profile.clientID,
    username: state.auth.profile.username,
    activeComment: state.activeComment.comment,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCommentForm: (name, value) => {
      return dispatch(updateCommentForm(name, value))
    },
    saveComment: (commentDetails) => {
      return dispatch(saveComment(commentDetails))
    },
    clearInputBox: () => {
      return dispatch(clearInputBox())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
