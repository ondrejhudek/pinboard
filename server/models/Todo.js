import mongoose, { Schema } from 'mongoose'

const todoSchema = new Schema({
    id: String,
    user_id: String,
    todos: Array
})

export const Todo = mongoose.model('Todo', todoSchema, 'Todos')
