import 'isomorphic-fetch'

import { API_NOTES, API_HEADER } from '../../../../../config'
import auth from '../services/auth/index'

let nextNoteId = 0

/** notes **/
const requestNotes = () => {
    return {
        type: 'REQUEST_NOTES'
    }
}

const receiveNotes = (json) => {
    return {
        type: 'RECEIVE_NOTES',
        items: json.map(data => {
            data.id = nextNoteId++
            return data
        }),
        receivedAt: Date.now()
    }
}

export const fetchNotes = () => {
    return dispatch => {
        dispatch(requestNotes())
        return fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'GET', data: {userId: auth.getUserId()}})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(receiveNotes(json)))
            .catch(err => console.log(err))
    }
}

const addNote = (objectId, title, body) => {
    return {
        type: 'ADD_NOTE',
        note: {
            id: nextNoteId++,
            _id: objectId,
            user_id: auth.getUserId(),
            title,
            body
        },
        date: Date.now()
    }
}

export const fetchCreate = (title) => {
    return dispatch => {
        return fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'CREATE', data: {userId: auth.getUserId(), title: title}})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(addNote(json, title, '')))
            .catch(err => console.log(err))
    }
}

export const updateNote = (id, objectId, title, body) => {
    fetchUpdate(objectId, title, body)
    return {
        type: 'UPDATE_NOTE',
        note: {
            id: id,
            title,
            body
        },
        date: Date.now()
    }
}

const fetchUpdate = (objectId, title, body) => {
    return fetch(API_NOTES, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'UPDATE', data: {id: objectId, title: title, body: body}})
    })
        .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
        .then(text => text)
        .catch(err => console.log(err))
}

export const removeNote = (id, objectId) => {
    fetchRemove(objectId)
    return {
        type: 'REMOVE_NOTE',
        note: {
            id: id
        },
        date: Date.now()
    }
}

const fetchRemove = (objectId) => {
    return fetch(API_NOTES, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'REMOVE', data: {id: objectId}})
    })
        .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
        .then(text => text)
        .catch(err => console.log(err))
}
