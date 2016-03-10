import mongoose, { Schema } from 'mongoose'

const eventSchema = new Schema({
    id: String,
    user_id: String,
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    location: String
})

export const Event = mongoose.model('Event', eventSchema, 'Events')
