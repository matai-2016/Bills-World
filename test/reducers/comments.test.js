import test from 'ava'

import comments from '../../client/reducers/comments.js'
import { updateCommentForm } from '../../client/actions/comments.js'

test('comments returns state provided through action', t => {
  const beforeState = {
    comment: 'my first comment'
  }
  const afterState = {
    comment: 'my first comment',
    devAcademy: 'is the coolest'
  }
  const action = updateCommentForm('devAcademy', 'is the coolest')
  t.deepEqual(comments(beforeState, action), afterState)
})
