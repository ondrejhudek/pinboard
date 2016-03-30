const getModel = (model) => {
    return ({
        _id: model._id,
        email: model.email,
        password: model.password,
        firstname: (model.firstname) ? model.firstname : '',
        lastname: (model.lastname) ? model.lastname : ''
    })
}

const user = (state, action) => {
    switch (action.type) {
        case 'RECEIVE_USER':
            return getModel(state)

        default:
            return state
    }
}

const users = (state = {isFetching: false, data: {}}, action) => {
    switch (action.type) {
        case 'REQUEST_USER':
            return Object.assign({}, state, {
                isFetching: true
            })

        case 'RECEIVE_USER':
            return Object.assign({}, state, {
                isFetching: false,
                data: user(action.user, action),
                lastUpdated: action.receivedAt
            })

        default:
            return state
    }
}

export default users
