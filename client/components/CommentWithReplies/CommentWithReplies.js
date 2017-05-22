import React, { Component } from 'react'
import './commentWithReplies.css'

import Comment from '../Comment/Comment'
import Reply from '../Reply/Reply'
import ReplyInputBox from '../ReplyInputBox/ReplyInputBox'

class CommentWithReplies extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showReply: false,
      showEdit: false
    }
  }
  handleReplyClick () {
    this.setState({ showReply: true })
  }
  handleReplyDiscard () {
    this.setState({ showReply: false })
  }
  handleEditClick () {
    this.setState({ showEdit: true })
  }
  handleEditDiscard () {
    this.setState({ showEdit: false })
  }
  render () {
    const {
      comment,
      isAuthenticated,
      userId,
      billNumber,
      getBillInfo,
      replies,
      handleReplySubmit,
      handleEditSubmit,
      handleDelete
    } = this.props

    return (
      <div className='comment-container'>
        <Comment
          comment={comment}
          isAuthenticated={isAuthenticated}
          userId={userId}
          billNumber={billNumber}
          getBillInfo={getBillInfo}
          handleReplyClick={() => this.handleReplyClick()}
          handleEditSubmit={(id, val) => handleEditSubmit(id, val)}
          handleEditClick={() => this.handleEditClick()}
          handleEditDiscard={() => this.handleEditDiscard()}
          handleDelete={(id) => handleDelete(id)}
          showEdit={this.state.showEdit}
        />
        {
          this.props.isAuthenticated &&
          this.state.showReply &&
          <ReplyInputBox
            handleDiscard={() => this.handleReplyDiscard()}
            handleSubmit={(val) => {
              this.handleReplyDiscard()
              handleReplySubmit(comment.id, val)
            }}
          />
        }
        {
          replies.map((reply) => {
            return (
              <div className='row reply-section' key={'reply' + reply.id}>
                <Reply
                  reply={reply}
                  isAuthenticated={isAuthenticated}
                  userId={userId}
                  billNumber={billNumber}
                  getBillInfo={getBillInfo}
                  handleEditSubmit={(id, val) => handleEditSubmit(id, val)}
                  handleEditClick={() => this.handleEditClick()}
                  handleEditDiscard={() => this.handleEditDiscard()}
                  handleDelete={(id) => handleDelete(id)}
                  showEdit={this.state.showEdit}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default CommentWithReplies
