import {combineReducers} from 'redux'

import auth from './auth'
import bills from './bills'
import comments from './comments'
import billInfo from './billInfo'

const reducers = combineReducers({
  auth,
  bills,
  comments,
  billInfo
})

export default reducers
