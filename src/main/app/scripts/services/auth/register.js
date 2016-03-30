import fetch from 'isomorphic-fetch'

import { API_USERS, API_HEADER } from '../../../../../../config'
import { encrypt } from '../../components/Util'

export default {
    register(user){
        return new Promise((resolve, reject) => {
            fetchRegister(user, resolve, reject)
        })
    },

    emailExists(email){
        return new Promise((resolve, reject) => {
            fetchEmailExists(email, resolve, reject)
        })
    }
}

const fetchRegister = (user, onData, onError) => {
    return fetch(API_USERS, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'CREATE', data: {email: user.email, password: encrypt(user.password)}})
    })
        .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
        .then(json => onData(json))
        .catch(err => onError(err))
}

const fetchEmailExists = (email, onData, onError) => {
    return fetch(API_USERS, {
        method: 'POST',
        headers: API_HEADER,
        body: JSON.stringify({event: 'EXISTS_EMAIL', data: {email: email}})
    })
        .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
        .then(json => onData(json))
        .catch(err => onError(err))
}
