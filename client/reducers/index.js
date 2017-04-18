import {combineReducers} from 'redux'

import auth from './auth'
import bills from './bills'
import activeComment from './activeComment'
import billInfo from './billInfo'
import votes from './votes'
import userVote from './userVote'
import activeEditComment from './activeEditComment'

const reducers = combineReducers({
  auth,
  bills,
  billInfo,
  votes,
  userVote,
  activeComment,
  activeEditComment
})

export default reducers
