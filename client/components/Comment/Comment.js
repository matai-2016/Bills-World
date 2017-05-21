import React from 'react'
import './comment.css'

import EditDeleteComment from '../../containers/EditDeleteComment/EditDeleteComment'
import EditCommentInputBox from '../../containers/EditCommentInputBox/EditCommentInputBox'

const Comment = props => {
  const {
    comment,
    isAuthenticated,
    userId,
    handleReplyClick,
    billNumber,
    getBillInfo
  } = props

  if (comment.deleted == null) {
    return (
      <div className='row comment-section'>
        <div className='col-md-12'>
          <span className='username'>{comment.username}</span>
          <span className='date'>{comment.date}</span>
          {
            comment.edited &&
              <span className='date'> (edited)</span>
          }
          <p>{comment.comment}</p>
        </div>
        <div>
          {
            isAuthenticated &&
            <button
              className='reply-button btn'
              onClick={() => handleReplyClick()}>
              <i className='fa fa-reply fa-lg' aria-hidden='true' />
            </button>
          }
        </div>
        <div>
          {
            isAuthenticated &&
            (userId === comment.user_id) &&
            <span>
              <EditDeleteComment
                comment={comment}
                billNumber={billNumber}
                getBillInfo={getBillInfo} />
              {
                <EditCommentInputBox
                  comment={comment}
                  user_id={comment.user_id}
                  billNumber={billNumber}
                  getBillInfo={getBillInfo} />
            }
            </span>
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className='row comment-section'>
        <div className='col-md-12'>
          <span className='date'>{comment.deleted}</span>
          <p>Comment deleted</p>
        </div>
        <div>
          {
            isAuthenticated &&
            <button
              className='reply-button btn'
              onClick={() => handleReplyClick()}>
              <i className='fa fa-reply fa-lg' aria-hidden='true' />
            </button>
          }
        </div>
      </div>
    )
  }
}

export default Comment
