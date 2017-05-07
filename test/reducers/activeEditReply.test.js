import test from 'ava'

import activeEditReply from '../../client/reducers/activeEditReply.js'
import { updateEditReplyForm, clearEditReplyForm, toggleEditReplyBox } from '../../client/actions/replies.js'
//
test('activeEditReply is updated when updateEditReplyForm action is run', t => {
  const beforeState = {
    editreply: 'Please edit me...',
    replyId: 5
  }
  const afterState = {
    editreply: 'Wow you did it!!!',
    replyId: 5
  }
  const action = updateEditReplyForm('Wow you did it!!!', 5)
  t.deepEqual(activeEditReply(beforeState, action), afterState)
})

test('activeEditReply is cleared when clearEditReplyForm function is run', t => {
  const beforeState = {
    editreply: 'I am an edit',
    replyId: 10
  }
  const afterState = {
    editreply: '',
    replyId: null
  }
  const action = clearEditReplyForm()
  t.deepEqual(activeEditReply(beforeState, action), afterState)
})

test('activeEditReply replyId is updated when toggleEditReplyBox action is run', t => {
  const beforeState = {
    editreply: 'Please leave me here',
    replyId: 6
  }
  const afterState = {
    editreply: 'Please leave me here',
    replyId: 10
  }
  const action = toggleEditReplyBox(10)
  console.log(action)
  t.deepEqual(activeEditReply(beforeState, action), afterState)
})
