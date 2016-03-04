import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Note from './Note'

let Notes = ({ notes }) => (
    <div>
        {notes.map(note =>
            <Note key={note.id} {...note} />
        )}
    </div>
)

Notes.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    }).isRequired).isRequired
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

Notes = connect(mapStateToProps)(Notes)

export default Notes
