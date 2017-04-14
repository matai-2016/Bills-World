const initialState = []

export default function bills (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_BILLS':
      return action.bills
    default:
      return state
  }
}
