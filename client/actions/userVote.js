import request from 'superagent'
import { userVote, getVotes } from './votes'

export function checkUserVote (clientID, billNumber) {
  return dispatch => {
    return request
      .get(`/votes/${billNumber}/${clientID}`)
      .end((err, res) => {
        if (err) {
          return console.error(err.message, 'Toggle Vote failed')
        }
        dispatch(showUserVote(res.body))
      })
  }
}

export function showUserVote (userVote) {
  return {
    type: 'SHOW_USER_VOTE',
    userVote
  }
}

export function clearUserVote () {
  return {
    type: 'CLEAR_USER_VOTE'
  }
}

export function toggleVote (voteType, clientID, billNumber) {
  return dispatch => {
    return request
      .post('/votes')
      .send({
        voteType: voteType,
        clientID: clientID,
        billNumber: billNumber
      })
      .end((err, res) => {
        if (err) {
          return console.error(err.message, 'Update Vote failed')
        }
        dispatch(showUserVote(res.body))
        dispatch(getVotes(billNumber))
      })
  }
}
