import React, { Component } from 'react'
import { connect } from 'react-redux'
import './discussion.css'

import { updateCommentForm, saveComment } from '../../actions/comments.js'

class Discussion extends Component {
  render () {
    const errorMessage = this.props.message

        <div>
          <input type='text' className='comment-input' name='comment'  placeholder='Share your views here' onChange={(e) => this.props.updateCommentForm(e.target.name, e.target.value)}/>
          <button onClick={(event) => this.handleSubmit(event)}>Submit</button

        {errorMessage &&
          <p>{errorMessage}</p>
        }
        {

        }
      </div>
    )
  }
handleSubmit (event) {
    const clientID = this.props.clientID
    const comment = this.props.comment
    const commentDetails = { clientID: clientID, comment: comment }
    this.props.saveComment(commentDetails).then(() => {
      displayComments(this.props.commentList)
    })
  }
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
    updateCommentForm: (name, value) => {
      return dispatch(updateCommentForm(name, value))
    },
    saveComment: (commentDetails) => {
      return dispatch(saveComment(commentDetails))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)

