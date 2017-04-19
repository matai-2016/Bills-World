import test from 'ava'
import { loginRequest, loginSuccess, loginError, logoutSuccess } from '../../client/actions/index.js'

test('loginRequest returns object with type LOGIN_REQUEST', t => {
  const actual = loginRequest()
  const expected = { type: 'LOGIN_REQUEST' }
  t.deepEqual(actual, expected)
})

test('loginSuccess returns object with type LOGIN_SUCCESS', t => {
  const profile = 'profile'
  const actual = loginSuccess(profile)
  const expected = { type: 'LOGIN_SUCCESS', profile }
  t.deepEqual(actual, expected)
})

test('loginError returns object with type LOGIN_ERROR', t => {
  const error = 'error'
  const actual = loginError(error)
  const expected = { type: 'LOGIN_ERROR', error }
  t.deepEqual(actual, expected)
})

test('logoutSuccess returns object with type LOGOUT_SUCCESS', t => {
  const actual = logoutSuccess()
  const expected = { type: 'LOGOUT_SUCCESS' }
  t.deepEqual(actual, expected)
})
