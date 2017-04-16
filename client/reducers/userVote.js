const initialState = {}

export default function userVote (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_USER_VOTE':
      return action.userVote
    default:
      return state
  }
}
