const initialState = {
  replying: false,
  activeReply: '',
  parentId: ''
}

export default function activeComment (state = initialState, action) {
  switch (action.type) {
    case 'CREATE_REPLY':
      return {
        ...state,
        parentId: action.commentId,
        replying: true
      }
    default:
      return state
  }
}
