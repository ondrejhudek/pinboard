import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/lib/circular-progress'

import Note from './Note'

let Notes = ({ notes, isFetching }) => {
    notes.sort((a, b) => { return b.id - a.id })

    return (
        <div>
            <div className="state-fetching" id={isFetching ? 'show' : ''}>
                <CircularProgress />
            </div>

            <p className="state-empty" id={!notes.length && !isFetching ? 'show' : ''}>
                Add your <strong>first note</strong>!
            </p>

            <div>
                {notes.map(note =>
                    <Note key={note.id} {...note} />
                )}
            </div>
        </div>
    )
}

Notes.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    }).isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes.items,
        isFetching: state.notes.isFetching
    }
}

Notes = connect(mapStateToProps)(Notes)

export default Notes
