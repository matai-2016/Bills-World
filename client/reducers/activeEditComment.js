const initialState = {
  comment: ''
}

export default function activeEditComment (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_EDIT_FORM':
      return {
        ...state,
        [action.name]: action.value
      }
      case 'CLEAR_EDIT_BOX':
        return {
          ...state,
          comment: ''
        }
    default:
      return state
  }
}
