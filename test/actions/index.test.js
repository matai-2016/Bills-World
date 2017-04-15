import test from 'ava'
import {loginRequest} from '../../client/actions/index.js'

test('loginRequest returns object with type LOGIN_REQUEST', t => {
  t.deepEqual(loginRequest(), { type: 'LOGIN_REQUEST' })
})
