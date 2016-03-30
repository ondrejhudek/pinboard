import React from 'react'
import { connect } from 'react-redux'
import { Card, CardText } from 'material-ui'

import AddNote from '../containers/note/AddNote'
import Notes from '../components/note/Notes'

import { fetchNotes } from '../actions/notes'
let fetched = false

const style = {
    headerCard: {
        margin: '0 20% 1em'
    },
    headerCardText: {
        padding: '3px 17px'
    }
}

class NoteView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dispatch: props.dispatch
        }
    }

    componentWillMount() {
        if (!fetched) {
            this.state.dispatch(fetchNotes())
            fetched = true
        }
    }

    render() {
        return (
            <div className="view-note">
                <h2>Notes</h2>

                <Card style={style.headerCard}>
                    <CardText children={<AddNote />} style={style.headerCardText}/>
                </Card>

                <Notes/>
            </div>
        )
    }
}

NoteView = connect()(NoteView)

export default NoteView
