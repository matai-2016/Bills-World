const initialState = {
  replying: false,
  activeReply: '',
  parentId: 0
}

export default function activeReply (state = initialState, action) {
  switch (action.type) {
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
        replying: false,
        parentId: 0
      }
    default:
      return state
  }
}
