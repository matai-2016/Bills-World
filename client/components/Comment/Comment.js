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
    <div className='row comment-section'>
      <div className='col-md-12'>
        <span className='username'>{comment.username}</span>
        <span className='date'>{comment.date}</span>
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
          (user_id === comment.user_id) &&
          <span>
            <EditDeleteComment
              comment={comment}
              billNumber={billNumber}
              getBillInfo={getBillInfo}/>
          {
            <EditCommentInputBox
              comment={comment}
              user_id={comment.user_id}
              billNumber={billNumber}
              getBillInfo={getBillInfo}/>
          }
          </span>
        }
      </div>
    </div>
  )
}

export default Comment
