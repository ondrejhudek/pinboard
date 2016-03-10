import React from 'react'
import { connect } from 'react-redux'
import { TextField, RaisedButton } from 'material-ui'

import { fetchCreate } from '../../actions/notes'

const style = {
    colTextfield: {
        display: 'inline-block',
        width: '80%'
    },
    colButton: {
        display: 'inline-block',
        width: '20%',
        textAlign: 'right'
    }
}

let AddNote = ({ dispatch }) => {
    console.log(dispatch)

    const handleAdd = (e) => {
        e.preventDefault()
        const value = e.target.newNote.value

        if (!value) return
        dispatch(fetchCreate(value))
        e.target.newNote.value = ''
    }

    return (
        <div>
            <form onSubmit={handleAdd}>
                <div style={style.colTextfield}>
                    <TextField id="newNote" hintText="Note title" fullWidth={true} autoComplete="off"/>
                </div>
                <div style={style.colButton}>
                    <RaisedButton type="submit" label="Add" secondary={true}/>
                </div>
            </form>
        </div>
    )
}

AddNote = connect()(AddNote)

export default AddNote
