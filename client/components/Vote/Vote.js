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
        {this.props.votes.votes_for || this.props.votes.votes_against
          ? <div>
              <p className='votes-for'>Votes For: {this.props.votes.votes_for} </p>
              <p className='votes-against'>Votes Against: {this.props.votes.votes_against} </p>
              <p className='votes-percentage-for'>Percentage For: {this.props.votes.percentage_for}%</p>
              <p className='votes-percentage-against'>Percentage Against: {this.props.votes.percentage_against}%</p>
            </div>
          : null
        }
        {this.props.auth.isAuthenticated &&
          <div>
            {this.props.userVote.votes_for
              ? <button className='voting-button' onClick={(e) => this.handleClick(e)} type='submit' name='vote-for' className='btn btn-default highlight-button'>&#8710;</button>
              : <button className='voting-button' onClick={(e) => this.handleClick(e)} type='submit' name='vote-for'>&#8710;</button>
            }
            <div className='voting-button' style={{width: '150px'}}>
              <Line percent={this.props.votes.percentage_for} strokeWidth="6" strokeColor={'#210708'} />
            </div>
            {this.props.userVote.votes_against
              ? <button className='voting-button' onClick={(e) => this.handleClick(e)} type='submit' name='vote-against' className='btn btn-default highlight-button'>&nabla;</button>
              : <button className='voting-button' onClick={(e) => this.handleClick(e)} type='submit' name='vote-against'>&nabla;</button>
            }
          </div>
        }
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
