import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import auth from '../services/auth/login'
import DevTools from './../containers/DevTools'
import rootReducer from '../reducers'

import { fetchUser } from '../actions/user'

const loggerMiddleware = createLogger()
const middleware = syncHistory(browserHistory)

const finalCreateStore = compose(
    applyMiddleware(
        middleware
        , thunkMiddleware
        // , loggerMiddleware
    ),
    DevTools.instrument()
)(createStore)

const store = finalCreateStore(rootReducer)
middleware.listenForReplays(store)

if (auth.loggedIn()) {
    store.dispatch(fetchUser())
}

export default store
