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

        default:
            return state
    }
}

export default events
