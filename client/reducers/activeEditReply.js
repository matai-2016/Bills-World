const initialState = {
  editreply: '',
  replyId: null
}

export default function activeEditReply (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_EDIT_REPLY_FORM':
      return {
        ...state,
        [action.name]: action.value,
        replyId: action.replyId
      }
      case 'CLEAR_EDIT_REPLY_BOX':
        return {
          ...state,
          editreply: ''
        }
      case 'TOGGLE_EDIT_REPLY_BOX':
        return {
          ...state,
          replyId: action.replyId
        }
    default:
      return state
  }
}
