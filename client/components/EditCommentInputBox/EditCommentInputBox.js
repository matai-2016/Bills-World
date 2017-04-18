import React from 'react'
import { connect } from 'react-redux'

import { clearEditForm, updateEditForm, editComment, toggleEditCommentBox } from '../../actions/comments.js'

import './editcommentinputbox.css'

class EditCommentInputBox extends React.Component {
  componentDidMount () {
    const comment = this.props.comment.comment
    const commentId = this.props.comment.id
    this.props.updateEditForm('comment', comment, commentId)
  }
  render () {
    console.log(this.props.activeEditCommentId, this.props.comment.id)
    return (
      <div>
        {
          (this.props.activeEditCommentId === this.props.comment.id)
          && !!this.props.auth.isAuthenticated
          && (this.props.userId === this.props.comment.user_id)
          && <span>
            <textarea
              type='text'
              className='input-box form-control'
              name='comment'
              value={this.props.activeEditComment}
              onChange={(e) => this.props.updateEditForm(e.target.name, e.target.value, this.props.comment.id)}>
            </textarea>
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
    this.props.clearEditForm()
  }

  handleCancel (e) {
    this.props.toggleEditCommentBox(null)
    this.props.clearEditForm()
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.profile.user_id,
    activeEditComment: state.activeEditComment.comment,
    activeEditCommentId: state.activeEditComment.commentId,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEditForm: (name, value, commentId) => {
      console.log(name, value, commentId)
      return dispatch(updateEditForm(name, value, commentId))
    },
    editComment: (commentDetails) => {
      return dispatch(editComment(commentDetails))
    },
    toggleEditCommentBox: (commentId) => {
      return dispatch(toggleEditCommentBox(commentId))
    },
    clearEditForm: () => {
      return dispatch(clearEditForm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentInputBox)
