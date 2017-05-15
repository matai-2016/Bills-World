import request from 'superagent'
import { getBillInfo } from './billInfo'

import AuthService from '../utils/AuthService'

export function updateEditReplyForm (value, replyId) {
  return {
    type: 'UPDATE_EDIT_REPLY_FORM',
    value,
    replyId
  }
}

export function toggleEditReplyBox (replyId) {
  return {
    type: 'TOGGLE_EDIT_REPLY_FORM',
    replyId
  }
}

export function clearEditReplyForm () {
  return {
    type: 'CLEAR_EDIT_REPLY_FORM'
  }
}
