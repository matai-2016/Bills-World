import test from 'ava'

import billInfo from '../../client/reducers/billInfo.js'
import { receiveBillInfo } from '../../client/actions/billInfo.js'

test('billInfo returns state provided through action', t => {
  const beforeState = {
    title: 'bill number one',
    bill_number: '123-4',
    member_in_charge: 'Hon Amy Adams'
  }

  const afterState = {
    title: 'bill number two',
    bill_number: '234-5',
    member_in_charge: 'Hon John Stuart'
  }

  const action = receiveBillInfo(
    {
      title: 'bill number two',
      bill_number: '234-5',
      member_in_charge: 'Hon John Stuart'
    }
  )
  t.deepEqual(billInfo(beforeState, action), afterState)
})
