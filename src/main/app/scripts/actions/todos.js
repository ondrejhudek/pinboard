import 'isomorphic-fetch'

import { API_TODOS, API_HEADER } from '../../../../../config'
import auth from '../services/auth/index'

let nextTodoId = 0

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

export const addTodo = () => {
    console.log('addTodo')

    return {
        type: 'ADD_TODO',
        date: Date.now()
    }
}

export const addTodoItem = (todoId, text) => {
    return {
        type: 'ADD_TODO_ITEM',
        todoId,
        text,
        date: Date.now()
    }
}

export const toggleTodoItem = (todoId, todoItemId) => {
    return {
        type: 'TOGGLE_TODO_ITEM',
        todoId,
        todoItemId,
        date: Date.now()
    }
}

export const setVisibilityFilter = (todoId, filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        todoId,
        filter,
        date: Date.now()
    }
}

export const removeTodo = (id) => {
    return {
        type: 'REMOVE_TODO',
        id
    }
}
