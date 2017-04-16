const initialState = {
  comment: ''
}

export default function activeComment (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMMENT_FORM':
      return {
        ...state,
        [action.name]: action.value
      }
    case 'CLEAR_INPUT_BOX':
      return {
        ...state,
        comment: ''
      }
    default:
      return state
  }
}
