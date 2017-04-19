import React, {Component} from 'react'
import { connect } from 'react-redux'

import { updateEditReplyForm, deleteReply, toggleEditReplyBox } from '../../actions/replies.js'

import './editdeletereply.css'

class EditDeleteReply extends Component {
  render () {
    return (
      <div>
        {
          this.props.auth.isAuthenticated
          && (this.props.reply.user_id === this.props.userId)
          && <div>
            <button className='edit-reply-button btn' onClick={(e) => this.handleEdit(e)}><i className='fa fa-pencil fa-lg' aria-hidden='true' /></button>
            <button className='delete-reply-button btn'
              onClick={(e) => this.handleDelete(e)}><i className='fa fa-trash-o fa-lg' aria-hidden='true'></i>
            </button>
          </div>
        }
      </div>
    )
  }

  handleEdit (e) {
    const replyId = this.props.reply.id
    const reply = this.props.reply.reply
    this.props.updateEditReplyForm(reply, replyId)
    this.props.toggleEditReplyBox(replyId)
  }

  handleDelete (e) {
    const billNumber = this.props.billNumber
    const userId = this.props.userId
    const replyId = this.props.reply.id
    const replyDetails = { user_id: userId, reply_id: replyId, billNumber: billNumber }
    this.props.deleteReply(replyDetails)
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
    deleteReply: (replyDetails) => {
      return dispatch(deleteReply(replyDetails))
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
