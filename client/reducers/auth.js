import AuthService from '../utils/AuthService'

const initialState = {
  isAuthenticated: !AuthService.isTokenExpired(),
  isFetching: false,
  profile: AuthService.getProfile(),
  error: null
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {...state, isFetching: true, error: null}
    case 'LOGIN_SUCCESS':
      return {...state, isFetching: false, isAuthenticated: true, profile: action.profile}
    case 'LOGIN_ERROR':
      return {...state, isFetching: false, isAuthenticated: false, profile: {}, error: action.error}
    case 'LOGOUT_SUCCESS':
      return {...state, isAuthenticated: false, profile: {}}
    default:
      return state
  }
}
