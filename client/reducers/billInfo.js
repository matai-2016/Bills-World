const initialState = []

export default function billInfo (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_BILL_INFO':
      return action.billInfo
    default:
      return state
  }
}
