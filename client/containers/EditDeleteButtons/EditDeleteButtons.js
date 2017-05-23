import React, {Component} from 'react'
import { connect } from 'react-redux'

import './editdeletebuttons.css'

class EditDeleteButtons extends Component {
  render () {
    const { handleEditClick, handleDelete } = this.props
    return (
      <div>
        {
          this.props.auth.isAuthenticated &&
          (this.props.comment.user_id === this.props.userId) &&
          <div>
            <button className='edit-comment-button btn' onClick={() => handleEditClick()}>
              <i className='fa fa-pencil fa-lg' aria-hidden='true' />
            </button>
            <button className='delete-comment-button btn'
              onClick={() => handleDelete()}><i className='fa fa-trash-o fa-lg' aria-hidden='true' />
            </button>
          </div>
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

export default connect(mapStateToProps)(EditDeleteButtons)
