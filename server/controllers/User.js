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

export const getUserByEmail = (res, data) => {
    User.findOne({ 'email': data.email }, (err, user) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(user)
    })
}

export const createUser = (res, data) => {
    const newUser = new User({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password
    })

    newUser.save((err) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }
    })

    res.status(200).send('OK')
}

export const updateUser = (res, data) => {
    User.findById(data.id, (err, user) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        user.firstname = data.firstname
        user.lastname = data.lastname
        user.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
        })
    })

    res.status(200).send('OK')
}
