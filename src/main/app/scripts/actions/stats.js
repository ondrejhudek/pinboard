import 'isomorphic-fetch'

import { API_USERS, API_NOTES, API_EVENTS, API_TODOS, API_HEADER } from '../../../../../config'

/* request and receive users total count */
export const fetchStats = () => {
    return dispatch => {
        dispatch(fetchUsersCount())
        dispatch(fetchNotesCount())
        dispatch(fetchTodosCount())
        dispatch(fetchEventsCount())
    }
}

const countUsers = (count) => {
    return {
        type: 'COUNT_USERS',
        count
    }
}

const countNotes = (count) => {
    return {
        type: 'COUNT_NOTES',
        count
    }
}

const countTodos = (count) => {
    return {
        type: 'COUNT_TODOS',
        count
    }
}

const countEvent = (count) => {
    return {
        type: 'COUNT_EVENTS',
        count
    }
}

const fetchUsersCount = () => {
    return dispatch => {
        return fetch(API_USERS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'COUNT'})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(countUsers(json)))
            .catch(err => console.log(err))
    }
}

const fetchNotesCount = () => {
    return dispatch => {
        return fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'COUNT'})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(countNotes(json)))
            .catch(err => console.log(err))
    }
}

const fetchTodosCount = () => {
    return dispatch => {
        return fetch(API_TODOS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'COUNT'})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(countTodos(json)))
            .catch(err => console.log(err))
    }
}

const fetchEventsCount = () => {
    return dispatch => {
        return fetch(API_EVENTS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'COUNT'})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(countEvent(json)))
            .catch(err => console.log(err))
    }
}
