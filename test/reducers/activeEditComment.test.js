import test from 'ava'

import activeEditComment from '../../client/reducers/activeEditComment.js'
import { updateEditCommentForm, clearEditCommentForm, toggleEditCommentBox } from '../../client/actions/comments.js'
//
test('activeEditComment is updated when updateEditCommentForm action is run', t => {

  const beforeState = {
    editcomment: 'Please edit me...',
    commentId: 5
  }
  const afterState = {
    editcomment: 'Wow you did it!!!',
    commentId: 5
  }
  const action = updateEditCommentForm('Wow you did it!!!', 5)
  t.deepEqual(activeEditComment(beforeState, action), afterState)
})

test('activeEditComment is cleared when clearEditCommentForm function is run', t => {
  const beforeState = {
    editcomment: 'I am an edit',
    commentId: 10
  }
  const afterState = {
    editcomment: '',
    commentId: null
  }
  const action = clearEditCommentForm()
  t.deepEqual(activeEditComment(beforeState, action), afterState)
})

test('activeEditComment commentId is updated when toggleEditCommentBox action is run', t => {
  const beforeState = {
    editcomment: 'Please leave me here',
    commentId: 6
  }
  const afterState = {
    editcomment: 'Please leave me here',
    commentId: 10
  }
  const action = toggleEditCommentBox(10)
  t.deepEqual(activeEditComment(beforeState, action), afterState)
})
