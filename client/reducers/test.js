const initialState = {
  clicked: false
}

export default function test (state = initialState, action) {
  switch (action.type) {
    case 'TEST_BUTTON':
      return {
        ...state,
        clicked: true
      }
    default: {
      return state
    }
  }
}
