import React, {Component} from 'react'
import { connect } from 'react-redux'

import { deleteReply } from '../../actions/replies.js'

import './deletereply.css'

class DeleteReply extends Component {
  render () {
    return (
      <div>
        {
          this.props.auth.isAuthenticated
          && (this.props.reply.user_id === this.props.userId)
          && <div>
            <button className='delete-reply-button btn'
              onClick={(e) => this.handleDelete(e)}><i className='fa fa-trash-o fa-lg' aria-hidden='true'></i>
            </button>
          </div>
        }
      </div>
    )
  }

  handleDelete (e) {
    const billNumber = this.props.billNumber
    const userId = this.props.userId
    const replyId = this.props.reply.id
    const replyDetails = { user_id: userId, reply_id: replyId, billNumber: billNumber }
    this.props.deleteReply(replyDetails)
    .then(this.props.getBillInfo.bind(null, billNumber))
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.profile.user_id,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteReply: (replyDetails) => {
      return dispatch(deleteReply(replyDetails))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteReply)
