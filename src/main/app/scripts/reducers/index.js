import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import todos from './todos'
import visibilityFilter from './visibilityFilter'
import notes from './notes'

const rootReducer = combineReducers({
    notes,
    todos,
    visibilityFilter,
    routing: routeReducer
})

export default rootReducer
