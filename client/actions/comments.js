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

export function editComment (commentDetails) {
  return dispatch => {
    return request
      .put('/comments/edit')
      .set({ 'Content-Type': 'application/json' })
      .send(commentDetails)
      .catch(err => {
        return console.error(err.response.body)
      })
  }
}

export function deleteComment (commentDetails) {
  return dispatch => {
    return request
    .delete('/comments/delete')
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

export function updateCommentForm (name, value, commentId) {
  return {
    type: 'UPDATE_COMMENT_FORM',
    name,
    value
  }
}

export function updateEditForm (name, value, commentId) {
  return {
    type: 'UPDATE_EDIT_FORM',
    name,
    value,
    commentId
  }
}

export function clearEditForm () {
  return {
    type: 'CLEAR_EDIT_BOX'
  }
}

export function toggleEditCommentBox (commentId) {
  return {
    type: 'TOGGLE_EDIT_COMMENT_BOX',
    commentId
  }
}
