const getModel = (model) => {
    return ({
        id: model.id,
        _id: model._id,
        email: model.email,
        firstname: model.firstname,
        lastname: model.lastname
    })
}

const user = (state, action) => {
    switch (action.type) {
        case 'RECEIVE_NOTES':
            return getModel(state)

        default:
            return state
    }
}

const users = (state = {isFetching: false, items: []}, action) => {
    switch (action.type) {
        case 'REQUEST_USERS':
            return Object.assign({}, state, {
                isFetching: true
            })

        case 'RECEIVE_USERS':
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items.map(t => user(t, action)),
                lastUpdated: action.receivedAt
            })

        default:
            return state
    }
}

export default users
