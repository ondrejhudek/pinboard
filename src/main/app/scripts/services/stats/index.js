import 'isomorphic-fetch'

import { API_USERS, API_NOTES, API_EVENTS, API_TODOS, API_HEADER } from '../../../../../../config'

export default {
    getUsersCount() {
        return new Promise((resolve, reject) => {
            return fetch(API_USERS, {
                method: 'POST',
                headers: API_HEADER,
                body: JSON.stringify({event: 'COUNT'})
            })
                .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    },

    getNotesCount() {
        return new Promise((resolve, reject) => {
            return fetch(API_NOTES, {
                method: 'POST',
                headers: API_HEADER,
                body: JSON.stringify({event: 'COUNT'})
            })
                .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    },

    getTodosCount() {
        return new Promise((resolve, reject) => {
            return fetch(API_TODOS, {
                method: 'POST',
                headers: API_HEADER,
                body: JSON.stringify({event: 'COUNT'})
            })
                .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    },

    getEventsCount() {
        return new Promise((resolve, reject) => {
            return fetch(API_EVENTS, {
                method: 'POST',
                headers: API_HEADER,
                body: JSON.stringify({event: 'COUNT'})
            })
                .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    }
}
