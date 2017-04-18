import React from 'react'
import { connect } from 'react-redux'

import { updateCommentForm, saveComment, clearInputBox, deleteComment } from '../../actions/comments.js'


import './editdeletecomment.css'

class EditDeleteComment extends React.Component {
  render () {
    return (
      <div>
        <button>Edit</button>
        <button className='delete-comment-btn'
        onClick={(e) => this.handleSubmit(e)}>Delete</button>
      </div>
    )
  }

  handleSubmit (e) {
    const user_id = this.props.user_id
    const comment_id = this.props.comment_id
    const bill_number = this.props.bill_number
    const commentDetails = { user_id: user_id, comment_id: comment_id, bill_number: bill_number }
    this.props.deleteComment(commentDetails)
    .then(this.props.getBillInfo.bind(null, bill_number))
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.profile.user_id,
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
    },
    deleteComment: (commentDetails) => {
      return dispatch(deleteComment(commentDetails))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteComment)
