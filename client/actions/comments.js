import request from 'superagent'

export function saveComment (commentDetails) {
  return dispatch => {
    return request
      .post('/comments/save')
      .set({ 'Content-Type': 'application/json' })
      .send(commentDetails)
      .catch(err => {
        return console.error(err.response.body)
      })
  }
}

export function clearInputBox () {
  return {
    type: 'CLEAR_INPUT_BOX'
  }
}

export function updateCommentForm (name, value) {
  return {
    type: 'UPDATE_COMMENT_FORM',
    name,
    value
  }
}
