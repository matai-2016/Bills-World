const initialState = {}

export default function userVote (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_USER_VOTE':
      return action.userVote
    case 'CLEAR_USER_VOTE':
      return initialState
    default:
      return state
  }
}
