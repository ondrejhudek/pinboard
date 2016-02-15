const note = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return {
                id: action.id,
                title: action.title,
                body: action.body
            }
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
        default:
            return state
    }
}

export default notes
