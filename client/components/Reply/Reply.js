import React from 'react'
import './reply.css'

import EditDelete from '../../containers/EditDelete/EditDelete'
import EditInputBox from '../../containers/EditInputBox/EditInputBox'

const Reply = props => {
  const {
    reply,
    isAuthenticated,
    userId,
    billNumber,
    getBillInfo,
    handleEditClick,
    handleEditSubmit,
    handleEditDiscard,
    handleDelete,
    showEdit
  } = props

  if (reply.deleted) {
    return (
      <div className='reply-text'>
        <span className='date'>{reply.deleted}</span>
        <p>Comment deleted</p>
      </div>
    )
  }
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
          <EditDelete
            comment={reply}
            billNumber={billNumber}
            getBillInfo={getBillInfo}
            handleEditClick={() => handleEditClick()}
            handleDelete={() => handleDelete(reply.id)}
             />
          {
          showEdit &&
          <EditInputBox
            comment={reply}
            user_id={reply.user_id}
            billNumber={billNumber}
            getBillInfo={getBillInfo}
            handleEditSubmit={(val) => {
              handleEditDiscard()
              handleEditSubmit(reply.id, val)
            }}
            handleEditDiscard={() => this.handleEditDiscard()}
             />
           }
        </span>
      }
    </div>
  )
}

export default Reply
