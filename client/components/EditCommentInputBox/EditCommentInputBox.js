import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { clearEditForm, updateEditForm, editComment, toggleEditCommentBox } from '../../actions/comments.js'

import './editcommentinputbox.css'

class EditCommentInputBox extends React.Component {
  componentDidMount () {
    const comment = this.props.comment.comment
    this.props.updateEditForm('comment', comment)
  }
  render () {
    return (
      <div>
        {
          this.props.auth.isAuthenticated
          && this.props.comment.edit
          && (this.props.userId === this.props.comment.user_id)
          && <span>
            <textarea
              type='text'
              className='input-box form-control'
              name='comment'
              value={this.props.activeEditComment}
              onChange={(e) => this.props.updateEditForm(e.target.name, e.target.value)}>
            </textarea>
            <button className='submit-button btn' onClick={(e) => this.handleSubmit(e)}>Submit</button>
          </span>
        }
      </div>
    )
  }
  handleSubmit (e) {
    const bool = false
    const userId = this.props.comment.user_id
    const commentId = this.props.comment.id
    const billNumber = this.props.billNumber
    const activeEditComment = this.props.activeEditComment
    const commentDetails = { user_id: userId, comment_id: commentId, comment: activeEditComment, billNumber: billNumber }
    const hideEditBox = { billNumber: billNumber, user_id: userId, comment_id: commentId, bool: bool }
    this.props.editComment(commentDetails)
      .then(this.props.getBillInfo.bind(null, billNumber))
      .catch((err) => {
        if (err) {
          console.error(err.message)
        }
      })
    this.props.toggleEditCommentBox(hideEditBox)
      .then(this.props.getBillInfo.bind(null, billNumber))
      .catch((err) => {
        if (err) {
          console.error(err.message)
        }
      })
    this.props.clearEditForm()
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.profile.user_id,
    activeEditComment: state.activeEditComment.comment,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEditForm: (name, value) => {
      return dispatch(updateEditForm(name, value))
    },
    editComment: (commentDetails) => {
      return dispatch(editComment(commentDetails))
    },
    toggleEditCommentBox: (commentDetails) => {
      return dispatch(toggleEditCommentBox(commentDetails))
    },
    clearEditForm: () => {
      return dispatch(clearEditForm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentInputBox)
