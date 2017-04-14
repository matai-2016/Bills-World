import request from 'superagent'
import AuthService from '../utils/AuthService'

export function testButton () {
  return {
    type: 'TEST_BUTTON'
  }
}
const authService = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN)

// Listen to authenticated event from AuthService and get the profile of the user
// Done on every page startup
export function checkLogin (history) {
  return (dispatch) => {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', (authResult) => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) { return dispatch(loginError(error)) }
        AuthService.setToken(authResult.idToken) // static method
        AuthService.setProfile(profile) // static method
        dispatch(checkUserInDatabase(profile))
        return dispatch(loginSuccess(history, profile))
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', (error) => dispatch(loginError(error)))
  }
}

export function checkUserInDatabase (profile) {
  return dispatch => {
    const clientID = profile.clientID
    return request
    .get(`/auth/${clientID}`)
    .end((err, res) => {
      if (err) {
        console.error(err.message)
        return
      }
      if (res.body.message === 'User does not exist') {
        dispatch(addUserToDatabase(profile))
      }
    })
  }
}

export function addUserToDatabase (profile) {
  return dispatch => {
    return request
    .post('/auth/register')
    .send(profile)
    .end((err, res) => {
      if (err) {
        console.error(err.message)
        return
      }
      console.log('User has been added to database')
    })
  }
}

export function loginRequest () {
  authService.login()
  return {
    type: 'LOGIN_REQUEST'
  }
}

export function loginSuccess (history, profile) {
  history.push('/')
  return {
    type: 'LOGIN_SUCCESS',
    profile
  }
}

export function loginError (error) {
  return {
    type: 'LOGIN_ERROR',
    error
  }
}

export function logoutSuccess (history) {
  authService.logout()
  history.push('/')
  return {
    type: 'LOGOUT_SUCCESS'
  }
}
