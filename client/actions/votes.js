import request from 'superagent'

export function getVotes (billNumber) {
  return dispatch => {
    return request
      .get(`/votes/${billNumber}`)
      .end((err, res) => {
        if (err) {
          return console.error(err.message, 'Receive Votes failed')
        }
        dispatch(receiveVotes(res.body))
      })
  }
}

export function receiveVotes (votes) {
  return {
    type: 'RECEIVE_VOTES',
    votes
  }
}
