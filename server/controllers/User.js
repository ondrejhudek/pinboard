import { User } from '../models/User'

export const getAllUsers = (res) => {
    User.find((err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            console.log(err)
            res.status(400).send(err)
        }
    })
}

export const countUsers = (res) => {
    User.count((err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const existsEmail = (res, data) => {
    User.count({ 'email': data.email }, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc !== 0)
    })
}

export const getUserById = (res, data) => {
    User.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const getUserByEmail = (res, data) => {
    User.findOne({ 'email': data.email }, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const createUser = (res, data) => {
    const user = new User({
        email: data.email,
        password: data.password
    })

    user.save((err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.status(200).send(doc._id)
    })
}

export const updateUser = (res, data) => {
    User.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        doc.firstname = data.firstname
        doc.lastname = data.lastname
        doc.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
        })
    })

    res.status(200).send('OK')
}
