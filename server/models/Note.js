import mongoose, { Schema } from 'mongoose'

const noteSchema = new Schema({
    id: String,
    user_id: String,
    title: String,
    body: String
})

export const Note = mongoose.model('Note', noteSchema)
