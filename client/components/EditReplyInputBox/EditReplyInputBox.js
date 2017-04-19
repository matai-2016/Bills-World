import React from 'react'
import { connect } from 'react-redux'

import { clearEditReplyForm, updateEditReplyForm, editReply, toggleEditReplyBox } from '../../actions/replies.js'

import './editreplyinputbox.css'

class EditReplyInputBox extends React.Component {
  componentDidMount () {
    const reply = this.props.reply.reply
    const replyId = this.props.reply.id
    this.props.updateEditReplyForm('editreply', reply, replyId)
  }
  render () {
    return (
      <div>
        {
          (this.props.activeEditReplyId === this.props.reply.id)
          && !!this.props.auth.isAuthenticated
          && (this.props.userId === this.props.user_id)
          && <span>
            <textarea
              type='text'
              className='input-box form-control'
              name='editreply'
              value={this.props.activeEditReply}
              onChange={(e) => this.props.updateEditReplyForm(e.target.name, e.target.value, this.props.reply.id)} />
            <button className='submit-button btn' onClick={(e) => this.handleSubmit(e)}>Submit</button>
            <button className='submit-button btn' onClick={(e) => this.handleCancel(e)}>Cancel</button>
          </span>
        }
      </div>
    )
  }
  handleSubmit (e) {
    const userId = this.props.reply.user_id
    const replyId = this.props.reply.id
    const billNumber = this.props.billNumber
    const activeEditReply = this.props.activeEditReply
    const replyDetails = { user_id: userId, reply_id: replyId, reply: activeEditReply, billNumber: billNumber }
    this.props.editReply(replyDetails)
      .then(this.props.getBillInfo.bind(null, billNumber))
      .catch((err) => {
        if (err) {
          console.error(err.message)
        }
      })
    this.props.toggleEditReplyBox(null)
    this.props.clearEditReplyForm()
  }

  handleCancel (e) {
    this.props.toggleEditReplyBox(null)
    this.props.clearEditReplyForm()
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.profile.user_id,
    activeEditReply: state.activeEditReply.editreply,
    activeEditReplyId: state.activeEditReply.replyId,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEditReplyForm: (name, value, replyId) => {
      return dispatch(updateEditReplyForm(name, value, replyId))
    },
    editReply: (replyDetails) => {
      return dispatch(editReply(replyDetails))
    },
    toggleEditReplyBox: (replyId) => {
      return dispatch(toggleEditReplyBox(replyId))
    },
    clearEditReplyForm: () => {
      return dispatch(clearEditReplyForm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReplyInputBox)
