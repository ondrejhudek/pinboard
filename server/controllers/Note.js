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

export const getNotes = (res, data) => {
    Note.find({
        'user_id': data.userId
    }, (err, notes) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(notes)
    })
}

export const getNote = (res, data) => {
    Note.findById(data.id, (err, note) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(note)
    })
}

export const createNote = (res, data) => {
    const newNote = new Note({
        user_id: data.userId,
        title: data.title,
        body: (data.body) ? data.body : ''
    })

    newNote.save((err, note) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.status(200).send(note._id)
    })
}

export const updateNote = (res, data) => {
    Note.findById(data.id, (err, note) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        note.title = data.title
        note.body = data.body
        note.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('OK')
        })
    })
}

export const removeNote = (res, data) => {
    Note.remove({ _id: data.id }, (err) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.status(200).send('OK')
    })
}
