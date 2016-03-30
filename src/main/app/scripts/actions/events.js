import service from '../services/event'

let nextEventId = 0

/* request and receive events */
const requestEvents = () => {
    return {
        type: 'REQUEST_EVENTS'
    }
}

const receiveEvents = (json) => {
    return {
        type: 'RECEIVE_EVENTS',
        items: json.map(data => {
            data.id = nextEventId++
            return data
        }),
        receivedAt: Date.now()
    }
}

export const fetchEvents = () => {
    return dispatch => {
        dispatch(requestEvents())

        service.fetchEvents()
            .then((data) => dispatch(receiveEvents(data)))
            .catch((error) => console.log(error))
    }
}

/* add event */
export const addEvent = (event) => {
    return dispatch => {
        service.createEvent(event)
            .then((data) => {
                event._id = data.id
                event.user_id = data.userId
                event.id = nextEventId++

                dispatch({
                    type: 'ADD_EVENT',
                    event,
                    date: Date.now()
                })
            })
            .catch((error) => console.log(error))
    }
}

/* update event */
export const updateEvent = (event) => {
    service.updateNote(event)

    return {
        type: 'UPDATE_EVENT',
        event,
        date: Date.now()
    }
}

/* remove event */
export const removeEvent = (event) => {
    service.removeNote(event)

    return {
        type: 'REMOVE_EVENT',
        event,
        date: Date.now()
    }
}
