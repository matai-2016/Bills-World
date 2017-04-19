import test from 'ava'

import activeComment from '../../client/reducers/activeComment.js'
import { updateCommentForm, clearInputBox } from '../../client/actions/comments.js'
//
test('active comment is cleared when clearInputBox function is run', t => {
  const beforeState = {
    comment: 'I am a comment'
  }
  const afterState = {
    comment: ''
  }
  const action = clearInputBox()
  t.deepEqual(activeComment(beforeState, action), afterState)
})

test('active comment is updated when updateCommentForm action is run', t => {
  const beforeState = {
    comment: 'I am another comment'
  }
  const afterState = {
    comment: 'I will replace the previous comment'
  }
  const action = updateCommentForm('I will replace the previous comment')
  t.deepEqual(activeComment(beforeState, action), afterState)
})
