
import request from 'superagent'

export function getBillInfo(billNumber) {
  return dispatch => {
    return request
      .get(`bill/${billNumber}`)
      .end((err, res) => {
        if (err) {
          return console.error(err.message, 'Receive BillInfo failed')
        }
        dispatch(receiveBillInfo(res.body))
      })
  }
}

export function receiveBillInfo(billInfo) {
  return {
    type: 'RECEIVE_BILL_INFO',
    billInfo
  }
}
