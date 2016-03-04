const getModel = (model) => {
    console.log(model)
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
        case 'ADD_NOTE':
            return getModel(action)
        case 'UPDATE_NOTE':
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                title: action.title,
                body: action.body
            })
        case 'RECEIVE_NOTES':
            return getModel(state)
        default:
            return state
    }
}

const notes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return [
                ...state,
                note(undefined, action)
            ]
        case 'UPDATE_NOTE':
            return state.map(t =>
                note(t, action)
            )
        case 'RECEIVE_NOTES':
            //return Object.assign([], state, action.notes)
            return action.notes.map(t =>
                note(t, action)
            )
        default:
            return state
    }
}

export default notes
