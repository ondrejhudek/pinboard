import shortid from 'shortid'

import service from '../services/todo'

let nextTodoId = 0

/* request and receive todos */
const requestTodos = () => {
    return {
        type: 'REQUEST_TODOS'
    }
}

const receiveTodos = (data) => {
    return {
        type: 'RECEIVE_TODOS',
        items: data.map(t => {
            t.id = nextTodoId++
            return t
        }),
        receivedAt: Date.now()
    }
}

export const fetchTodos = () => {
    return dispatch => {
        dispatch(requestTodos())

        service.fetchTodos()
            .then((data) => dispatch(receiveTodos(data)))
            .catch((error) => console.log(error))
    }
}

/* add todo */
export const addTodo = () => {
    return dispatch => {
        service.createTodo()
            .then((data) => {
                dispatch({
                    type: 'ADD_TODO',
                    todo: {
                        id: nextTodoId++,
                        _id: data.id,
                        user_id: data.userId,
                        todos: []
                    },
                    date: Date.now()
                })
            })
            .catch((error) => console.log(error))
    }
}

/* remove todo */
export const removeTodo = (id, objectId) => {
    service.removeTodo(objectId)

    return {
        type: 'REMOVE_TODO',
        todo: {
            id: id
        },
        date: Date.now()
    }
}

/* set todo visibility filter */
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

/* add todo item */
export const addTodoItem = (todoId, objectId, text) => {
    const itemId = shortid.generate()
    service.createTodoItem(objectId, itemId, text)

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

/* toggle todo item */
export const toggleTodoItem = (todoId, objectId, todoItemId, completed) => {
    service.toggleTodoItem(objectId, todoItemId, completed)

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

/* remove todo item */
export const removeTodoItem = (todoId, objectId, todoItemId) => {
    service.removeTodoItem(objectId, todoItemId)

    return {
        type: 'REMOVE_TODO_ITEM',
        todo: {
            id: todoId,
            itemId: todoItemId
        },
        date: Date.now()
    }
}
