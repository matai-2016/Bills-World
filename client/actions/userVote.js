import request from 'superagent'
import { getVotes } from './votes'

export function checkUserVote (user_id, billNumber) {
  return dispatch => {
    request
      .get('https://billsworld.au.auth0.com/authorize')
      .query({
        audience: 'http://www.billsworld.co.nz',
        response_type: 'token',
        prompt: 'none',
        client_id: '-zHN7yxG__Z4IN8lE86JwIgHXJMjpIPN'
      })
      .end((error, response) => {
        if (error) {
          return console.error(error.message)
        }
        console.log(response.body)
        return request
          .get(`/votes/${billNumber}/${user_id}`)
          .end((err, res) => {
            if (err) {
              return console.error(err.message, 'Toggle Vote failed')
            }
            dispatch(showUserVote(res.body))
          })
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

export function toggleVote (voteType, user_id, billNumber) {
  return dispatch => {
    return request
      .post('/votes')
      .send({
        voteType: voteType,
        user_id: user_id,
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
