const initialState = {}

export default function votes (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_VOTES':
      return action.votes
    case 'SHOW_USER_VOTE':
      return action.userVote
    default:
      return state
  }
}
