import React, {Component} from 'react'
import { connect } from 'react-redux'

import { updateEditForm, deleteComment, toggleEditBox } from '../../actions/comments.js'

import './editdelete.css'
// import moment from 'moment'

class EditDelete extends Component {
  render () {
    const { handleEditClick } = this.props
    return (
      <div>
        {
          this.props.auth.isAuthenticated &&
          (this.props.comment.user_id === this.props.userId) &&
          <div>
            <button className='edit-comment-button btn' onClick={() => handleEditClick()}><i className='fa fa-pencil fa-lg' aria-hidden='true' /></button>
            <button className='delete-comment-button btn'
              onClick={() => this.handleDelete()}><i className='fa fa-trash-o fa-lg' aria-hidden='true' />
            </button>
          </div>
        }
      </div>
    )
  }

  // handleEdit (e) {
  //   const commentId = this.props.comment.id
  //   const comment = this.props.comment.comment
  //   this.props.updateEditForm(comment, commentId)
  //   this.props.toggleEditBox(commentId)
  // }

  // handleDelete (e) {
  //   const billNumber = this.props.billNumber
  //   const userId = this.props.userId
  //   const commentId = this.props.comment.id
  //   const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
  //   const commentDetails = {
  //     user_id: userId,
  //     comment_id: commentId,
  //     billNumber: billNumber,
  //     deleteDate: date
  //   }
  //   this.props.deleteComment(commentDetails)
  //   .then(this.props.getBillInfo.bind(null, billNumber))
  //   .catch((err) => {
  //     if (err) {
  //       console.error(err.message)
  //     }
  //   })
  // }
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
    toggleEditBox: (commentId) => {
      return dispatch(toggleEditBox(commentId))
    },
    updateEditForm: (value, commentId) => {
      return dispatch(updateEditForm(value, commentId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDelete)
