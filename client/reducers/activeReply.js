const initialState = {
  replying: false,
  activeReply: '',
  parentId: 0
}

export default function activeComment (state = initialState, action) {
  switch (action.type) {
    case 'CREATE_REPLY':
      return {
        ...state,
        parentId: action.parentId,
        replying: true
      }
    default:
      return state
  }
}
