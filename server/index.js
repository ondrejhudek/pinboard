import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import { getAllUsers, getUserByEmail, createUser, updateUser } from './controllers/User'
import { getAllNotes, getNote, createNote, updateNote, removeNote } from './controllers/Note'
import { getAllTodos, getTodo, createTodo, updateTodo, removeTodo } from './controllers/Todo'

import { DB_ENDPOINT } from '../config'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(DB_ENDPOINT)
mongoose.connection.on('error', (err) => console.log(err))

/** USERS **/
app.get('/api/users', (req, res) => {
    getAllUsers(res)
})

app.post('/api/users', (req, res) => {
    const eventType = req.body.event
    if(!eventType) return

    switch(eventType){
        case 'GET_BY_EMAIL':
            getUserByEmail(res, req.body.data)
            break

        case 'CREATE':
            createUser(res, req.body.data)
            break

        case 'UPDATE':
            updateUser(res, req.body.data)
            break

        default:
            res.status(400).send('Event type parameter missing in a request.')
    }
})

/** NOTES **/
app.get('/api/notes', (req, res) =>  {
    getAllNotes(res)
})

app.post('/api/notes', (req, res) =>  {
    const eventType = req.body.event
    if(!eventType) return

    switch(eventType){
        case 'GET':
            getNote(res, req.body.data)
            break

        case 'CREATE':
            createNote(res, req.body.data)
            break

        case 'UPDATE':
            updateNote(res, req.body.data)
            break

        case 'REMOVE':
            removeNote(res, req.body.data)
            break

        default:
            res.status(400).send('Event type parameter missing in a request.')
    }
})

/** TODOS **/
app.get('/api/todos', (req, res) =>  {
    getAllTodos(res)
})

app.post('/api/todos', (req, res) => {
    const eventType = req.body.event
    if(!eventType) return

    switch(eventType){
        case 'GET':
            getTodo(res, req.body.data)
            break

        case 'CREATE':
            createTodo(res, req.body.data)
            break

        case 'UPDATE':
            updateTodo(res, req.body.data)
            break

        case 'REMOVE':
            removeTodo(res, req.body.data)
            break

        default:
            res.status(400).send('Event type parameter missing in a request.')
    }
})

app.listen(80)
