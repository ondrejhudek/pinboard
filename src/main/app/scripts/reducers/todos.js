const getTodoItemModel = (model) => {
    return ({
        id: model.id,
        text: model.text,
        completed: (typeof model.completed === 'boolean') ? model.completed : false
    })
}

const todoItem = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO_ITEM':
            return getTodoItemModel(action.todo)

        case 'TOGGLE_TODO_ITEM':
            return Object.assign({}, state, {
                completed: action.todo.completed
            })

        default:
            return state
    }
}

const getTodoModel = (model) => {
    return ({
        id: model.id,
        _id: model._id,
        userId: model.user_id,
        filter: 'SHOW_ALL',
        todos: model.todos.map(t => getTodoItemModel(t))
    })
}

const todo = (state, action) => {
    switch (action.type) {
        // todos
        case 'RECEIVE_TODOS':
            return getTodoModel(state)

        case 'ADD_TODO':
            return getTodoModel(action.todo)

        case 'SET_VISIBILITY_FILTER':
            if (state.id !== action.todo.id) return state

            return Object.assign({}, state, {
                filter: action.filter
            })

        //todos items
        case 'ADD_TODO_ITEM':
            if (state.id !== action.todo.todoId) return state

            return Object.assign({}, state, {
                todos: [...state.todos, todoItem(undefined, action)]
            })

        case 'TOGGLE_TODO_ITEM':
            if (state.id !== action.todo.id) return state

            return Object.assign({}, state, {
                todos: state.todos.map(t => {
                    if (t.id !== action.todo.itemId) return t

                    return todoItem(t, action)
                })
            })

        case 'REMOVE_TODO_ITEM':
            if (state.id !== action.todo.id) return state

            return Object.assign({}, state, {
                todos: state.todos.filter(t => {
                    return (t.id !== action.todo.itemId)
                })
            })

        default:
            return state
    }
}

const todos = (state = {isFetching: false, items: []}, action) => {
    switch (action.type) {
        // todos
        case 'REQUEST_TODOS':
            return Object.assign({}, state, {
                isFetching: true
            })

        case 'RECEIVE_TODOS':
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items.map(t => todo(t, action)),
                lastUpdated: action.receivedAt
            })

        case 'ADD_TODO':
            return Object.assign({}, state, {
                items: [...state.items, todo(state, action)],
                lastUpdated: action.date
            })

        case 'REMOVE_TODO':
            return Object.assign({}, state, {
                items: state.items.filter(t => {
                    return (t.id !== action.todo.id)
                }),
                lastUpdated: action.date
            })

        case 'SET_VISIBILITY_FILTER':
            return Object.assign({}, state, {
                items: state.items.map(t => todo(t, action)),
                lastUpdated: action.date
            })

        // todos items
        case 'ADD_TODO_ITEM':
            return Object.assign({}, state, {
                items: state.items.map(t => todo(t, action)),
                lastUpdated: action.date
            })

        case 'TOGGLE_TODO_ITEM':
            return Object.assign({}, state, {
                items: state.items.map(t => todo(t, action)),
                lastUpdated: action.date
            })

        case 'REMOVE_TODO_ITEM':
            return Object.assign({}, state, {
                items: state.items.map(t => todo(t, action)),
                lastUpdated: action.date
            })

        default:
            return state
    }
}

export default todos
