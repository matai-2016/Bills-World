const initialState = {
  editcomment: '',
  commentId: null
}

export default function activeEditComment (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_EDIT_COMMENT_FORM':
      return {
        ...state,
        editcomment: action.value,
        commentId: action.commentId
      }
      case 'CLEAR_EDIT_COMMENT_FORM':
        return {
          ...state,
          editcomment: '',
          commentId: null
        }
      case 'TOGGLE_EDIT_COMMENT_BOX':
        return {
          ...state,
          commentId: action.commentId
        }
    default:
      return state
  }
}
