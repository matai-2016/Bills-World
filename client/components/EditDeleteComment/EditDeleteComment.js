import React, {Component} from 'react'
import { connect } from 'react-redux'

import { updateEditForm, deleteComment, toggleEditCommentBox } from '../../actions/comments.js'

import './editdeletecomment.css'

class EditDeleteComment extends Component {
  render () {
    return (
      <div>
        {
          this.props.auth.isAuthenticated &&
          (this.props.comment.user_id === this.props.userId) &&
          <div>
            <button className='edit-comment-button btn' onClick={(e) => this.handleEdit(e)}><i className='fa fa-pencil fa-lg' aria-hidden='true' /></button>
            <button className='delete-comment-button btn'
              onClick={(e) => this.handleDelete(e)}><i className='fa fa-trash-o fa-lg' aria-hidden='true' />
            </button>
          </div>
        }
      </div>
    )
  }

  handleEdit (e) {
    const commentId = this.props.comment.id
    const comment = this.props.comment.comment
    this.props.updateEditForm('comment', comment, commentId)
    this.props.toggleEditCommentBox(commentId)
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
    auth: state.auth,
    activeEditCommentId: state.activeEditComment.commentId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (commentDetails) => {
      return dispatch(deleteComment(commentDetails))
    },
    toggleEditCommentBox: (commentId) => {
      return dispatch(toggleEditCommentBox(commentId))
    },
    updateEditForm: (name, value, commentId) => {
      return dispatch(updateEditForm(name, value, commentId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteComment)
