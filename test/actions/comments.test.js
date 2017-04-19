import test from 'ava'
import { clearInputBox, updateCommentForm, updateEditCommentForm, clearEditCommentForm, toggleEditCommentBox } from '../../client/actions/comments.js'

test('clearInputBox returns type of CLEAR_INPUT_BOX', t => {
  t.deepEqual(clearInputBox(), { type: 'CLEAR_INPUT_BOX' })
})

test('updateCommentForm returns object with type UPDATE_COMMENT_FORM and value', t => {
  const value = 'value'
  t.deepEqual(updateCommentForm(value), { type: 'UPDATE_COMMENT_FORM', value })
})

test('updateEditCommentForm returns type of UPDATE_EDIT_COMMENT_FORM, value and commentId', t => {
  const value = 'value'
  const commentId = 3
  t.deepEqual(updateEditCommentForm(value, commentId), { type: 'UPDATE_EDIT_COMMENT_FORM', value, commentId })
})

test('clearEditCommentForm returns object with type CLEAR_EDIT_COMMENT_FORM', t => {
  t.deepEqual(clearEditCommentForm(), { type: 'CLEAR_EDIT_COMMENT_FORM' })
})

test('toggleEditCommentBox returns a type of TOGGLE_EDIT_COMMENT_BOX and commentId', t => {
  const commentId = 3
  t.deepEqual(toggleEditCommentBox(commentId), { type: 'TOGGLE_EDIT_COMMENT_BOX', commentId })
})
