import React from 'react'

import { API_TODOS } from '../../../../../config'
import { addTodo } from '../actions'

const fetchTodos = (store) => {
    return fetch(API_TODOS)
        .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
        .then(json =>
            json.map(function(obj){
                store.dispatch(addTodo(obj.text))
            })
        )
        .catch(err => console.log(err))
}

export default (store) => {
    fetchTodos(store)
    return store
}
