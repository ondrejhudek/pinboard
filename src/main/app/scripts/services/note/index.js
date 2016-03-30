import 'isomorphic-fetch'

import { API_NOTES, API_HEADER } from '../../../../../../config'
import auth from '../../services/auth/login'

const USER_ID = auth.getUserId()

export default {
    fetchNotes() {
        return new Promise((resolve, reject) => {
            return fetch(API_NOTES, {
                method: 'POST',
                headers: API_HEADER,
                body: JSON.stringify({event: 'GET', data: {userId: USER_ID}})
            })
                .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    },
    
    createNote(title){
        return new Promise((resolve, reject) => {
            return fetch(API_NOTES, {
                method: 'POST',
                headers: API_HEADER,
                body: JSON.stringify({event: 'CREATE', data: {userId: USER_ID, title: title}})
            })
                .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
                .then(json => resolve({id: json, userId: USER_ID}))
                .catch(err => reject(err))
        })
    },
    
    updateNote(objectId, title, body){
        return fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'UPDATE', data: {id: objectId, title: title, body: body}})
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => text)
            .catch(err => console.log(err))
    },
    
    removeNote(objectId){
        return fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({event: 'REMOVE', data: {id: objectId}})
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => text)
            .catch(err => console.log(err))
    }
}
