import 'isomorphic-fetch'

import { API_USERS, API_HEADER } from '../../../../../config'
import auth from '../services/auth/login'

/**
 * NOTES
 */
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

export const fetchUser = () => {
    return dispatch => {
        dispatch(requestUser())
        return fetch(API_USERS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'GET_BY_ID', data: {id: auth.getUserId()}})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => dispatch(receiveUser(json)))
            .catch(err => console.log(err))
    }
}
