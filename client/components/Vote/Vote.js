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
      <div className='votes-container container'>
        <div className='row'>
          <div className='buttons col-xs-3'>
            {this.props.auth.isAuthenticated &&
              <span>
                {this.props.userVote.votes_for
                  ? <button className='voting-button button-for highlight-button-for' onClick={(e) => this.handleClick(e)} type='submit' name='vote-for'>Hi</button>
                  : <button className='voting-button button-for' onClick={(e) => this.handleClick(e)} type='submit' name='vote-for'>Hi</button>
                }
              </span>
            }
            {this.props.auth.isAuthenticated &&
              <span>
                {this.props.userVote.votes_against
                  ? <button className='voting-button button-against highlight-button-against' onClick={(e) => this.handleClick(e)} type='submit' name='vote-against'>&nabla;</button>
                  : <button className='voting-button button-against' onClick={(e) => this.handleClick(e)} type='submit' name='vote-against'>&nabla;</button>
                }
              </span>
            }
          </div>
          <div className='line-and-total col-xs-9'>
            <p className='votes-for votes-for-container'>{this.props.votes.votes_for}</p>
            <Line className='voting-bar' percent={this.props.votes.percentage_for} strokeWidth='6' trailWidth='6' strokeLinecap='square' strokeColor={'#13B240'} trailColor={'#FF4E4E'} />
            <p className='votes-against votes-against-container'>{this.props.votes.votes_against}</p>
          </div>
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
