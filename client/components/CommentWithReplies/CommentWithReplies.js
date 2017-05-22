import React, { Component } from 'react'
import './commentWithReplies.css'

import Comment from '../Comment/Comment'
import Reply from '../Reply/Reply'
import EditDeleteReply from '../../containers/EditDeleteReply/EditDeleteReply'
import EditReplyInputBox from '../../containers/EditReplyInputBox/EditReplyInputBox'

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
          handleEditSubmit={(id, val) => this.handleEditSubmit(id, val)}
          handleEditClick={() => this.handleEditClick()}
          handleEditDiscard={() => this.handleEditDiscard()}
          handleDelete={(id) => this.handleDelete(id)}

        />
        {
          this.props.isAuthenticated &&
          this.state.showReply &&
          <Reply
            handleDiscard={() => this.handleReplyDiscard()}
            handleSubmit={(val) => {
              this.handleReplyDiscard()
              handleReplySubmit(comment.id, val)
            }}
          />
        }
        {
          replies.map((reply) => {
            if (reply.deleted == null) {
              return (
                <div className='row reply-section' key={'reply' + reply.id}>
                  <div className='reply-text'>
                    <span className='username'>{reply.username}</span>
                    <span className='date'>{reply.date}</span>
                    {
                      reply.edited &&
                        <span className='date'> (edited)</span>
                    }
                    <p>{reply.comment}</p>
                  </div>
                  {
                  isAuthenticated &&
                  (userId === reply.user_id) &&
                  <span>
                    <EditDeleteReply
                      reply={reply}
                      billNumber={billNumber}
                      getBillInfo={getBillInfo}
                      handleEditClick={() => this.handleEditClick()} />
                    <EditReplyInputBox
                      reply={reply}
                      user_id={reply.user_id}
                      billNumber={billNumber}
                      getBillInfo={getBillInfo}
                      handleEditSubmit={(id, val) => this.handleEditSubmit(id, val)}
                      handleEditDiscard={() => this.handleEditDiscard()}
                       />
                  </span>
                }
                </div>
              )
            } else {
              return (
                <div className='row reply-section' key={'reply' + reply.id}>
                  <div className='reply-text'>
                    <span className='date'>{reply.deleted}</span>
                    <p>Comment deleted</p>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}

export default CommentWithReplies
