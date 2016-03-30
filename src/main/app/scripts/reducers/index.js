import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import user from './user'
import notes from './notes'
import todos from './todos'
import events from './events'
import stats from './stats'

const rootReducer = combineReducers({
    user,
    notes,
    todos,
    events,
    stats,
    routing: routeReducer
})

export default rootReducer
