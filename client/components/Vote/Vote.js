import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'rc-progress'

import { getVotes } from '../../actions/votes.js'
import { toggleVote, checkUserVote } from '../../actions/userVote.js'
import './vote.css'

class Vote extends React.Component {
  componentDidMount () {
    this.props.getVotes(this.props.billNumber)
    if (this.props.auth.isAuthenticated) {
      this.props.checkUserVote(this.props.auth.profile.user_id, this.props.billNumber)
    }
  }

  handleClick (e) {
    e.preventDefault()
    this.props.toggleVote(e.target.name, this.props.auth.profile.user_id, this.props.billInfo.bill_number)
    // this.props.getVotes(this.props.billNumber)
  }

  render () {
    return (
      <div className='votes-container'>
        <div className='voting-bar' >
          {this.props.auth.isAuthenticated &&
            <span>
              {this.props.userVote.votes_for
                ? <button className='voting-button button-for highlight-button-for' onClick={(e) => this.handleClick(e)} type='submit' name='vote-for'>&#8710;</button>
                : <button className='voting-button button-for' onClick={(e) => this.handleClick(e)} type='submit' name='vote-for'>&#8710;</button>
              }
            </span>
          }
          <div className='voting-button' style={{width: '150px'}}>
            <button className='votes-for votes-for-container'>{this.props.votes.votes_for}</button>
            <Line className='svg' percent={this.props.votes.percentage_for} strokeWidth='5' trailWidth='5' strokeLinecap='square' strokeColor={'#25ba68'} trailColor={'#FF4E4E'} />
            <button className='votes-against votes-against-container'>{this.props.votes.votes_against}</button>
          </div>
          {this.props.auth.isAuthenticated &&
            <span>
              {this.props.userVote.votes_against
                ? <button className='voting-button button-against highlight-button-against' onClick={(e) => this.handleClick(e)} type='submit' name='vote-against'>&nabla;</button>
                : <button className='voting-button button-against' onClick={(e) => this.handleClick(e)} type='submit' name='vote-against'>&nabla;</button>
              }
            </span>
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
    toggleVote: (voteType, userId, billNumber) => {
      dispatch(toggleVote(voteType, userId, billNumber))
    },
    checkUserVote: (userId, billNumber) => {
      dispatch(checkUserVote(userId, billNumber))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
