const initialState = {
  replying: false,
  activeReply: '',
  parentId: 0
}

export default function activeComment (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_REPLY_FORM':
      return {
        ...state,
        [action.name]: action.value
      }
    case 'CREATE_REPLY':
      return {
        ...state,
        parentId: action.parentId,
        replying: true
      }
    case 'CLEAR_REPLY_BOX':
      return {
        ...state,
        activeReply: '',
        replying: false
      }
    default:
      return state
  }
}
