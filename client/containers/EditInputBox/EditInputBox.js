import React from 'react'
import { connect } from 'react-redux'

import { clearEditForm, updateEditForm, editComment, toggleEditBox } from '../../actions/comments.js'

import './editinputbox.css'
import moment from 'moment'

class EditInputBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }

  handleOnChange (newVal) {
    this.setState({
      value: newVal
    })
  }

  render () {
    const { handleEditSubmit, handleEditDiscard } = this.props
    return (
      <div>
        {
          (this.props.activeEditCommentId === this.props.comment.id) &&
          !!this.props.auth.isAuthenticated &&
          (this.props.userId === this.props.user_id) &&
          <span>
            <textarea
              type='text'
              className='edit-box form-control'
              name='editcomment'
              value={this.state.value}
              onChange={(e) => this.handleOnChange(e.target.value)} />
            <button className='submit-button btn' onClick={() => handleEditSubmit(this.state.value)}>Submit</button>
            <button className='submit-button btn' onClick={() => handleEditDiscard()}><i className='fa fa-times fa-lg' aria-hidden='true' /></button>
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
    const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
    const commentDetails = { user_id: userId, comment_id: commentId, comment: activeEditComment, billNumber: billNumber, editDate: date }
    this.props.editComment(commentDetails)
      .then(this.props.getBillInfo.bind(null, billNumber))
      .catch((err) => {
        if (err) {
          console.error(err.message)
        }
      })
    this.props.toggleEditBox(null)
    this.props.clearEditForm()
  }

  handleCancel (e) {
    this.props.toggleEditBox(null)
    this.props.clearEditForm()
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.profile.user_id,
    activeEditComment: state.activeEdit.editcomment,
    activeEditCommentId: state.activeEdit.commentId,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEditForm: (value, commentId) => {
      return dispatch(updateEditForm(value, commentId))
    },
    editComment: (commentDetails) => {
      return dispatch(editComment(commentDetails))
    },
    toggleEditBox: (commentId) => {
      return dispatch(toggleEditBox(commentId))
    },
    clearEditForm: () => {
      return dispatch(clearEditForm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInputBox)
