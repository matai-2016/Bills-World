import {combineReducers} from 'redux'

import auth from './auth'
import bills from './bills'
import activeComment from './activeComment'
import billInfo from './billInfo'

const reducers = combineReducers({
  auth,
  bills,
  activeComment,
  billInfo
})

export default reducers
