import React from 'react'
import { connect } from 'react-redux'

import { clearEditCommentForm, updateEditCommentForm, editComment, toggleEditCommentBox } from '../../actions/comments.js'

import './editcommentinputbox.css'

class EditCommentInputBox extends React.Component {
  render () {
    return (
      <div>
        {
          (this.props.activeEditCommentId === this.props.comment.id)
          && !!this.props.auth.isAuthenticated
          && (this.props.userId === this.props.user_id)
          && <span>
            <textarea
              type='text'
              className='edit-box form-control'
              name='editcomment'
              value={this.props.activeEditComment}
              onChange={(e) => this.props.updateEditCommentForm(e.target.name, e.target.value, this.props.comment.id)} />
            <button className='submit-button btn' onClick={(e) => this.handleSubmit(e)}>Submit</button>
            <button className='submit-button btn' onClick={(e) => this.handleCancel(e)}>Cancel</button>
          </span>
        }
      </div>
    )
  }
  handleSubmit (e) {
    const userId = this.props.comment.user_id
    const commentId = this.props.comment.id
    const billNumber = this.props.billNumber
    const activeEditComment = this.props.activeEditComment
    const commentDetails = { user_id: userId, comment_id: commentId, comment: activeEditComment, billNumber: billNumber }
    this.props.editComment(commentDetails)
      .then(this.props.getBillInfo.bind(null, billNumber))
      .catch((err) => {
        if (err) {
          console.error(err.message)
        }
      })
    this.props.toggleEditCommentBox(null)
    this.props.clearEditCommentForm()
  }

  handleCancel (e) {
    this.props.toggleEditCommentBox(null)
    this.props.clearEditCommentForm()
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.profile.user_id,
    activeEditComment: state.activeEditComment.editcomment,
    activeEditCommentId: state.activeEditComment.commentId,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEditCommentForm: (name, value, commentId) => {
      return dispatch(updateEditCommentForm(name, value, commentId))
    },
    editComment: (commentDetails) => {
      return dispatch(editComment(commentDetails))
    },
    toggleEditCommentBox: (commentId) => {
      return dispatch(toggleEditCommentBox(commentId))
    },
    clearEditCommentForm: () => {
      return dispatch(clearEditCommentForm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentInputBox)
