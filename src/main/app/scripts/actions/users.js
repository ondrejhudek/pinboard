import 'isomorphic-fetch'

import { API_USERS } from '../../../../../config'

let nextUserId = 0

/**
 * NOTES
 */
/* request and receive users */
const requestUsers = () => {
    return {
        type: 'REQUEST_USERS'
    }
}

const receiveUsers = (json) => {
    return {
        type: 'RECEIVE_USERS',
        items: json.map(data => {
            data.id = nextUserId++
            return data
        }),
        receivedAt: Date.now()
    }
}

export const fetchUsers = () => {
    return dispatch => {
        dispatch(requestUsers())
        return fetch(API_USERS)
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(receiveUsers(json)))
            .catch(err => console.log(err))
    }
}
