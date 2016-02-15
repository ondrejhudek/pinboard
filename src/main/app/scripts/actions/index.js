/** NOTES **/
let nextNoteId = 0
export const addNote = (title, body) => {
    return {
        type: 'ADD_NOTE',
        id: nextTodoId++,
        title,
        body
    }
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
