/** contains sequelize, connection and all models */
const db = require('../models');
/** instance Sequelize ORM */
const Sequelize = db.Sequelize;
/** need to do operations like, create, update, destroy */
const sequelize = db.sequelize;
/** todo model :) */
const Todo = db.todo;

// region:: methods
exports.createTodo = (req, res) => {
    // validate request
    if (!req.body.name) {
        res.status(400).send({
            status: 400,
            message: 'name is missing :c'
        })
    }

    // crete new todo
    Todo.create(req.body)
        .then(data => {
            let status = 200;
            let message = 'Todo created successfully :)'
            if (!data) {
                status = 400;
                message = 'we could not create new todo :c'
            }

            // we need to send response
            res.send({
                status: status,
                message: message,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: `Server Error ${err.message}`
            })
        })
}

exports.findAllTodos = (req, res) => {
    Todo.findAll()
        .then(data => {
            res.send({
                status: 200,
                message: 'Data retrieved successfully :)',
                data: data
            })
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: `Server Error ${err.message}`
            })
        })
}

exports.getTodoDetails = (req, res) => {
    // validate request
    if (!req.params.id) {
        res.status(400).send({
            status: 400,
            message: 'We need id to fetch todo detail :c'
        });
    }

    const todoId = req.params.id;
    Todo.findByPk(todoId)
        .then(data => {
            res.send({
                status: 200,
                message: 'Todo details retrieved successfully :)',
                data: data
            })
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: `Server Error ${err.message}`
            })
        })
}

exports.updateTodo = (req, res) => {
    // validate request
    if (!req.params.id) {
        res.status(400).send({
            status: 400,
            message: 'We need id to update todo :c'
        });
    }

    const todoId = req.params.id;
    Todo.update(req.body, {
        where: {
            id: todoId
        }
    })
        .then(num => {
            const updatedRecords = ((num) && num[0] < 1) ? 0 : 1;
            let status = (updatedRecords === 1) ? 200 : 400;
            res.status(status).send({
                status: status,
                message: (updatedRecords === 1) ? 'todo record updated successfully' : 'no record updated',
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: err.message,
                error: err
            });
        })
}

exports.updateTodoStatus = (req, res) => {
    // validate request
    if (!req.params.id) {
        res.status(400).send({
            status: 400,
            message: 'We need id to update todo :c'
        });
    }

    const todoId = req.params.id;
    Todo.update(req.body, {
        where: {
            id: todoId
        }
    })
        .then(num => {
            const updatedRecords = ((num) && num[0] < 1) ? 0 : 1;
            let status = (updatedRecords === 1) ? 200 : 400;
            res.status(status).send({
                status: status,
                message: (updatedRecords === 1) ? 'Completed status updated successfully' : 'no record updated',
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: err.message,
                error: err
            });
        })
}

exports.deleteTodo = (req, res) => {
    // validate request
    if (!req.params.id) {
        res.status(400).send({
            status: 400,
            message: 'We need id to update todo :c'
        });
    }

    const todoId = req.params.id;
    Todo.destroy({
        where: {
            id: todoId
        }
    })
        .then(data => {
            res.send({
                status: 200,
                message: 'todo was destroyed successfully :c'
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: err.message,
                error: err
            });
        });
}
// endregion
