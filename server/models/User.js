import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    id: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String
})

export const User = mongoose.model('User', userSchema, 'Users')
