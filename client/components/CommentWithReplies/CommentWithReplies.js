import React, { Component } from 'react'
import './commentWithReplies.css'

import Comment from '../Comment/Comment'
import Reply from '../Reply/Reply'
import DeleteReply from '../DeleteReply/DeleteReply'


class CommentWithReplies extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showReply: false
    }
  }
  handleReplyClick () {
    this.setState({ showReply: true })
  }
  handleHideReply () {
    this.setState({ showReply: false })
  }
  render () {
    const {
      comment,
      isAuthenticated,
      user_id,
      billNumber,
      getBillInfo,
      replies,
      handleReplySubmit
    } = this.props

    return (
      <div className='comment-container'>
        <Comment
          comment={comment}
          isAuthenticated={isAuthenticated}
          user_id={user_id}
          billNumber={billNumber}
          getBillInfo={getBillInfo}
          handleReplyClick={() => this.handleReplyClick()}
        />
        {
          this.props.isAuthenticated &&
          this.state.showReply &&
          <Reply
            handleDiscard={() => this.handleHideReply()}
            handleSubmit={(val) => {
              this.handleHideReply()
              handleReplySubmit(comment.id, val)
            }}
          />
        }
        {
          replies.map((reply) => {
            return (
              <div key={'reply' + reply.id}>
                <div>
                  <p className='comment-text'>{reply.reply}</p>
                </div>
                <div className='row'>
                  <div className='metadata col-md-offset-2'>
                    <p className='username'>{reply.username}</p>
                    <p>{reply.date}</p>
                  </div>
                </div>
                {
                  isAuthenticated
                  && (user_id === comment.user_id)
                  && <DeleteReply
                    reply={reply}
                    billNumber={billNumber}
                    getBillInfo={getBillInfo}/>
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default CommentWithReplies
