import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { GridTile, Card, CardTitle, CardText, CardActions, TextField, FlatButton } from 'material-ui'
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete'

import { updateNote, removeNote } from '../../actions/notes'

const style = {
    gridTile: {
        display: 'inline-block',
        width: '32%',
        margin: '0.5%',
        border: '1px solid #eee',
        borderRadius: 2,
        overflow: 'inherit'
    },
    title: {
        paddingTop: 8,
        paddingBottom: 0,
        fontWeight: 700
    },
    body: {
        paddingTop: 0,
        paddingBottom: 0
    },
    bodyHint: {
        top: 12,
        bottom: 'auto'
    },
    action: {
        paddingTop: 0,
        textAlign: 'right'
    }
}

let Note = ({ dispatch, id, _id, title, body }) => {
    let titleValue = title
    let bodyValue = body

    const TitleField = () => (
        <TextField defaultValue={titleValue} hintText="Note title" fullWidth={true}
                   onChange={handleTitleChange} onBlur={handleUpdate}/>
    )

    const BodyField = () => (
        <TextField defaultValue={bodyValue} hintText="Write your note here..." hintStyle={style.bodyHint} fullWidth={true} multiLine={true} rows={4}
                   onChange={handleBodyChange} onBlur={handleUpdate}/>
    )

    const handleTitleChange = (e) => {
        titleValue = e.target.value
    }

    const handleBodyChange = (e) => {
        bodyValue = e.target.value
    }

    const handleUpdate = () => {
        if (titleValue !== title || bodyValue !== body) dispatch(updateNote(id, _id, titleValue, bodyValue))
    }

    const handleRemove = () => {
        dispatch(removeNote(id, _id))
    }

    return (
        <GridTile style={style.gridTile}>
            <Card>
                <CardTitle children={<TitleField />} style={style.title}/>
                <CardText children={<BodyField />} style={style.body}/>
                <CardActions style={style.action}>
                    <FlatButton label="Remove" primary={true} onClick={handleRemove} icon={<DeleteIcon />}/>
                </CardActions>
            </Card>
        </GridTile>
    )
}

Note.propTypes = {
    id: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}

Note = connect()(Note)

export default Note
