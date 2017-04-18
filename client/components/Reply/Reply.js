import React, {Component} from 'react'
import { connect } from 'react-redux'
import './reply.css'
import moment from 'moment'

import { updateReplyForm, saveReply } from '../../actions/comments.js'

class Reply extends Component {
  render () {
    return (
      <div>
      {
        this.props.parentId === Number(this.props.activeParentId)
        &&
        <div className='reply-container'>
          <textarea type='text' className='input-box form-control' name='activeReply' placeholder='Reply here' value={this.props.activeReply}
          onChange={(e) => this.props.updateReplyForm(e.target.name, e.target.value)}>
          </textarea>
          {
            this.props.activeReply
            ? <button className='reply-submit-button btn' onClick={(props) => this.handleSubmit(props)}>Submit</button>
            : <button disabled className='reply-submit-button btn' onClick={(event) => this.handleSubmit(event)}>Submit</button>
          }
        </div>
      }
      </div>
    )
  }
  handleSubmit () {
    const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
    const user_id = this.props.user_id
    const username = this.props.username
    const billNumber = this.props.billNumber
    const activeReply = this.props.activeReply
    const parentId = this.props.parentId
    const replyDetails = { date: date, username: username, user_id: user_id, billNumber: billNumber, comment: activeReply, parentId: parentId }
    this.props.saveReply(replyDetails)
    .then(this.props.getBillInfo.bind(null, billNumber))
    .then(this.props.clearInputBox)
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
    username: state.auth.profile.username,
    activeReply: state.activeReply.activeReply,
    activeParentId: state.activeReply.parentId,
    replying: state.activeReply.replying
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateReplyForm: (name, value) => {
      return dispatch(updateReplyForm(name, value))
    },
    saveReply: (replyDetails) => {
      return dispatch(saveReply(replyDetails))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reply)
