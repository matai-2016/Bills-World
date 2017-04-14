import {combineReducers} from 'redux'

import test from './test'
import auth from './auth'
import bills from './bills'

const reducers = combineReducers({
  test,
  auth,
  bills
})

export default reducers
