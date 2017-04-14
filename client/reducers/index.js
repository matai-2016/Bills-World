import {combineReducers} from 'redux'

import test from './test'
import auth from './auth'
import bills from './bills'
import billInfo from './billInfo'

const reducers = combineReducers({
  test,
  auth,
  bills,
  billInfo
})

export default reducers
