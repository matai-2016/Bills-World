import React from 'react'
import './comment.css'

import EditDeleteComment from '../EditDeleteComment/EditDeleteComment'
import EditCommentInputBox from '../EditCommentInputBox/EditCommentInputBox'

const Comment = props => {
  const {
    comment,
    isAuthenticated,
    user_id,
    handleReplyClick,
    billNumber,
    getBillInfo
  } = props

  return (
    <div>
      <div>
        <p className='comment-text'>{comment.comment}</p>
      </div>
      <div className='row'>
        <div className='metadata col-md-offset-2'>
          <p className='username'>{comment.username}</p>
          <p>{comment.date}</p>
          {
            isAuthenticated &&
            (user_id === comment.user_id) &&
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
    </div>
  )
}

export default Comment
