import test from 'ava'
import { loginRequest, loginSuccess, loginError, logoutSuccess } from '../../client/actions/index.js'

test('loginRequest returns object with type LOGIN_REQUEST', t => {
  t.deepEqual(loginRequest(), { type: 'LOGIN_REQUEST' })
})

test('loginSuccess returns object with type LOGIN_SUCCESS', t => {
  const profile = 'profile'
  t.deepEqual(loginSuccess(profile), { type: 'LOGIN_SUCCESS', profile })
})

test('loginError returns object with type LOGIN_ERROR', t => {
  const error = 'error'
  t.deepEqual(loginError(error), { type: 'LOGIN_ERROR', error })
})

test('logoutSuccess returns object with type LOGOUT_SUCCESS', t => {
  t.deepEqual(logoutSuccess(), { type: 'LOGOUT_SUCCESS' })
})
