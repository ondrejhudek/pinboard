import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/lib/circular-progress'

import Todo from './Todo'

let Todos = ({ todos, isFetching }) => {
    todos.sort((a, b) => { return b.id - a.id })

    return (
        <div>
            <div className="state-fetching" id={isFetching ? 'show' : ''}>
                <CircularProgress />
            </div>

            <p className="state-empty" id={!todos.length && !isFetching ? 'show' : ''}>
                Add your <strong>first todo</strong>!
            </p>

            <div>
                {todos.map(todo =>
                    <Todo key={todo.id} {...todo} />
                )}
            </div>
        </div>
    )
}

Todos.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        todos: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        })).isRequired,
        filter: PropTypes.string.isRequired
    }).isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.items,
        isFetching: state.todos.isFetching
    }
}

Todos = connect(mapStateToProps)(Todos)

export default Todos
