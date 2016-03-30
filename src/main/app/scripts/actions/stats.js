import service from '../services/stats'

export const fetchStats = () => {
    return dispatch => {
        dispatch(countUsers())
        dispatch(countNotes())
        dispatch(countTodos())
        dispatch(countEvent())
    }
}

const countUsers = () => {
    return dispatch => {
        service.getUsersCount()
            .then((data) =>
                dispatch({
                    type: 'COUNT_USERS',
                    count: data
                })
            )
            .catch((error) => console.log(error))
    }
}

const countNotes = () => {
    return dispatch => {
        service.getNotesCount()
            .then((data) =>
                dispatch({
                    type: 'COUNT_NOTES',
                    count: data
                })
            )
            .catch((error) => console.log(error))
    }
}

const countTodos = () => {
    return dispatch => {
        service.getTodosCount()
            .then((data) =>
                dispatch({
                    type: 'COUNT_TODOS',
                    count: data
                })
            )
            .catch((error) => console.log(error))
    }
}

const countEvent = () => {
    return dispatch => {
        service.getEventsCount()
            .then((data) =>
                dispatch({
                    type: 'COUNT_EVENTS',
                    count: data
                })
            )
            .catch((error) => console.log(error))
    }
}
