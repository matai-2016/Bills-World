const initialState = {
  comment: '',
  commentList: []
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COMMENT_FORM':
      return {
        ...state,
        [action.name]: action.value
      }
    case 'UPDATE_COMMENT_LIST':
      return {
        ...state,
        commentList: action.comments
      }
    default:
      return state
  }
}
