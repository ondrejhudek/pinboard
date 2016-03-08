import React, { PropTypes } from 'react'

import TodoListItem from './TodoListItem'

const TodoList = ({ id, todos, handleToggle, handleRemove }) => {
    return (
        <div>
            {todos.map(todo =>
                <TodoListItem key={todo.id} {...todo} handleToggle={() => handleToggle(id, todo.id)} handleRemove={(e) => handleRemove(e, id, todo.id)}/>
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
    handleToggle: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
}

export default TodoList
