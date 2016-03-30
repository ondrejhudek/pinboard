import { Note } from '../models/Note'

export const getAllNotes = (res) => {
    Note.find((err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            console.log(err)
            res.status(400).send(err)
        }
    })
}

export const countNotes = (res) => {
    Note.count((err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const getNotes = (res, data) => {
    Note.find({
        'user_id': data.userId
    }, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const getNote = (res, data) => {
    Note.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const createNote = (res, data) => {
    const note = new Note({
        user_id: data.userId,
        title: data.title,
        body: (data.body) ? data.body : ''
    })

    note.save((err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.status(200).send(doc._id)
    })
}

export const updateNote = (res, data) => {
    Note.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        doc.title = data.title
        doc.body = data.body

        doc.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('OK')
        })
    })
}

export const removeNote = (res, data) => {
    Note.remove({_id: data.id}, (err) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.status(200).send('OK')
    })
}
