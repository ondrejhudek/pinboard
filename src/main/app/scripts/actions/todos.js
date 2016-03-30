import 'isomorphic-fetch'
import shortid from 'shortid'

import { API_TODOS, API_HEADER } from '../../../../../config'
import auth from '../services/auth/login'

let nextTodoId = 0

const generateTodoItemId = () => {
    return shortid.generate()
}

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
            user_id: auth.getUserId(),
            todos: []
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
export const addTodoItem = (todoId, objectId, text) => {
    const itemId = generateTodoItemId()

    fetchAddItem(objectId, itemId, text)
    return {
        type: 'ADD_TODO_ITEM',
        todo: {
            todoId,
            id: itemId,
            text
        },
        date: Date.now()
    }
}

const fetchAddItem = (objectId, itemId, text) => {
    return fetch(API_TODOS, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'ADD_ITEM', data: {id: objectId, todo: {id: itemId, text: text, completed: false}}})
    })
        .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
        .then(text => text)
        .catch(err => console.log(err))
}

/* toggle todo item */
export const toggleTodoItem = (todoId, objectId, todoItemId, completed) => {
    fetchToggleItem(objectId, todoItemId, completed)
    return {
        type: 'TOGGLE_TODO_ITEM',
        todo: {
            id: todoId,
            itemId: todoItemId,
            completed
        },
        date: Date.now()
    }
}

const fetchToggleItem = (objectId, todoItemId, completed) => {
    return fetch(API_TODOS, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'TOGGLE_ITEM', data: {id: objectId, todo: {id: todoItemId, completed}}})
    })
        .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
        .then(text => text)
        .catch(err => console.log(err))
}

/* remove todo item */
export const removeTodoItem = (todoId, objectId, todoItemId) => {
    fetchRemoveItem(objectId, todoItemId)
    return {
        type: 'REMOVE_TODO_ITEM',
        todo: {
            id: todoId,
            itemId: todoItemId
        },
        date: Date.now()
    }
}

const fetchRemoveItem = (objectId, todoItemId) => {
    return fetch(API_TODOS, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'REMOVE_ITEM', data: {id: objectId, todo: {id: todoItemId}}})
    })
        .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
        .then(text => text)
        .catch(err => console.log(err))
}
