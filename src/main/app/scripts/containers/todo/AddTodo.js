import React from 'react'
import { connect } from 'react-redux'
import { FloatingActionButton } from 'material-ui'
import AddIcon from 'material-ui/lib/svg-icons/content/add'

import { addTodo } from '../../actions/todos'

let AddTodo = ({ dispatch }) => {
    const handleAdd = () => {
        dispatch(addTodo())
    }

    return (
        <div className="floatingButton-add">
            <FloatingActionButton secondary={true} onClick={handleAdd}>
                <AddIcon />
            </FloatingActionButton>
        </div>
    )
}

AddTodo = connect()(AddTodo)

export default AddTodo
