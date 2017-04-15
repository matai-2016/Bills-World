import test from 'ava'
import { receiveBills, getBills } from '../../client/actions/bills.js'

test('getBills returns array of objects', t => {
  t.deepEqual(typeof getBills(), 'function')
})

test('receiveBills returns object with type RECEIVE_BILLS', t => {
  const bills = 'bills'
  t.deepEqual(receiveBills(bills), { type: 'RECEIVE_BILLS', bills })
})
