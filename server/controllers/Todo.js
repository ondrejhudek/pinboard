import { Todo } from '../models/Todo'

export const getAllTodos = (res) => {
    Todo.find((err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            console.log(err)
            res.status(400).send(err)
        }
    })
}

export const getTodo = (res, data) => {
    Todo.findById(data.id, (err, note) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(note)
    })
}

export const createTodo = (res, data) => {
    const newTodo = new Todo({
        user_id: data.userId,
        todos: data.todos
    })

    newTodo.save((err) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }
    })

    res.status(200).send('OK')
}

export const updateTodo = (res, data) => {
    Todo.findById(data.id, (err, note) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        note.todos = data.todos
        note.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
        })
    })

    res.status(200).send('OK')
}

export const removeTodo = (res, data) => {
    Todo.remove({ _id: data.id }, (err) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }
    })

    res.status(200).send('OK')
}
