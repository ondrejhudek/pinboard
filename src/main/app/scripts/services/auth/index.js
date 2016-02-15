import fetch from 'isomorphic-fetch'
import { API_USERS } from '../../../../../../config'

let users = {}

export default {
    loadUsers(){
        return fetch(API_USERS)
            .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
            .then(json => users = json)
            .catch(err => console.log(err))
    },

    login(email, pass, cb) {
        cb = arguments[arguments.length - 1]
        if (localStorage.token) {
            if (cb) cb(true)
            this.onChange(true)
            return
        }

        pretendRequest(email, pass, (res) => {
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
    },

    getToken() {
        return localStorage.token
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

function pretendRequest(email, pass, cb) {
    setTimeout(() => {
        if (!users.length) return

        const userData = users.filter(data => { return data.email === email })

        if (typeof userData != 'undefined' && userData != null && userData.length > 0) {
            if (pass === userData[0].password) {
                cb({
                    authenticated: true,
                    token: Math.random().toString(36).substring(7),
                    userId: userData[0]._id
                })
            } else {
                cb({authenticated: false})
            }
        } else {
            cb({authenticated: false})
        }
    }, 0)
}
