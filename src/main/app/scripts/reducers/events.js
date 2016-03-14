const getModel = (model) => {
    return ({
        id: model.id,
        _id: model._id,
        userId: model.user_id,
        title: model.title,
        description: model.description,
        startDate: new Date(model.startDate),
        endDate: new Date(model.endDate),
        location: model.location,
        allDay: false
    })
}

const event = (state, action) => {
    switch (action.type) {
        case 'RECEIVE_EVENTS':
            return getModel(state)

        case 'ADD_EVENT':
            return getModel(action.event)

        case 'UPDATE_EVENT':
            return Object.assign({}, state, {
                title: action.event.title,
                startDate: action.event.startDate,
                endDate: action.event.endDate,
                description: action.event.description,
                location: action.event.location
            })

        default:
            return state
    }
}

const events = (state = {isFetching: false, items: []}, action) => {
    switch (action.type) {
        case 'REQUEST_EVENTS':
            return Object.assign({}, state, {
                isFetching: true
            })

        case 'RECEIVE_EVENTS':
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items.map(t => event(t, action)),
                lastUpdated: action.receivedAt
            })

        case 'ADD_EVENT':
            return Object.assign({}, state, {
                items: [...state.items, event(undefined, action)],
                lastUpdated: action.date
            })

        case 'UPDATE_EVENT':
            return Object.assign({}, state, {
                items: state.items.map(t => {
                    return (t.id === action.event.id) ? event(t, action) : t
                }),
                lastUpdated: action.date
            })

        case 'REMOVE_EVENT':
            return Object.assign({}, state, {
                items: state.items.filter(t => {
                    return (t.id !== action.event.id)
                }),
                lastUpdated: action.date
            })

        default:
            return state
    }
}

export default events
