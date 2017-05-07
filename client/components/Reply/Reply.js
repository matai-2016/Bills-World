import React, {Component} from 'react'
import './reply.css'
import moment from 'moment'

import { updateReplyForm, saveReply, clearReplyBox } from '../../actions/replies.js'
import { clearInputBox } from '../../actions/comments.js'

class Reply extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }

  handleOnChange (newVal) {
    this.setState({
      value: newVal
    })
  }

  render () {
    const { handleDiscard, handleSubmit } = this.props
    return (
      <div className='row'>
        <textarea
          type='text'
          className='input-box form-control'
          name='activeReply'
          placeholder='Reply here'
          value={this.state.value}
          onChange={(e) => this.handleOnChange(e.target.value)}
          />
        {
            this.state.value
              ? <button className='reply-submit-button btn' onClick={() => handleSubmit(this.state.value)}>Submit</button>
              : <button disabled className='reply-submit-button btn'>Submit</button>
          }
        <button
          className='reply-discard-button btn'
          onClick={() => handleDiscard()}>
          <i className='fa fa-times fa-lg' aria-hidden='true' />
        </button>
      </div>
    )
  }
}

export default Reply
