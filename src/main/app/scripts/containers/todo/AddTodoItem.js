import React, { PropTypes } from 'react'
import { TextField } from 'material-ui'
import { connect } from 'react-redux'

import { addTodoItem } from '../../actions/todos'

const style = {
    field: {
        width: '100%'
    }
}

let AddTodoItem = ({dispatch, id, objectId}) => {
    const handleAdd = (e) => {
        const value = e.target.value.trim()

        if (!value) return
        dispatch(addTodoItem(id, objectId, value))
        e.target.value = ''
    }

    return (
        <div>
            <TextField hintText="What needs to be done?" style={style.field} onEnterKeyDown={handleAdd}/>
        </div>
    )
}

AddTodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    objectId: PropTypes.string.isRequired
}

AddTodoItem = connect()(AddTodoItem)

export default AddTodoItem
