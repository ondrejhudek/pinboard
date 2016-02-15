import React, { PropTypes } from 'react'
import { TextField } from 'material-ui'

import { connect } from 'react-redux'
import { addTodo } from '../../actions'

const style = {
    field: {
        width: '100%'
    }
}

let AddTodo = ({ dispatch }) => {
    const handleAdd = (e) => {
        const value = e.target.value.trim()

        if(!value) return
        dispatch(addTodo(value))
        e.target.value = ''
    }

    return (
        <div>
            <TextField hintText="What needs to be done?" style={style.field} onEnterKeyDown={handleAdd}/>
        </div>
    )
}

AddTodo = connect()(AddTodo)

export default AddTodo
