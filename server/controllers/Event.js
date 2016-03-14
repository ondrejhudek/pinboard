import { Event } from '../models/Event'

export const getAllEvents = (res) => {
    Event.find((err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            console.log(err)
            res.status(400).send(err)
        }
    })
}

export const getEvents = (res, data) => {
    Event.find({
        'user_id': data.userId
    }, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const getEvent = (res, data) => {
    Event.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const createEvent = (res, data) => {
    const event = new Event({
        user_id: data.userId,
        title: data.event.title,
        description: data.event.description,
        startDate: data.event.startDate,
        endDate: data.event.endDate,
        location: data.event.location
    })

    event.save((err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.status(200).send(doc._id)
    })
}

export const updateEvent = (res, data) => {
    Event.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        doc.title = data.event.title
        doc.description = data.event.description
        doc.startDate = data.event.startDate
        doc.endDate = data.event.endDate
        doc.location = data.event.location

        doc.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('OK')
        })
    })
}

export const removeEvent = (res, data) => {
    Event.remove({ _id: data.id }, (err) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.status(200).send('OK')
    })
}
