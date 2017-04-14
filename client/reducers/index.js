import {combineReducers} from 'redux'

import test from './test'
import auth from './auth'
import bills from './bills'
import votes from './votes'

const reducers = combineReducers({
  test,
  auth,
  bills,
  votes
})

export default reducers
