import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import './discussion.css'

import { getComments, updateCommentForm, saveComment, clearInputBox } from '../../actions/comments.js'

class Discussion extends Component {
  render () {
    return (
      <div>
        <input type='text' className='comment-input' name='comment' placeholder='Share your views here' value={this.props.activeComment} onChange={(e) => this.props.updateCommentForm(e.target.name, e.target.value)} />
        <button onClick={(event) => this.handleSubmit(event)}>Submit</button>
        <div>
          {
          this.props.comments.map((comment, i) => {
            return (
              <div key={i}>{comment.comment}</div>
            )
          })
        }
        </div>
      </div>
    )
  }
  handleSubmit (event) {
    const clientID = this.props.clientID
    const billNumber = this.props.billNumber
    const activeComment = this.props.activeComment
    const commentDetails = { clientID: clientID, billNumber: billNumber, comment: activeComment }
    this.props.saveComment(commentDetails)
    .then(this.props.getBillInfo.bind(null, billNumber))
    .then(this.props.clearInputBox)
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
  }
}

Discussion.propTypes = {
  billNumber: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    clientID: state.auth.clientID,
    activeComment: state.activeComment.comment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (billNumber) => {
      return dispatch(getComments(billNumber))
    },
    updateCommentForm: (name, value) => {
      return dispatch(updateCommentForm(name, value))
    },
    saveComment: (commentDetails) => {
      return dispatch(saveComment(commentDetails))
    },
    clearInputBox: () => {
      return dispatch(clearInputBox())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
