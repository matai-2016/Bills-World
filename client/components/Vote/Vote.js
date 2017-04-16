import React from 'react'
// import Bill from '../Bill/Bill'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getVotes, toggleVote, checkUserVote } from '../../actions/votes.js'

class Vote extends React.Component {
  componentDidMount () {
    this.props.getVotes(this.props.billNumber)
    console.log(this.props.billNumber)
    this.props.checkUserVote(this.props.auth.profile.clientID, this.props.billNumber)
  }

  handleClick (e) {
    e.preventDefault()
    console.log('This is it: ', e.target.name, this.props.auth.profile.clientID, this.props.billInfo.bill_number)
    this.props.toggleVote(e.target.name, this.props.auth.profile.clientID, this.props.billInfo.bill_number)
  }

  render () {
    return (
      <div className='votes-container'>
        <p>User vote for: {this.props.userVote.votes_for} </p>
        <p>User vote against: {this.props.userVote.votes_against} </p>
        <p className='votes-for'>Votes For: {this.props.votes.votes_for} </p>
        <p className='votes-against'>Votes Against: {this.props.votes.votes_against} </p>
        <p className='votes-percentage-for'>Percentage For: {this.props.votes.percentage_for}%</p>
        <p className='votes-percentage-against'>Percentage Against: {this.props.votes.percentage_against}%</p>
        <button onClick={(e) => this.handleClick(e)} type='submit' name='vote-for'>Vote Up</button>
        <button onClick={(e) => this.handleClick(e)} type='submit' name='vote-against'>Vote Down</button>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    billInfo: state.billInfo,
    votes: state.votes,
    auth: state.auth,
    userVote: state.userVote
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getVotes: (billNumber) => {
      dispatch(getVotes(billNumber))
    },
    toggleVote: (voteType, clientID, billNumber) => {
      dispatch(toggleVote(voteType, clientID, billNumber))
    },
    checkUserVote: (clientID, billNumber) => {
      dispatch(checkUserVote(clientID, billNumber))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
