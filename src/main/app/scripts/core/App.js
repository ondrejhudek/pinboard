import React from 'react'
import ReactDOM from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'

import routes from '../routes'
import Root from '../containers/Root'
import configureStore from '../redux/configureStore'

const historyConfig = { basename: '' };
const history = useRouterHistory(createHistory)(historyConfig);

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

ReactDOM.render(
    <Root history={history} routes={routes} store={store} />,
    document.getElementById('app')
);
