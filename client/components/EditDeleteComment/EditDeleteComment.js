import React from 'react'
import { connect } from 'react-redux'

import { updateEditForm, deleteComment, toggleEditCommentBox } from '../../actions/comments.js'


import './editdeletecomment.css'

class EditDeleteComment extends React.Component {
  render () {
    return (
      <div>
        {
          this.props.auth.isAuthenticated
          && (this.props.comment.user_id === this.props.userId)
          && <div>
            <button onClick={(e) => this.handleEdit(e)}>Edit</button>
            <button className='delete-comment-btn'
              onClick={(e) => this.handleDelete(e)}>Delete
            </button>
          </div>
        }
      </div>
    )
  }

  handleEdit (e) {
    const billNumber = this.props.billNumber
    const userId = this.props.userId
    const commentId = this.props.comment.id
    const bool = !this.props.comment.edit
    const commentDetails = { billNumber: billNumber, user_id: userId, comment_id: commentId, bool: bool }
    this.props.updateEditForm('comment', this.props.comment.comment)
    this.props.toggleEditCommentBox(commentDetails)
      .then(this.props.getBillInfo.bind(null, billNumber))
      .catch((err) => {
        if (err) {
          console.error(err.message)
        }
      })
  }

  handleDelete (e) {
    const billNumber = this.props.billNumber
    const userId = this.props.userId
    const commentId = this.props.comment.id
    const commentDetails = { user_id: userId, comment_id: commentId, billNumber: billNumber }
    this.props.deleteComment(commentDetails)
    .then(this.props.getBillInfo.bind(null, billNumber))
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.profile.user_id,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (commentDetails) => {
      return dispatch(deleteComment(commentDetails))
    },
    toggleEditCommentBox: (commentDetails) => {
      return dispatch(toggleEditCommentBox(commentDetails))
    },
    updateEditForm: (name, value) => {
      return dispatch(updateEditForm(name, value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteComment)
