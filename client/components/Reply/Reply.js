import React, { Component } from 'react'
import './reply.css'

import EditDeleteButtons from '../../containers/EditDeleteButtons/EditDeleteButtons'
import EditInputBox from '../../containers/EditInputBox/EditInputBox'

class Reply extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showEdit: false
    }
  }
  handleEditClick () {
    this.setState({ showEdit: true })
  }
  handleEditDiscard () {
    this.setState({ showEdit: false })
  }
  render () {
    const {
    reply,
    isAuthenticated,
    userId,
    billNumber,
    getBillInfo,
    handleEditSubmit,
    handleDelete
  } = this.props

    if (reply.deleted) {
      return (
        <div className='row reply-section' key={'reply' + reply.id}>
          <div className='reply-text'>
            <span className='date'>{reply.deleted}</span>
            <p>Comment deleted</p>
          </div>
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
            <EditDeleteButtons
              comment={reply}
              billNumber={billNumber}
              getBillInfo={getBillInfo}
              handleEditClick={() => this.handleEditClick()}
              handleDelete={() => handleDelete(reply.id)}
               />
            {
            this.state.showEdit &&
            <EditInputBox
              comment={reply}
              user_id={reply.user_id}
              billNumber={billNumber}
              getBillInfo={getBillInfo}
              handleEditSubmit={(val) => {
                this.handleEditDiscard()
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
}

export default Reply
