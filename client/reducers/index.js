import {combineReducers} from 'redux'

import test from './test'
import auth from './auth'
import bills from './bills'
import comments from './comments'
import billInfo from './billInfo'

const reducers = combineReducers({
  test,
  auth,
  bills,
  comments,
  billInfo
})

export default reducers
