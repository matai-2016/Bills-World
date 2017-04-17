import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'rc-progress'

import { getVotes, toggleVote, checkUserVote } from '../../actions/votes.js'
import './vote.css'

class Vote extends React.Component {
  componentDidMount () {
    this.props.getVotes(this.props.billNumber)
    this.props.checkUserVote(this.props.auth.profile.clientID, this.props.billNumber)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.toggleVote(e.target.name, this.props.auth.profile.clientID, this.props.billInfo.bill_number)
  }

  render () {
    return (
      <div className='votes-container'>
        <div className='voting-bar' >
          {this.props.userVote.votes_for
            ? <button className='voting-button button-for highlight-button-for' onClick={(e) => this.handleClick(e)} type='submit' name='vote-for'>&#8710;</button>
            : <button className='voting-button button-for' onClick={(e) => this.handleClick(e)} type='submit' name='vote-for'>&#8710;</button>
          }
          <button className='votes-for votes-for-container'>{this.props.votes.votes_for}</button>
          <Line className='svg' percent={this.props.votes.percentage_for} strokeWidth='5' trailWidth='5' strokeLinecap='square' strokeColor={'#25ba68'} trailColor={'#FF4E4E'} />
          <button className='votes-against votes-against-container'>{this.props.votes.votes_against}</button>
          {this.props.userVote.votes_against
            ? <button className='voting-button button-against highlight-button-against' onClick={(e) => this.handleClick(e)} type='submit' name='vote-against'>&nabla;</button>
            : <button className='voting-button button-against' onClick={(e) => this.handleClick(e)} type='submit' name='vote-against'>&nabla;</button>
          }
        </div>
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
