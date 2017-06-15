import React, {Component} from 'react'
import { connect } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'

import './editdeletebuttons.css'

class EditDeleteButtons extends Component {
  constructor (props) {
    super(props)

    this.state = {
      alert: null
    }
  }

  confirmDelete (handleDelete) {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        title='Just a second...'
        confirmBtnText='Yes, delete it!'
        confirmBtnBsStyle='danger'
        cancelBtnBsStyle='default'
        onConfirm={() => this.deleteComment()}
        onCancel={() => this.cancelDelete()}
      >
        Are you sure you want to delete this?
      </SweetAlert>
    )
    this.setState({
      alert: getAlert()
    })
  }

  deleteComment () {
    this.setState({
      alert: null
    })
    this.props.handleDelete()
  }

  cancelDelete () {
    this.setState({
      alert: null
    })
  }

  render () {
    const { handleEditClick } = this.props
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
              onClick={() => this.confirmDelete()}><i className='fa fa-trash-o fa-lg' aria-hidden='true' />
            </button>
            {this.state.alert}
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
