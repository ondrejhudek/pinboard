import service from '../services/user'

/* request and receive current user */
const requestUser = () => {
    return {
        type: 'REQUEST_USER'
    }
}

const receiveUser = (user) => {
    return {
        type: 'RECEIVE_USER',
        user,
        receivedAt: Date.now()
    }
}

export const getUser = () => {
    return dispatch => {
        dispatch(requestUser())

        service.fetchUser()
            .then((data) => dispatch(receiveUser(data)))
            .catch((error) => console.log(error))
    }
}

export const updateUser = (user) => {
    service.updateUser(user)
    
    return {
        type: 'UPDATE_USER',
        user,
        receivedAt: Date.now()
    }
}
