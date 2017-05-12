import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReportAbuse from '../../components/ReportAbuse/ReportAbuse'
import './discussion.css'
import CommentWithReplies from '../../components/CommentWithReplies/CommentWithReplies'

import { updateCommentForm, saveComment, saveReply, clearInputBox } from '../../actions/comments.js'
import moment from 'moment'

class Discussion extends Component {
  render () {
    return (
      <div>
        <h3 className='comments-title'>Comments</h3>
        {
          this.props.isAuthenticated &&
          <span>
            <div className='form-group row'>
              <textarea
                type='text'
                className='input-box form-control'
                name='comment'
                placeholder='Share your views here'
                value={this.props.activeComment}
                onChange={(e) => this.props.updateCommentForm(e.target.value)} />
              {
                this.props.activeComment
                ? <button className='submit-button btn' onClick={(event) => this.handleNewCommentSubmit(this.props.activeComment)}>Submit</button>
                : <button disabled className='submit-button btn'>Submit</button>
              }
            </div>
          </span>
        }
        {
          !this.props.isAuthenticated &&
          <span>
            <p className='login-prompt'>Please login or register to comment on this thread</p>
          </span>
        }
        <div>
          {
            this.props.nestedComments.map((commentWithReplies) => {
              const comment = commentWithReplies.comment
              const replies = commentWithReplies.replies
              return (
                <CommentWithReplies
                  key={comment.id}
                  comment={comment}
                  replies={replies}
                  userId={this.props.user_id}
                  billNumber={this.props.billNumber}
                  isAuthenticated={this.props.isAuthenticated}
                  getBillInfo={this.props.getBillInfo}
                  handleReplySubmit={(id, val) => this.handleSubmit(val, id)}
                />
              )
            })
          }
        </div>
        <ReportAbuse />
      </div>
    )
  }

  handleNewCommentSubmit (activeComment) {
    const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
    const username = this.props.username
    const userId = this.props.user_id
    const billNumber = this.props.billNumber
    let commentDetails = {
      date: date,
      username: username,
      user_id: userId,
      billNumber: billNumber,
      comment: activeComment
    }
    this.props.saveComment(commentDetails)
      .then(() => this.props.getBillInfo(billNumber))
      .then(() => this.props.clearInputBox())
  }

  handleSubmit (value, parentId) {
    const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
    const username = this.props.username
    const userId = this.props.user_id
    const billNumber = this.props.billNumber
    let commentDetails = {
      date: date,
      username: username,
      user_id: userId,
      billNumber: billNumber,
      comment: value
    }

    if (parentId) {
      commentDetails.parentId = parentId
    }
    
    return parentId
      ? this.props.saveReply(commentDetails)
      : this.props.saveComment(commentDetails)
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
    user_id: state.auth.profile.user_id,
    username: state.auth.profile.username,
    activeComment: state.activeComment.comment,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCommentForm: (value) => {
      return dispatch(updateCommentForm(value))
    },
    saveComment: (commentDetails) => {
      return dispatch(saveComment(commentDetails))
    },
    clearInputBox: () => {
      return dispatch(clearInputBox())
    },
    saveReply: (replyDetails) => {
      return dispatch(saveReply(replyDetails))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
