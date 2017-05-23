import React from 'react'
import { connect } from 'react-redux'

import './editinputbox.css'

class EditInputBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.comment.comment
    }
  }

  handleOnChange (newVal) {
    this.setState({
      value: newVal
    })
  }

  render () {
    const { handleEditSubmit, handleEditDiscard } = this.props
    return (
      <div>
        {
          !!this.props.auth.isAuthenticated &&
          (this.props.userId === this.props.user_id) &&
          <span>
            <textarea
              type='text'
              className='edit-box form-control'
              name='editcomment'
              value={this.state.value}
              onChange={(e) => this.handleOnChange(e.target.value)} />
            <button className='submit-button btn' onClick={() => handleEditSubmit(this.state.value)}>Submit</button>
            <button className='submit-button btn' onClick={() => handleEditDiscard()}><i className='fa fa-times fa-lg' aria-hidden='true' /></button>
          </span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.profile.user_id,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(EditInputBox)
