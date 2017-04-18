import request from 'superagent'

export function createReply (parentId) {
  return {
    type: 'CREATE_REPLY',
    parentId
  }
}

export function updateReplyForm (name, value) {
  return {
    type: 'UPDATE_REPLY_FORM',
    name,
    value
  }
}

export function saveReply (replyDetails) {
  return dispatch => {
    return request
      .post('/replies/save')
      .set({ 'Content-Type': 'application/json' })
      .send(replyDetails)
      .catch(err => {
        return console.error(err.response.body)
      })
  }
}
