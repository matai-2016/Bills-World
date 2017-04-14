import {combineReducers} from 'redux'

import test from './test'
import auth from './auth'
import bills from './bills'
import comments from './comments'

const reducers = combineReducers({
  test,
  auth,
  bills,
  comments
})

export default reducers
