import 'isomorphic-fetch'

import { API_TODOS, API_HEADER } from '../../../../../config'
import auth from '../services/auth/index'

let nextTodoId = 0

/**
 * TODOS
 */
/* request and receive todos */
const requestTodos = () => {
    return {
        type: 'REQUEST_TODOS'
    }
}

const receiveTodos = (json) => {
    return {
        type: 'RECEIVE_TODOS',
        items: json.map(data => {
            data.id = nextTodoId++
            return data
        }),
        receivedAt: Date.now()
    }
}

export const fetchTodos = () => {
    return dispatch => {
        dispatch(requestTodos())
        return fetch(API_TODOS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'GET', data: {userId: auth.getUserId()}})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(receiveTodos(json)))
            .catch(err => console.log(err))
    }
}

/* add todo */
const addTodo = (objectId) => {
    return {
        type: 'ADD_TODO',
        todo: {
            id: nextTodoId++,
            _id: objectId,
            user_id: auth.getUserId()
        },
        date: Date.now()
    }
}

export const fetchAdd = () => {
    return dispatch => {
        return fetch(API_TODOS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'CREATE', data: {userId: auth.getUserId()}})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(addTodo(json)))
            .catch(err => console.log(err))
    }
}

/* remove todo */
export const removeTodo = (id, objectId) => {
    fetchRemove(objectId)
    return {
        type: 'REMOVE_TODO',
        todo: {
            id: id
        },
        date: Date.now()
    }
}

const fetchRemove = (objectId) => {
    return fetch(API_TODOS, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'REMOVE', data: {id: objectId}})
    })
        .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
        .then(text => text)
        .catch(err => console.log(err))
}

/* set visibility filter */
export const setVisibilityFilter = (todoId, filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        todo: {
            id: todoId
        },
        filter,
        date: Date.now()
    }
}

/**
 * TODOS ITEMS
 */
/* add todo item */
export const addTodoItem = (todoId, text) => {
    fetchAddItem(todoId, text)
    return {
        type: 'ADD_TODO_ITEM',
        todo: {
            id: todoId,
            text
        },
        date: Date.now()
    }
}

const fetchAddItem = (todoId, text) => {
    console.log(todoId + " | " + text)
    return true
}

/* toggle todo item */
export const toggleTodoItem = (todoId, todoItemId) => {
    fetchToggleItem(todoId, todoItemId)
    return {
        type: 'TOGGLE_TODO_ITEM',
        todo: {
            id: todoId,
            itemId: todoItemId
        },
        date: Date.now()
    }
}

const fetchToggleItem = (todoId, todoItemId) => {
    console.log(todoId + " | " + todoItemId)
    return true
}

/* remove todo item */
export const removeTodoItem = (todoId, todoItemId) => {
    fetchRemoveItem(todoId, todoItemId)
    return {
        type: 'REMOVE_TODO_ITEM',
        todo: {
            id: todoId,
            itemId: todoItemId
        },
        date: Date.now()
    }
}

const fetchRemoveItem = (todoId, todoItemId) => {
    console.log(todoId + " | " + todoItemId)
    return true
}
