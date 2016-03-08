import React from 'react'
import { connect } from 'react-redux'
import { RaisedButton  } from 'material-ui'
import AddIcon from 'material-ui/lib/svg-icons/content/add-circle'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import { fetchAdd } from '../../actions/todos'

const style = {
    add: {
        marginBottom: 20,
        textAlign: 'center'
    }
}

let AddTodo = ({ dispatch }) => {
    const handleAdd = () => {
        dispatch(fetchAdd())
    }

    /*
    return (
        <div style={style.add}>
            <RaisedButton label="Add todo" secondary={true} icon={<AddIcon/>} onClick={handleAdd}/>
        </div>
    )
    */

    return (
        <div className="col-add">
            <FloatingActionButton secondary={true} style={style} onClick={handleAdd}>
                <ContentAdd />
            </FloatingActionButton>
        </div>
    )
}

AddTodo = connect()(AddTodo)

export default AddTodo
