import React from 'react'
import { connect } from 'react-redux'

import AddTodo from '../containers/todo/AddTodo'
import Todos from '../components/todo/Todos'

import { fetchTodos } from '../actions/todos'
let fetched = false

class TodoView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dispatch: props.dispatch
        }
    }

    componentWillMount() {
        if (!fetched) {
            this.state.dispatch(fetchTodos())
            fetched = true
        }
    }

    render() {
        return (
            <div className="view-todo">
                <h2>Todo lists</h2>

                <AddTodo />

                <Todos />
            </div>
        )
    }
}

TodoView = connect()(TodoView)

export default TodoView
