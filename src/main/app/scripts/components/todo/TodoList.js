import React, { PropTypes } from 'react'

import TodoListItem from './TodoListItem'

const TodoList = ({ id, todos, onTodoClick }) => {
    return (
        <div>
            {todos.map(todo =>
                <TodoListItem key={todo.id} {...todo} handleClick={() => onTodoClick(id, todo.id)}/>
            )}
        </div>
    )
}

TodoList.propTypes = {
    id: PropTypes.number.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default TodoList
