import React from 'react'

import AddTodo from '../containers/todo/AddTodo'
import Todos from '../components/todo/Todos'

class TodoView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="view-todo">
                <h2>To-Do lists</h2>

                <AddTodo />

                <Todos />
            </div>
        )
    }
}

export default TodoView
