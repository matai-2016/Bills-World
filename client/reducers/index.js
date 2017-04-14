import {combineReducers} from 'redux'

import test from './test'
import auth from './auth'
import bills from './bills'
import billInfo from './billInfo'
import votes from './votes'

const reducers = combineReducers({
  test,
  auth,
  bills,
  billInfo,
  votes
})

export default reducers
