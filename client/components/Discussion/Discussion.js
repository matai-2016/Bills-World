import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReportAbuse from '../ReportAbuse/ReportAbuse'
import './discussion.css'
import Reply from '../Reply/Reply'

import { updateCommentForm, saveComment, clearInputBox, createReply } from '../../actions/comments.js'
import moment from 'moment'

class Discussion extends Component {
  render () {
    return (
      <div>
        <h3 className='comments-title'>Comments</h3>
        {
          this.props.isAuthenticated &&
          <span>
            <div className='form-group row'>
              <textarea type='text' className='input-box form-control' name='comment' placeholder='Share your views here' value={this.props.activeComment} onChange={(e) => this.props.updateCommentForm(e.target.name, e.target.value)}>
              </textarea>
              <button className='submit-button btn' onClick={(event) => this.handleSubmit(event)}>Submit</button>
            </div>
          </span>
        }
        {
          !this.props.isAuthenticated &&
          <span>
            <p className='login-prompt'>Please login or register to comment on this thread</p>
          </span>
        }
        <div>
          {
          this.props.comments.map((item) => {
            return (
              <div key={item.id} className='comment'>
                <div>
                  <p className='comment-text'>{item.comment}</p>
                </div>
                <div className='row'>
                  <div className='metadata col-md-offset-2'>
                    <p className='username'>{item.username}</p>
                    <p>{item.date}</p>
                    <button name={item.id} onClick={(e) => this.reply(e.target.name)}>Reply</button>

                  </div>
                </div>
                <hr/>
              </div>
            )
          })
        }
        </div>
        <ReportAbuse />
      </div>
    )
  }
  handleSubmit () {
    const date = moment(new Date()).format('DD-MM-YYYY h:mm a')
    const username = this.props.username
    const user_id = this.props.user_id
    const billNumber = this.props.billNumber
    const activeComment = this.props.activeComment
    const commentDetails = { date: date, username: username, user_id: user_id, billNumber: billNumber, comment: activeComment }
    this.props.saveComment(commentDetails)
    .then(this.props.getBillInfo.bind(null, billNumber))
    .then(this.props.clearInputBox)
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
  }
  reply (parentId) {
    this.props.createReply(parentId)
  }
}

Discussion.propTypes = {
  billNumber: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.profile.user_id,
    username: state.auth.profile.username,
    activeComment: state.activeComment.comment,
    replying: state.activeReply.replying,
    parentId: state.activeReply.parentId,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCommentForm: (name, value) => {
      return dispatch(updateCommentForm(name, value))
    },
    saveComment: (commentDetails) => {
      return dispatch(saveComment(commentDetails))
    },
    clearInputBox: () => {
      return dispatch(clearInputBox())
    },
    createReply: (parentId) => {
      return dispatch(createReply(parentId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)
