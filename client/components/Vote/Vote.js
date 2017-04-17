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
        <span className='votes-against'>{this.props.votes.votes_for} </span>
        {this.props.auth.isAuthenticated &&
          <span className='voting-component'>
            {this.props.userVote.voted_for
              ? <button onClick={(e) => this.handleClick(e)} type='submit' name='vote-for' className='btn btn-default voting-button highlight-button'>&#8710;</button>
              : <button className='btn btn-default voting-button' onClick={(e) => this.handleClick(e)} type='submit' name='vote-for'>&#8710;</button>
            }
          </span>
        }
        <div className='voting-button' style={{width: '150px'}}>
          <Line percent={this.props.votes.percentage_for} strokeWidth='6' strokeColor={'#210708'} />
        </div>
        {this.props.auth.isAuthenticated &&
          <span className='voting-component'>
            {this.props.userVote.voted_against
              ? <button onClick={(e) => this.handleClick(e)} type='submit' name='vote-against' className='btn btn-default voting-button highlight-button'>&nabla;</button>
              : <button className='btn btn-default voting-button' onClick={(e) => this.handleClick(e)} type='submit' name='vote-against'>&nabla;</button>
            }
          </span>
        }
        <span className='votes-for'>{this.props.votes.votes_against}</span>
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
    toggleVote: (voteType, user_id, billNumber) => {
      dispatch(toggleVote(voteType, user_id, billNumber))
    },
    checkUserVote: (user_id, billNumber) => {
      dispatch(checkUserVote(user_id, billNumber))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
