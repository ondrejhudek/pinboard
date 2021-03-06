import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import auth from '../services/auth/login'

import Layout from '../layouts/Layout'

/* views */
import HomeView from '../views/Home'
import LostPasswordView from '../views/LostPassword'
import DashboardView from '../views/Dashboard'
import NoteView from '../views/Note'
import TodoView from '../views/Todo'
import CalendarView from '../views/Calendar'
import SettingsView from '../views/Settings'
import NotFoundView from '../views/NotFound'
import LogoutView from '../views/Logout'

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/signin',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

function notRequireAuth(nextState, replace) {
    if (auth.loggedIn()) {
        replace({
            pathname: '/',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}
export default (
    <Route path='/' component={Layout}>
        <IndexRoute component={DashboardView} onEnter={requireAuth}/>
        <Route path='signin' component={HomeView} onEnter={notRequireAuth}/>
        <Route path="signout" component={LogoutView}/>
        <Route path='lost-password' component={LostPasswordView} onEnter={notRequireAuth}/>
        <Route path='dashboard' component={DashboardView} onEnter={requireAuth}/>
        <Route path='note' component={NoteView} onEnter={requireAuth}/>
        <Route path='todo' component={TodoView} onEnter={requireAuth}/>
        <Route path='calendar' component={CalendarView} onEnter={requireAuth}/>
        <Route path='settings' component={SettingsView} onEnter={requireAuth}/>
        <Route path='404' component={NotFoundView}/>
        <Redirect from='*' to='/404'/>
    </Route>
)
