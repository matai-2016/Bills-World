import React from 'react'
import { calculatePercentage } from '../../utils/calculations'
// import Bill from '../Bill/Bill'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getVotes } from '../../actions/votes.js'

class Vote extends React.Component {
  componentDidMount () {
    this.props.getVotes('223-1')
  }

  render () {
    return (
      <div className='votes-container'>
        <p className='votes-for'>Votes For: {this.props.votes.votes_for} </p>
        <p className='votes-against'>Votes Against: {this.props.votes.votes_against} </p>
        <p className='votes-result'>Percentage: {this.props.percentage}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    billInfo: state.billInfo,
    votes: state.votes,
    percentage: calculatePercentage(state.votes.votes_for, state.votes.votes_against)
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
