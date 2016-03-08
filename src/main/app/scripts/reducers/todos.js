let todoItemId = 0

const getTodoItemModel = (model) => {
    return ({
        id: (model.id) ? model.id : todoItemId++,
        text: model.text,
        completed: (model.completed) ? model.completed : false
    })
}

const todoItem = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO_ITEM':
            return getTodoItemModel(action)

        case 'TOGGLE_TODO_ITEM':
            return Object.assign({}, state, {
                completed: !state.completed
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
        case 'ADD_TODO_ITEM':
            if (state.id !== action.todoId) return state

            return Object.assign({}, state, {
                todos: [...state.todos, todoItem(undefined, action)]
            })

        case 'TOGGLE_TODO_ITEM':
            if (state.id !== action.todoId) return state

            return Object.assign({}, state, {
                todos: state.todos.map(t => {
                    if (t.id !== action.todoItemId) return t

                    return todoItem(t, action)
                })
            })

        case 'SET_VISIBILITY_FILTER':
            if (state.id !== action.todoId) return state

            return Object.assign({}, state, {
                filter: action.filter
            })

        case 'RECEIVE_TODOS':
            return getTodoModel(state)

        default:
            return state
    }
}

const todos = (state = {isFetching: false, items: []}, action) => {
    switch (action.type) {
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

        case 'SET_VISIBILITY_FILTER':
            return Object.assign({}, state, {
                items: state.items.map(t => todo(t, action)),
                lastUpdated: action.date
            })

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

        default:
            return state
    }
}

export default todos
