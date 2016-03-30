import 'isomorphic-fetch'

import { API_USERS, API_HEADER } from '../../../../../../config'
import auth from '../../services/auth/login'

export default {
    fetchUser() {
        return new Promise((resolve, reject) => {
            return fetch(API_USERS, {
                method: 'POST',
                headers: API_HEADER,
                body: JSON.stringify({event: 'GET_BY_ID', data: {id: auth.getUserId()}})
            })
                .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    },

    updateUser(user) {
        return fetch(API_USERS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'UPDATE', data: user})
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => text)
            .catch(err => console.log(err))
    }
}
