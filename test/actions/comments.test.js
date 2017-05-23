import test from 'ava'
import { clearInputBox, updateCommentForm } from '../../client/actions/comments.js'

test('clearInputBox returns type of CLEAR_INPUT_BOX', t => {
  t.deepEqual(clearInputBox(), { type: 'CLEAR_INPUT_BOX' })
})

test('updateCommentForm returns object with type UPDATE_COMMENT_FORM and value', t => {
  const value = 'value'
  t.deepEqual(updateCommentForm(value), { type: 'UPDATE_COMMENT_FORM', value })
})
