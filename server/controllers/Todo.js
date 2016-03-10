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

export const getTodos = (res, data) => {
    Todo.find({
        'user_id': data.userId
    }, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const getTodo = (res, data) => {
    Todo.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(doc)
    })
}

export const createTodo = (res, data) => {
    const todo = new Todo({
        user_id: data.userId,
        todos: []
    })

    todo.save((err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.status(200).send(doc._id)
    })
}

export const removeTodo = (res, data) => {
    Todo.remove({_id: data.id}, (err) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }
    })

    res.status(200).send('OK')
}

export const addItem = (res, data) => {
    Todo.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        doc.todos = [...doc.todos, data.todo]
        doc.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('OK')
        })
    })
}

export const toggleItem = (res, data) => {
    Todo.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        /* update the toggled todo item */
        doc.todos = doc.todos.map(t => {
            if (t.id !== data.todo.id) return t

            return Object.assign({}, t, {
                completed: data.todo.completed
            })
        })

        doc.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('OK')
        })
    })
}

export const removeItem = (res, data) => {
    Todo.findById(data.id, (err, doc) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        /* remove the todo item */
        doc.todos = doc.todos.filter(t => {
            return (t.id !== data.todo.id)
        })

        doc.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('OK')
        })
    })
}
