import 'isomorphic-fetch'

import { API_EVENTS, API_HEADER } from '../../../../../config'
import auth from '../services/auth/index'

let nextEventId = 0

/**
 * EVENTS
 */
/* request and receive events */
const requestEvents = () => {
    return {
        type: 'REQUEST_EVENTS'
    }
}

const receiveEvents = (json) => {
    return {
        type: 'RECEIVE_EVENTS',
        items: json.map(data => {
            data.id = nextEventId++
            return data
        }),
        receivedAt: Date.now()
    }
}

export const fetchEvents = () => {
    return dispatch => {
        dispatch(requestEvents())
        return fetch(API_EVENTS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'GET', data: {userId: auth.getUserId()}})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(receiveEvents(json)))
            .catch(err => console.log(err))
    }
}

/* add event */
const addEvent = (objectId, event) => {
    event.user_id = auth.getUserId()
    event.id = nextEventId++
    event._id = objectId

    return {
        type: 'ADD_EVENT',
        event,
        date: Date.now()
    }
}

export const fetchAdd = (event) => {
    return dispatch => {
        return fetch(API_EVENTS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'CREATE', data: {userId: auth.getUserId(), event}})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(addEvent(json, event)))
            .catch(err => console.log(err))
    }
}

/* update event */
export const updateEvent = (event) => {
    fetchUpdate(event)
    return {
        type: 'UPDATE_EVENT',
        event,
        date: Date.now()
    }
}

const fetchUpdate = (event) => {
    return fetch(API_EVENTS, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'UPDATE', data: {id: event.objectId, event}})
    })
        .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
        .then(text => text)
        .catch(err => console.log(err))
}

/* remove event */
export const removeEvent = (event) => {
    fetchRemove(event)
    return {
        type: 'REMOVE_EVENT',
        event,
        date: Date.now()
    }
}

const fetchRemove = (event) => {
    return fetch(API_EVENTS, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'REMOVE', data: {id: event.objectId}})
    })
        .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
        .then(text => text)
        .catch(err => console.log(err))
}
