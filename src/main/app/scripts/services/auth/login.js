import { decrypt } from '../../components/Util'

import { API_USERS, API_HEADER } from '../../../../../../config'

export default {
    login(email, pass, cb) {
        cb = arguments[arguments.length - 1]
        if (localStorage.token) {
            if (cb) cb(true)
            this.onChange(true)
            return
        }

        checkEmail(email)
            .then((data) => {
                pretendRequest(data, email, pass, (res) => {
                    if (res.authenticated) {
                        localStorage.token = res.token
                        localStorage.userId = res.userId

                        if (cb) cb(true)
                        this.onChange(true)
                    } else {
                        if (cb) cb(false)
                        this.onChange(false)
                    }
                })
            })
            .catch((error) => {
                console.log(error)
            })
    },

    getToken() {
        return localStorage.token
    },

    getUserId() {
        return localStorage.userId
    },

    logout(cb) {
        delete localStorage.token
        delete localStorage.userId
        if (cb) cb()
        this.onChange(false)
    },

    loggedIn() {
        return !!localStorage.token
    },

    onChange() {
    }
}

const pretendRequest = (user, email, pass, cb) => {
    setTimeout(() => {
        if (user) {
            const password = decrypt(user.password)

            if (pass === password) {
                cb({
                    authenticated: true,
                    token: Math.random().toString(36).substring(7),
                    userId: user._id
                })
            } else {
                cb({authenticated: false})
            }
        } else {
            cb({authenticated: false})
        }
    }, 0)
}

const checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        return fetch(API_USERS, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'GET_BY_EMAIL', data: {email: email}})
        })
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => resolve(json))
            .catch(err => reject(err))
    })
}
