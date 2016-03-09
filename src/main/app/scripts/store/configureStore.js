import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import DevTools from './../containers/DevTools'
import rootReducer from '../reducers'
import { fetchNotes } from '../actions/notes'
import { fetchTodos } from '../actions/todos'

const loggerMiddleware = createLogger()
const middleware = syncHistory(browserHistory)

const finalCreateStore = compose(
    applyMiddleware(
        middleware,
        thunkMiddleware,
        loggerMiddleware
    ),
    DevTools.instrument()
)(createStore)

const store = finalCreateStore(rootReducer)
middleware.listenForReplays(store)

//store.dispatch(fetchNotes())
//store.dispatch(fetchTodos())

export default store
