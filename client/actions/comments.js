import request from 'superagent'

export function saveComment (commentDetails) {
  return dispatch => {
    return request.post('/comments')
      .set({ 'Content-Type': 'application/json' })
      .send(commentDetails)
      .then((res) => {
        console.log(res.body)
        dispatch(updateCommentList(res.body))
      }).catch(err => {
        return console.error(err.response.body)
      })
  }
}

export function updateCommentList (comments) {
  return {
    type: 'UPDATE_COMMENT_LIST',
    comments
  }
}

export function updateCommentForm (name, value) {
  return {
    type: 'UPDATE_COMMENT_FORM',
    name,
    value
  }
}
