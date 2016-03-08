import React from 'react'
import { Card, CardText } from 'material-ui'

import AddNote from '../containers/note/AddNote'
import Notes from '../components/note/Notes'

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

export default NoteView
