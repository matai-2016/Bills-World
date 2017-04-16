import test from 'ava'

import bills from '../../client/reducers/bills.js'
import { receiveBills } from '../../client/actions/bills.js'
//
test('bills returns state and replaces it following action', t => {
  const beforeState = {
    title: 'bill number one',
    bill_number: '123-4',
    member_in_charge: 'Hon Amy Adams'
  }

  const afterState = {
    title: 'lets create conditions for equity',
    bill_number: '987-6',
    member_in_charge: 'Jacinda Arden'
  }

  const action = receiveBills(
    {
      title: 'lets create conditions for equity',
      bill_number: '987-6',
      member_in_charge: 'Jacinda Arden'
    }
  )
  t.deepEqual(bills(beforeState, action), afterState)
})
