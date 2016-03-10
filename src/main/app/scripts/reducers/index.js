import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import notes from './notes'
import todos from './todos'
import events from './events'

const rootReducer = combineReducers({
    notes,
    todos,
    events,
    routing: routeReducer
})

export default rootReducer
