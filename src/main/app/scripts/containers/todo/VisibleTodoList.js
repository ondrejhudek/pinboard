import { connect } from 'react-redux'

import { toggleTodoItem, removeTodoItem } from '../../actions/todos'
import TodoList from '../../components/todo/TodoList'

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos

        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)

        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        todos: getVisibleTodos(ownProps.items, ownProps.filter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleToggle: (todoId, todoItemId) => {
            dispatch(toggleTodoItem(todoId, todoItemId))
        },
        handleRemove: (e, todoId, todoItemId) => {
            e.preventDefault()
            dispatch(removeTodoItem(todoId, todoItemId))
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList
