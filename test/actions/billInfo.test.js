import test from 'ava'
import { receiveBillInfo } from '../../client/actions/billInfo.js'

test('receiveBillInfo returns object with type RECEIVE_BILL_INFO', t => {
  const billInfo = 'billInfo'
  t.deepEqual(receiveBillInfo(billInfo), { type: 'RECEIVE_BILL_INFO', billInfo })
})
