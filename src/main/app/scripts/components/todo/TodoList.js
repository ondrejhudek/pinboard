import React, { PropTypes } from 'react'

import TodoListItem from './TodoListItem'

const TodoList = ({ id, objectId, todos, handleToggle, handleRemove }) => {
    return (
        <div>
            {todos.map(todo =>
                <TodoListItem key={todo.id} {...todo} handleToggle={() => handleToggle(id, objectId, todo.id, !todo.completed)} handleRemove={(e) => handleRemove(e, id, objectId, todo.id)}/>
            )}
        </div>
    )
}

TodoList.propTypes = {
    id: PropTypes.number.isRequired,
    objectId: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
}

export default TodoList
