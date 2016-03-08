import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'

import notes from './notes'
import todos from './todos'

const rootReducer = combineReducers({
    notes,
    todos,
    routing: routeReducer
})

export default rootReducer
