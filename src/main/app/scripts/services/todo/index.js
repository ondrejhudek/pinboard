import 'isomorphic-fetch'

import { API_TODOS, API_HEADER } from '../../../../../../config'
import auth from '../../services/auth/login'

export default {
    fetchTodos() {
        return new Promise((resolve, reject) => {
            return fetch(API_TODOS, {
                method: 'POST',
                headers: API_HEADER,
                body: JSON.stringify({event: 'GET', data: {userId: auth.getUserId()}})
            })
                .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    },

    createTodo() {
        return new Promise((resolve, reject) => {
            return fetch(API_TODOS, {
                method: 'POST',
                headers: API_HEADER,
                body: JSON.stringify({event: 'CREATE', data: {userId: auth.getUserId()}})
            })
                .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
                .then(json => resolve({id: json, userId: auth.getUserId()}))
                .catch(err => reject(err))
        })
    },

    removeTodo(objectId) {
        return fetch(API_TODOS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'REMOVE', data: {id: objectId}})
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => text)
            .catch(err => console.log(err))
    },

    createTodoItem(objectId, itemId, text) {
        return fetch(API_TODOS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'ADD_ITEM', data: {id: objectId, todo: {id: itemId, text: text, completed: false}}})
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => text)
            .catch(err => console.log(err))
    },

    toggleTodoItem(objectId, todoItemId, completed) {
        return fetch(API_TODOS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'TOGGLE_ITEM', data: {id: objectId, todo: {id: todoItemId, completed}}})
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => text)
            .catch(err => console.log(err))
    },

    removeTodoItem(objectId, todoItemId) {
        return fetch(API_TODOS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'REMOVE_ITEM', data: {id: objectId, todo: {id: todoItemId}}})
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => text)
            .catch(err => console.log(err))
    }
}
