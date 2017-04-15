import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import './discussion.css'

import { getComments, updateCommentForm, saveComment } from '../../actions/comments.js'

class Discussion extends Component {
  componentDidMount (){
    this.props.getComments(this.props.billNumber)
  }
  render () {
    const errorMessage = this.props.message
    
    return (
      <div>
        <input type='text' className='comment-input' name='comment' placeholder='Share your views here' onChange={(e) => this.props.updateCommentForm(e.target.name, e.target.value)} />
        <button onClick={(event) => this.handleSubmit(event)}>Submit</button>
        <div>
        {
          this.props.commentList.map((comment, i) => {
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
    const comment = this.props.comment
    const commentDetails = { clientID: clientID, billNumber: billNumber, comment: comment }
    this.props.saveComment(commentDetails).then(() => {
      this.props.getComments(this.props.billNumber)
    }).catch((err) => {
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
    comment: state.comments.comment,
    commentList: state.comments.commentList
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
