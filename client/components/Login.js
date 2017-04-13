import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { testButton } from '../actions'

class Login extends Component {
  render () {
    return (
      <div>
        <h4>[Login]</h4> <br />
        <button onClick={() => this.props.testButton()} >
        Redux Test Button
        </button>
        {this.props.clicked && <h4>Redux is working!</h4>}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    testButton: () => {
      return dispatch(testButton())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    clicked: state.test.clicked
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
