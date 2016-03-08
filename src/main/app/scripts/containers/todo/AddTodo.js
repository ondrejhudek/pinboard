import React from 'react'
import { RaisedButton  } from 'material-ui'
import AddIcon from 'material-ui/lib/svg-icons/content/add-circle'
import { connect } from 'react-redux'

import { addTodo } from '../../actions/todos'

const style = {
    add: {
        marginBottom: 20,
        textAlign: 'center'
    }
}

let AddTodo = ({ dispatch }) => {
    const handleAdd = () => {
        dispatch(addTodo())
    }

    return (
        <div style={style.add}>
            <RaisedButton label="Add todo" secondary={true} icon={<AddIcon/>} onClick={handleAdd}/>
        </div>
    )
}

AddTodo = connect()(AddTodo)

export default AddTodo
