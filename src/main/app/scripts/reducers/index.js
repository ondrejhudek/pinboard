import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
    todos,
    visibilityFilter
})

export default todos
export default visibilityFilter
