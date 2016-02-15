import React from 'react'
import fetch from 'isomorphic-fetch'

import { API_NOTES, API_HEADER } from '../../../../../config'

class SampleView extends React.Component {
    constructor(props) {
        super(props)

        console.log('constructor')
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    handleCreate() {
        fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({ event: 'CREATE', data: { userId: '', title: 'Test', body: 'Test'} })
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => console.log(text))
            .catch(err => console.log(err))
    }

    handleRead() {
        fetch(API_NOTES)
            .then(response => response.ok ? response.json() : response.text().then(err => Promise.reject(err)))
            .then(json => console.log(json))
            .catch(err => console.log(err))
    }

    handleReadOne() {
        fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({ event: 'GET', data: { id: '56c11c97b8c643a80271f6a6'} })
        })
            .then(response => response.ok ? response.json() : response.text().then(err => Promise.reject(err)))
            .then(json => console.log(json))
            .catch(err => console.log(err))
    }

    handleUpdate() {
        fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({ event: 'UPDATE', data: { id: '56c11c97b8c643a80271f6a6', title: 'Test 5', body: 'Test 5' } })
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => console.log(text))
            .catch(err => console.log(err))
    }

    handleDelete() {
        fetch(API_NOTES, {
            method: 'POST',
            headers: API_HEADER,
            body: JSON.stringify({ event: 'DELETE', data: { id: '56c11449bf72f6081c46119b' } })
        })
            .then(response => response.ok ? response.text() : response.text().then(err => Promise.reject(err)))
            .then(text => console.log(text))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h2>This is sample page!</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat dictum sem, nec ullamcorper ipsum maximus vel. Aenean commodo libero sed pretium
                    pellentesque. Suspendisse potenti. Suspendisse non magna aliquam, porttitor eros ac, viverra ligula. Aliquam sit amet justo sed augue porttitor sodales ac
                    sed velit. Sed tristique mi eget convallis aliquam. Vestibulum lacinia vulputate enim non condimentum. Suspendisse semper vestibulum eros eget tincidunt. Ut
                    vel tellus sed augue eleifend auctor. Etiam sollicitudin sodales semper. Sed nec urna sed libero condimentum feugiat non et nunc. Integer quis orci libero.
                    Pellentesque non arcu arcu.</p>

                <button type="button" onClick={this.handleCreate}>CREATE</button>
                <button type="button" onClick={this.handleRead}>READ</button>
                <button type="button" onClick={this.handleReadOne}>READ ONE</button>
                <button type="button" onClick={this.handleUpdate}>UPDATE</button>
                <button type="button" onClick={this.handleDelete}>DELETE</button>
            </div>
        );
    }
}

export default SampleView
