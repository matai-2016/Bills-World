
import request from 'superagent'

export function getBillInfo (billNumber) {
  return dispatch => {
    return request
      .get(`bill/${billNumber}`)
      .then((res) => dispatch(receiveBillInfo(res.body)))
  }
}

export function receiveBillInfo (billInfo) {
  return {
    type: 'RECEIVE_BILL_INFO',
    billInfo
  }
}
