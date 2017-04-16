import test from 'ava'
import { updateCommentForm } from '../../client/actions/comments.js'

test('updateCommentForm returns object with type UPDATE_COMMENT_FORM', t => {
  const name = 'name'
  const value = 'value'
  t.deepEqual(updateCommentForm(name, value), { type: 'UPDATE_COMMENT_FORM', name, value })
})
