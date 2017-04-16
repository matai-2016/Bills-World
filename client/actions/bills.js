
import request from 'superagent'

export function getBills () {
  return dispatch => {
    return request
      .get('/bills')
      .end((err, res) => {
        if (err) {
          return console.error(err.message, 'Receive Bills failed')
        }
        dispatch(receiveBills(res.body))
      })
  }
}

export function receiveBills (bills) {
  return {
    type: 'RECEIVE_BILLS',
    bills
  }
}
