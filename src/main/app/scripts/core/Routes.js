import React from 'react';
import Router from 'react-router';
var {DefaultRoute, Route} = Router;

import App from '../core/App';
import Home from '../views/Home';
import Dashboard from '../views/Dashboard';

var routes = (
    <Route path="/" component={Dashboard}>
        <Route path="dashboard" component={Dashboard}/>
    </Route>
);

module.exports = routes;
