import 'isomorphic-fetch'

import { API_NOTES, API_HEADER } from '../../../../../config'
import auth from '../services/auth/index'

/** NOTES **/
let nextNoteId = 0

export const receiveNotes = (json) => {
    return {
        type: 'RECEIVE_NOTES',
        notes: json.map(data => {
            data.id = nextNoteId++
            return data
        }),
        receivedAt: Date.now()
    }
}

export const fetchNotes = () => {
    return dispatch => {
        return fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'GET', data: { userId: auth.getUserId() }})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(receiveNotes(json)))
            .catch(err => console.log(err))
    }
}

const addNote = (objectId, title, body) => {
    return {
        type: 'ADD_NOTE',
        id: nextNoteId++,
        _id: objectId,
        user_id: auth.getUserId(),
        title,
        body
    }
}

export const fetchCreate = (title) => {
    return dispatch => {
        return fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'CREATE', data: {userId: auth.getUserId(), title: title}})
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => dispatch(addNote(text, title, '')))
            .catch(err => console.log(err))
    }
}

export const updateNote = (id, objectId, title, body) => {
    console.log(id + " | " + objectId + " | " + title + " | " + body)
    fetchUpdate(objectId, title, body)
    return {
        type: 'UPDATE_NOTE',
        id: id,
        title,
        body
    }
}

const fetchUpdate = (objectId, title, body) => {
    return fetch(API_NOTES, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({ event: 'UPDATE', data: { id: objectId, title: title, body: body } })
    })
        .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
        .then(text => console.log(text))
        .catch(err => console.log(err))
}

/** TODOS **/
let nextTodoId = 0
export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}

export const removeTodo = (id) => {
    return {
        type: 'REMOVE_TODO',
        id
    }
}
