import service from '../services/note'

let nextNoteId = 0

/* request and receive notes */
const requestNotes = () => {
    return {
        type: 'REQUEST_NOTES'
    }
}

const receiveNotes = (data) => {
    return {
        type: 'RECEIVE_NOTES',
        items: data.map(t => {
            t.id = nextNoteId++
            return t
        }),
        receivedAt: Date.now()
    }
}

export const fetchNotes = () => {
    return dispatch => {
        dispatch(requestNotes())

        service.fetchNotes()
            .then((data) => dispatch(receiveNotes(data)))
            .catch((error) => console.log(error))
    }
}

/* add note */
export const addNote = (title) => {
    return dispatch => {
        service.createNote(title)
            .then((data) => {
                dispatch({
                    type: 'ADD_NOTE',
                    note: {
                        id: nextNoteId++,
                        _id: data.id,
                        user_id: data.userId,
                        title,
                        body: ''
                    },
                    date: Date.now()
                })
            })
            .catch((error) => console.log(error))
    }
}

/* update note */
export const updateNote = (id, objectId, title, body) => {
    service.updateNote(objectId, title, body)

    return {
        type: 'UPDATE_NOTE',
        note: {
            id: id,
            title,
            body
        },
        date: Date.now()
    }
}

/* remove note */
export const removeNote = (id, objectId) => {
    service.removeNote(objectId)

    return {
        type: 'REMOVE_NOTE',
        note: {
            id: id
        },
        date: Date.now()
    }
}
