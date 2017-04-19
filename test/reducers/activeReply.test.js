import test from 'ava'

import activeReply from '../../client/reducers/activereply.js'
import { clearReplyBox, createReply } from '../../client/actions/replies.js'
//
test('activeReply is cleared when clearReplyBox function is run', t => {
  const beforeState = {
    replying: true,
    activeReply: 'Is this not just the best reply ever?!?!',
    parentId: 3
  }
  const afterState = {
    activeReply: '',
    replying: false,
    parentId: 0
  }
  const action = clearReplyBox()
  t.deepEqual(activeReply(beforeState, action), afterState)
})

test('activeReply is updated when createReply action is run', t => {
  const beforeState = {
    replying: false,
    parentId: 0
  }
  const afterState = {
    replying: true,
    parentId: 3
  }
  const action = createReply(3)
  t.deepEqual(activeReply(beforeState, action), afterState)
})
