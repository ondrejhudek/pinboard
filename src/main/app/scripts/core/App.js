import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

import routes from '../routes'
import Root from '../containers/Root'
import store from '../store/configureStore'

ReactDOM.render(
    <Root history={browserHistory} routes={routes} store={store} />,
    document.getElementById('app')
)
