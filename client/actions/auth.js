import { loginSuccess, checkUserInDatabase, loginError, loginRequest, logoutSuccess } from './index'
import AuthService from '../utils/AuthService'

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
        return dispatch(registerLoginSuccess(history, profile))
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', (error) => dispatch(loginError(error)))
  }
}

export function createLoginRequest () {
  authService.login()
  return loginRequest()
}

export function registerLoginSuccess (history, profile) {
  history.push('/')
  return loginSuccess(profile)
}

export function registerLogoutSuccess (history) {
  authService.logout()
  history.push('/')
  return logoutSuccess(history)
}
