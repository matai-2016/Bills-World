import React from 'react'
import './comment.css'

import EditDelete from '../../containers/EditDelete/EditDelete'
import EditInputBox from '../../containers/EditInputBox/EditInputBox'

const Comment = props => {
  const {
    comment,
    isAuthenticated,
    userId,
    handleReplyClick,
    billNumber,
    getBillInfo,
    handleEditClick,
    handleEditSubmit,
    handleEditDiscard,
    handleDelete,
    showEdit
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
              <EditDelete
                comment={comment}
                billNumber={billNumber}
                getBillInfo={getBillInfo}
                handleEditClick={() => handleEditClick()}
                handleDelete={() => handleDelete(comment.id)} />
              {
                showEdit &&
                <EditInputBox
                  comment={comment}
                  user_id={comment.user_id}
                  billNumber={billNumber}
                  getBillInfo={getBillInfo}
                  handleEditSubmit={(val) => {
                    handleEditDiscard()
                    handleEditSubmit(comment.id, val)
                  }}
                  handleEditDiscard={() => handleEditDiscard()} />
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
