const stats = (state = {users: {total: 0}, notes: {total: 0}, todos: {total: 0}, events: {total: 0}}, action) => {
    switch (action.type) {

        case 'COUNT_USERS':
            return Object.assign({}, state, {
                users: {
                    total: action.count
                }
            })

        case 'COUNT_NOTES':
            return Object.assign({}, state, {
                notes: {
                    total: action.count
                }
            })

        case 'COUNT_TODOS':
            return Object.assign({}, state, {
                todos: {
                    total: action.count
                }
            })

        case 'COUNT_EVENTS':
            return Object.assign({}, state, {
                events: {
                    total: action.count
                }
            })

        default:
            return state
    }
}

export default stats
