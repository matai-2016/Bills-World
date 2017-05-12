import React, {Component} from 'react'
import { connect } from 'react-redux'

import { updateEditReplyForm, toggleEditReplyBox } from '../../actions/replies.js'
import { deleteComment } from '../../actions/comments.js'

import './editdeletereply.css'
import moment from 'moment'

class EditDeleteReply extends Component {
  render () {
    return (
      <div>
        {
          this.props.auth.isAuthenticated &&
          (this.props.reply.user_id === this.props.userId) &&
          <div>
            <button className='edit-reply-button btn' onClick={(e) => this.handleEdit(e)}><i className='fa fa-pencil fa-lg' aria-hidden='true' /></button>
            <button className='delete-reply-button btn'
              onClick={(e) => this.handleDelete(e)}><i className='fa fa-trash-o fa-lg' aria-hidden='true' />
            </button>
          </div>
        }
      </div>
    )
  }

  handleEdit (e) {
    const replyId = this.props.reply.id
    const reply = this.props.reply.comment
    this.props.updateEditReplyForm(reply, replyId)
    this.props.toggleEditReplyBox(replyId)
  }

  handleDelete (e) {
    const billNumber = this.props.billNumber
    const userId = this.props.userId
    const commentId = this.props.reply.id
    const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
    const replyDetails = {
      user_id: userId,
      comment_id: commentId,
      billNumber: billNumber,
      deleteDate: date
    }
    this.props.deleteComment(replyDetails)
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
    activeEditReplyId: state.activeEditReply.replyId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (commentDetails) => {
      return dispatch(deleteComment(commentDetails))
    },
    toggleEditReplyBox: (replyId) => {
      return dispatch(toggleEditReplyBox(replyId))
    },
    updateEditReplyForm: (value, replyId) => {
      return dispatch(updateEditReplyForm(value, replyId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteReply)
