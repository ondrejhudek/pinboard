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
    }, (err, todos) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.json(todos)
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
        todos: []
    })

    newTodo.save((err, todo) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        res.status(200).send(todo._id)
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
    Todo.findById(data.id, (err, todo) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        todo.todos = [...todo.todos, data.todo]
        todo.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('OK')
        })
    })
}

export const toggleItem = (res, data) => {
    Todo.findById(data.id, (err, todo) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        /* update the toggled todo item */
        todo.todos = todo.todos.map(t => {
            if (t.id !== data.todo.id) return t

            return Object.assign({}, t, {
                completed: data.todo.completed
            })
        })

        todo.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('OK')
        })
    })
}

export const removeItem = (res, data) => {
    Todo.findById(data.id, (err, todo) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }

        /* remove the todo item */
        todo.todos = todo.todos.filter(t => {
            return (t.id !== data.todo.id)
        })

        todo.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }

            res.status(200).send('OK')
        })
    })
}
