import React from 'react'
// import Bill from '../Bill/Bill'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getVotes } from '../../actions/votes.js'

class Vote extends React.Component {
  componentDidMount () {
    this.props.getVotes()
  }

  // handleClick (id) {
  //   this.props.getBills()
  // }

  render () {
    return (
      <div className='votes-container'>
        <p>Bill Number: {this.props.votes.bill_number} </p>
        <p className='votes-for'>Votes For: {this.props.votes.votes_for} </p>
        <p className='votes-against'>Votes Against: {this.props.votes.votes_against} </p>
      </div>
    )
  }
}

// Votes.propTypes = {
//   bills: React.PropTypes.array,
//   getBills: React.PropTypes.func
// }

const mapStateToProps = state => {
  return {
    votes: state.votes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getVotes: (billNumber) => {
      dispatch(getVotes(billNumber))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
