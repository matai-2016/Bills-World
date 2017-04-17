import request from 'superagent'

export function checkUserInDatabase (profile) {
  return dispatch => {
    const user_id = profile.user_id
    return request
    .get(`/auth/${user_id}`)
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
    })
  }
}

export function loginRequest () {
  return {
    type: 'LOGIN_REQUEST'
  }
}

export function loginSuccess (profile) {
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
  return {
    type: 'LOGOUT_SUCCESS'
  }
}
