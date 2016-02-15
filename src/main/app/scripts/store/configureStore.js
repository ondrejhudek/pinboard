import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'

import DevTools from './../containers/DevTools'
import todos from '../reducers/todos'
import visibilityFilter from '../reducers/visibilityFilter'
import notes from '../reducers/notes'

const middleware = syncHistory(browserHistory)
const reducer = combineReducers({
    todos,
    visibilityFilter,
    notes,
    routing: routeReducer
})

const finalCreateStore = compose(
    applyMiddleware(middleware),
    DevTools.instrument()
)(createStore)

const store = finalCreateStore(reducer)
middleware.listenForReplays(store)

export default store

//import fetchDatabase from './fetchDatabase'
//export default fetchDatabase(store)
