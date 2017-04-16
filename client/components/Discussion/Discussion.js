import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import './discussion.css'
import Reply from '../Reply/Reply'

import { updateCommentForm, saveComment, clearInputBox, createReply } from '../../actions/comments.js'

class Discussion extends Component {
  render () {
    return (
      <div>
        <input type='text' className='comment-input' name='comment' placeholder='Share your views here' value={this.props.activeComment} onChange={(e) => this.props.updateCommentForm(e.target.name, e.target.value)} />
        <button onClick={() => this.handleSubmit()}>Submit</button>
        <div>
          {
          this.props.comments.map((item) => {
            return (
              <div key={item.id}>
              <p>{item.comment} <br />
              {item.date} {item.username}</p>
              <button name={item.id} onClick={(e) => this.reply(e.target.name)}>Reply</button>
              <Reply parentId={this.props.parentId} itemId={item.id} replying={this.props.replying}/>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
  handleSubmit () {
    const today = new Date()
    const dd = today.getDate()
    const mm = today.getMonth() + 1
    const yyyy = today.getFullYear()
    const date = dd + '/' + mm + '/' + yyyy
    const username = this.props.username
    const clientID = this.props.clientID
    const billNumber = this.props.billNumber
    const activeComment = this.props.activeComment
    const commentDetails = { date: date, username: username, clientID: clientID, billNumber: billNumber, comment: activeComment }
    this.props.saveComment(commentDetails)
    .then(this.props.getBillInfo.bind(null, billNumber))
    .then(this.props.clearInputBox)
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
  }
  reply (parentId) {
    this.props.createReply(parentId)
  }
}

Discussion.propTypes = {
  billNumber: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    clientID: state.auth.profile.clientID,
    username: state.auth.profile.username,
    activeComment: state.activeComment.comment,
    replying: state.activeReply.replying,
    parentId: state.activeReply.parentId
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
    createReply: (parentId) => {
      return dispatch(createReply(parentId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
