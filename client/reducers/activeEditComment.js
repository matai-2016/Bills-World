const initialState = {
  comment: '',
  commentId: null
}

export default function activeEditComment (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_EDIT_FORM':
      return {
        ...state,
        [action.name]: action.value,
        commentId: action.commentId
      }
      case 'CLEAR_EDIT_BOX':
        return {
          ...state,
          comment: ''
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
