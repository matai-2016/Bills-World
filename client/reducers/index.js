import {combineReducers} from 'redux'

import test from './test'
import auth from './auth'

const reducers = combineReducers({
  test,
  auth
})

export default reducers
