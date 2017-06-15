const initialState = {}

export default function votes (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_VOTES':
      return action.votes
    default:
      return state
  }
}
