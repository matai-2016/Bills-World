import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReportAbuse from '../../components/ReportAbuse/ReportAbuse'
import './discussion.css'
import CommentWithReplies from '../../components/CommentWithReplies/CommentWithReplies'

import { updateCommentForm, saveComment, saveReply, editComment, deleteComment, clearInputBox } from '../../actions/comments.js'
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
                ? <button className='submit-button btn' onClick={(event) => this.handleCommentSubmit(this.props.activeComment)}>Submit</button>
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
                  handleReplySubmit={(id, val) => this.handleReplySubmit(id, val)}
                  handleEditSubmit={(id, val) => this.handleEditSubmit(id, val)}
                  handleDelete={(id) => this.handleDelete(id)}
                />
              )
            })
          }
        </div>
        <ReportAbuse />
      </div>
    )
  }

  handleCommentSubmit (activeComment) {
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

  handleReplySubmit (parentId, value) {
    const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
    const username = this.props.username
    const userId = this.props.user_id
    const billNumber = this.props.billNumber
    let commentDetails = {
      date: date,
      username: username,
      user_id: userId,
      billNumber: billNumber,
      comment: value,
      parentId: parentId
    }
    this.props.saveReply(commentDetails)
    .then(this.props.getBillInfo.bind(null, billNumber))
    .then(this.props.clearInputBox)
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
  }

  handleEditSubmit (commentId, value) {
    const userId = this.props.comment.user_id
    const billNumber = this.props.billNumber
    const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
    const commentDetails = { user_id: userId, comment_id: commentId, comment: value, billNumber: billNumber, editDate: date }
    this.props.editComment(commentDetails)
      .then(this.props.getBillInfo.bind(null, billNumber))
      .then(this.props.clearInputBox)
      .catch((err) => {
        if (err) {
          console.error(err.message)
        }
      })
  }

  handleDelete (commentId) {
    const billNumber = this.props.billNumber
    const userId = this.props.user_id
    const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
    const commentDetails = {
      user_id: userId,
      comment_id: commentId,
      billNumber: billNumber,
      deleteDate: date
    }
    this.props.deleteComment(commentDetails)
    .then(this.props.getBillInfo.bind(null, billNumber))
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
    saveReply: (replyDetails) => {
      return dispatch(saveReply(replyDetails))
    },
    editComment: (commentDetails) => {
      return dispatch(editComment(commentDetails))
    },
    deleteComment: (commentDetails) => {
      return dispatch(deleteComment(commentDetails))
    },
    clearInputBox: () => {
      return dispatch(clearInputBox())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
