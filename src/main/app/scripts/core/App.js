import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route } from 'react-router'

import Home from '../views/Home'
import Dashboard from '../views/Dashboard'

render((
    <Router history={browserHistory}>
        <Route path="/" component={Home}>
            <Route path="home" component={Home} />
            <Route path="dashboard" component={Dashboard} />
        </Route>
    </Router>
), document.getElementById('app'))
