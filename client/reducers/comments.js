const initialState = {
  comment: ''
}

export default function comments (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMMENT_FORM':
      return {
        ...state,
        [action.name]: action.value
      }
    default:
      return state
  }
}
