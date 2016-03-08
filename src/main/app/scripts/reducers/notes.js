const getModel = (model) => {
    return ({
        id: model.id,
        _id: model._id,
        userId: model.user_id,
        title: model.title,
        body: model.body
    })
}

const note = (state, action) => {
    switch (action.type) {
        case 'RECEIVE_NOTES':
            return getModel(state)

        case 'ADD_NOTE':
            return getModel(action.note)

        case 'UPDATE_NOTE':
            return Object.assign({}, state, {
                title: action.note.title,
                body: action.note.body
            })

        default:
            return state
    }
}

const notes = (state = {isFetching: false, items: []}, action) => {
    switch (action.type) {
        case 'REQUEST_NOTES':
            return Object.assign({}, state, {
                isFetching: true
            })

        case 'RECEIVE_NOTES':
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items.map(t => note(t, action)),
                lastUpdated: action.receivedAt
            })

        case 'ADD_NOTE':
            return Object.assign({}, state, {
                items: [...state.items, note(undefined, action)],
                lastUpdated: action.date
            })

        case 'UPDATE_NOTE':
            return Object.assign({}, state, {
                items: state.items.map(t => {
                    return (t.id === action.note.id) ? note(t, action) : t
                }),
                lastUpdated: action.date
            })

        case 'REMOVE_NOTE':
            return Object.assign({}, state, {
                items: state.items.filter(t => {
                    return (t.id !== action.note.id)
                }),
                lastUpdated: action.date
            })

        default:
            return state
    }
}

export default notes
