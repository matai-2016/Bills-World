import request from 'superagent'
import { getBillInfo } from './billInfo'

import AuthService from '../utils/AuthService'

export function saveReply (replyDetails) {
  return dispatch => {
    return request
      .post('/replies/save')
      .set({ 'Content-Type': 'application/json' })
      .set('Authorization', `Bearer ${AuthService.getToken()}`)
      .send(replyDetails)
      .then(() => dispatch(getBillInfo(replyDetails.billNumber)))
      .catch(err => {
        return console.error(err.response.body)
      })
  }
}

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

export function clearReplyBox () {
  return {
    type: 'CLEAR_REPLY_BOX'
  }
}

export function deleteReply (replyDetails) {
  return dispatch => {
    return request
    .delete('/replies/delete')
    .set('Authorization', `Bearer ${AuthService.getToken()}`)
    .set({ 'Content-Type': 'application/json' })
    .send(replyDetails)
    .catch(err => {
      return console.error(err.response.body)
    })
  }
}

export function editReply (replyDetails) {
  return dispatch => {
    return request
      .put('/replies/edit')
      .set('Authorization', `Bearer ${AuthService.getToken()}`)
      .set({ 'Content-Type': 'application/json' })
      .send(replyDetails)
      .catch(err => {
        return console.error(err.response.body)
      })
  }
}

export function updateEditReplyForm (name, value, replyId) {
  return {
    type: 'UPDATE_EDIT_REPLY_FORM',
    name,
    value,
    replyId
  }
}

export function toggleEditReplyBox (replyId) {
  return {
    type: 'TOGGLE_EDIT_REPLY_BOX',
    replyId
  }
}

export function clearEditReplyForm () {
  return {
    type: 'CLEAR_EDIT_REPLY_BOX'
  }
}
